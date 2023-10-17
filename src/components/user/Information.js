import React, {useEffect, useState} from 'react';
import * as AuthService from "../../service/user/AuthService";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import HeaderAdmin from "./HeaderAdmin";
import {useParams} from "react-router-dom";
import * as UserService from '../../service/user/UserService';
import {RingLoader} from "react-spinners";
import '../../css/user/spinner.css';
import * as Yup from "yup";

function Information() {

    const userInit = {
        username: "",
        otp: ""
    }

    const params = useParams();
    const [isOTPVisible, setOTPVisible] = useState(false);
    const [isOTPReset, setOTPReset] = useState(false);
    const [infoUser, setInfoUser] = useState(null);
    const [countdown, setCountdown] = useState(5); // Thời gian đếm ngược ban đầu là 5 giây
    const [isCounting, setIsCounting] = useState(false); // Trạng thái đang đếm ngược
    const [input1Disabled, setInput1Disabled] = useState(true);
    const [input2Disabled, setInput2Disabled] = useState(true);
    const [user, setUser] = useState(userInit);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loading, setLoading] = useState(false);



    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận khớp nhau
        if (event.target.value === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận khớp nhau
        if (newPassword === event.target.value) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    const getInfoUser = async (id) => {
        const userTemp = await UserService.findById(id);
        setInfoUser(userTemp.data)
    }

    useEffect(() => {
        getInfoUser(params.id);
    }, []);

    const handleToggleInputs = () => {
        setInput1Disabled(!input1Disabled);
        setPasswordsMatch(false);
        setDefaultPass();
    }

    const handleToggleInputsInfo = () => {
        setInput2Disabled(!input2Disabled);
    }


    useEffect(() => {
        let timer;
        if (isCounting && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
            setCountdown(5);
        }
        return () => clearTimeout(timer);
    }, [countdown, isCounting]);

    const startCountdown = () => {
        setIsCounting(true);
    };

    const handleButtonClick = () => {
        if (!isCounting) {
            startCountdown();
            // Thực hiện công việc khi nút được nhấn
        }
    };


    const showOTP = () => {
        setOTPVisible(true);
    };

    const showResetOTP = () => {
        setOTPReset(true);
    };

    const hiddenOTP = () => {
        setOTPVisible(false);
    };

    const resetOTP = async () => {
        setLoading(true);
        handleButtonClick();
        let initOtp = {
            userName: user.userName
        }
        const res = await AuthService.resetOTP(initOtp);
        if (res.status === 200) {
            toast("OTP đã được gửi qua mail của bạn");
        } else {
            toast.error("Gửi OTP thất bại")
        }
        setLoading(false);
    }

    const changePass = async (data) => {
        setInput1Disabled(true);
        setLoading(true);
        let initOtp = {
            ...data,
            otp: ""
        }
        setUser(initOtp);
        try {
            data = {
                ...data,
                password: password
            }
            const res = await UserService.changePass(data);
            if (res.status === 200) {
                showOTP();
                toast("OTP đã được gửi qua mail của bạn");
            } else {
                toast.error("Sai tên đăng nhâp hoặc mật khẩu");
            }
            setLoading(false);
        } catch (e) {
            toast.error("Sai mật khẩu");
            setLoading(false);
        }

    }

    const changeInfo = async (data) => {
        setLoading(true);
        const res = await UserService.edit(data);
        setInfoUser(data);
        if (res.status === 200) {
            toast("Thông tin cá nhân đã được cập nhật");
            handleToggleInputsInfo();
        } else {
            toast.error("Cập nhật thất bại");
        }
        setLoading(false);
    }

    const setDefaultPass = () => {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
    }

    const auth = async (data) => {
        setLoading(true);
        let initOtp = {
            ...data,
            userName: infoUser.userName,
            password: newPassword,
            otp: otp
        }
        const res = await AuthService.confirmRegister(initOtp);
        if (res.status === 200) {
            toast("Đổi mật khẩu thành công");
            await getInfoUser(params.id);
            hiddenOTP();
            setDefaultPass();
            handleToggleInputs();
            setInput1Disabled(true);
        } else {
            showResetOTP();
            toast.error("Xác nhận OTP thất bại")
        }
        setLoading(false);
    }

    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);


    return (infoUser != null &&
        <>
            <HeaderAdmin/>
            <div className="spinner-overlay" style={{display: loading ? 'flex' : 'none'}}>
                <div className="spinner-container">
                    <RingLoader color="#000000" />
                </div>
            </div>
            <div style={{width: '80%', margin: '5% auto 20% auto'}} className="row">
                <div className="col-6" style={{padding: '2%'}}>
                    <Formik
                        initialValues={infoUser}
                        onSubmit={(values) => {
                            changeInfo(values);
                        }}
                        validationSchema={Yup.object({
                            employeeName: Yup.string().trim()
                                .required("Vui lòng nhập tên")
                                .max(100, "Quá ký tự cho phép (100 ký tự)"),
                            employeePhone: Yup.string().trim()
                                .required("Vui lòng nhập số điện thoại")
                                .matches(/^(?:\+84|0)(90|91|94)\d{7}$/, "Phone number invalid"),
                            employeeBirthday: Yup.date()
                                .required("Vui lòng nhập ngày sinh")
                                .max(eighteenYearsAgo, "Nhân viên chưa đủ 18 tuổi"),
                            email: Yup.string().trim()
                                .required("Vui lòng bổ sung email khách hàng")
                                .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, "Bạn nhập sai định dạng email")
                                .min(12, "Email không đủ ký tự cho phép (12 ký tự)")
                                .max(50, "Email vượt quá ký tự cho phép (50 ký tự)"),
                            employeeAddress: Yup.string().trim()
                                .required("Vui lòng nhập địa chỉ")
                                .max(100, "Địa chỉ quá ký tự cho phép (100 ký tự)")
                        })}
                    >
                        <Form>
                            <h1 style={{textAlign: 'center'}}>Thông Tin Cá Nhân</h1>
                            <hr/>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Họ Và Tên</label>
                                <Field type="text" className="form-control" id="name" name="employeeName" disabled={input2Disabled}/>
                                <ErrorMessage name="employeeName" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" className="form-control" id="email" name="email" disabled={input2Disabled}/>
                                <ErrorMessage name="email" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Ngày Sinh</label>
                                <Field type="date" className="form-control" id="dateOfBirth" name="employeeBirthday" disabled={input2Disabled}/>
                                <ErrorMessage name="employeeBirthday" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Số Điện Thoại</label>
                                <Field type="text" className="form-control" id="phoneNumber" name="employeePhone" disabled={input2Disabled}/>
                                <ErrorMessage name="employeePhone" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Địa Chỉ</label>
                                <Field type="text" className="form-control" id="address" name="employeeAddress" disabled={input2Disabled}/>
                                <ErrorMessage name="employeeAddress" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3 mt-4">
                                    <div className="row" style={{
                                        marginLeft: '5%',
                                        marginRight: '5%'
                                    }}>
                                        <button type="button"
                                                style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}
                                                className="btn btn-outline-primary"
                                                onClick={handleToggleInputsInfo}>
                                            {!input2Disabled ? `Huỷ` : 'Đổi thông tin'}
                                        </button>
                                        <button type="submit"
                                                style={{width: '40%', marginLeft: '10%', marginRight: 'auto', display: input2Disabled ? 'none' : 'block'}}
                                                className="btn btn-outline-primary">Lưu
                                        </button>
                                    </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="col-6" style={{padding: '2%'}}>
                    <Formik
                        initialValues={{
                            id: infoUser.id,
                            userName: infoUser.userName,
                            newPassword: "",
                            password: "",
                            newPasswordConfirmation: ""
                        }}
                        onSubmit={(values) => {
                            changePass(values);
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string().trim()
                                .min(6, "Không đủ ký tự cho phép (6 ký tự)")
                                .max(50, "Quá ký tự cho phép (50 ký tự)"),
                            newPassword: Yup.string().trim()
                                .min(6, "Không đủ ký tự cho phép (6 ký tự)")
                                .max(50, "Quá ký tự cho phép (50 ký tự)"),
                            newPasswordConfirmation: Yup.string().trim()
                                .min(6, "Không đủ ký tự cho phép (6 ký tự)")
                                .max(50, "Quá ký tự cho phép (50 ký tự)"),
                        })}
                    >
                        <Form>
                            <h1 style={{textAlign: 'center'}}>Thay Đổi Mật Khẩu</h1>
                            <hr/>
                            <div className="mb-3">
                                <label htmlFor="oldPassword" className="form-label">Mật Khẩu Cũ</label>
                                <Field type="hidden" className="form-control" name="id"/>
                                <Field type="hidden" className="form-control" name="userName"/>
                                <Field type="password" className="form-control" name="password" onChange={handlePasswordChange}
                                       value={password} disabled={input1Disabled} />
                                <ErrorMessage name="password" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">Mật Khẩu Mới</label>
                                <Field type="password" className="form-control" name="newPassword"
                                       onChange={handleNewPasswordChange} value={newPassword} disabled={input1Disabled} />
                                <ErrorMessage name="newPassword" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPasswordConfirmation" className="form-label">Nhập Lại Mật Khẩu
                                    Mới</label>
                                <Field type="password" className="form-control" name="newPasswordConfirmation"
                                       onChange={handleConfirmPasswordChange} value={confirmPassword} disabled={input1Disabled} />
                                <ErrorMessage name="newPasswordConfirmation" component="span" style={{color: "red"}}></ErrorMessage>

                                {passwordsMatch || confirmPassword === "" ? (
                                    <p style={{color: "green"}}></p>
                                ) : (
                                    <p style={{ color: "red" }}>Mật khẩu không trùng khớp</p>
                                )}
                            </div>
                            <div className="mt-4" id="showDiv" style={{display: isOTPVisible ? 'none' : 'block'}}>
                                <div className="row" style={{
                                    marginLeft: '5%',
                                    marginRight: '5%'
                                }}>
                                    <button type="button"
                                            style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}
                                            className="btn btn-outline-primary"
                                            onClick={handleToggleInputs}>
                                        {!input1Disabled ? `Huỷ` : 'Đổi mật khẩu'}
                                    </button>
                                    <button type="submit"
                                            style={{width: '40%', marginLeft: '10%', marginRight: 'auto', display: input1Disabled ? 'none' : 'block'}}
                                            className="btn btn-outline-primary" disabled={!passwordsMatch}>Lưu
                                    </button>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                    <div id="hiddenDiv" style={{display: isOTPVisible ? 'block' : 'none'}}>
                        <Formik
                            initialValues={user}
                            onSubmit={(values) => {
                                auth(values);
                            }}
                            validationSchema={Yup.object({
                                otp: Yup.string().trim()
                                    .min(8, "Không đủ ký tự cho phép (8 ký tự)")
                                    .max(8, "Quá ký tự cho phép (8 ký tự)"),
                            })}
                        >

                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">Mã Xác Nhận</label>
                                    <Field type="text" className="form-control" value={otp} onChange={handleOtpChange} name="otp"/>
                                    <ErrorMessage name="otp" component="span" style={{color: "red"}}></ErrorMessage>
                                    <Field type="hidden" className="form-control" name="password"/>
                                </div>
                                <div className="mt-4">
                                    <div style={{
                                        width: '50%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: isOTPReset ? 'none' : 'block'
                                    }}>
                                        <button type="submit" style={{width: '100%'}}
                                                className="btn btn-outline-primary" id="subOtp">Xác Nhận
                                        </button>
                                    </div>
                                    <div className="row" style={{
                                        display: isOTPReset ? 'block' : 'none',
                                        marginLeft: '5%',
                                        marginRight: '5%'
                                    }}>
                                        <button type="button"
                                                style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}
                                                className="btn btn-outline-primary" id="subOtp" disabled={isCounting}
                                                onClick={() => resetOTP()}>
                                            {isCounting ? `${countdown}s` : 'Gửi Lại OTP'}
                                        </button>
                                        <button type="submit"
                                                style={{width: '40%', marginLeft: '10%', marginRight: 'auto'}}
                                                className="btn btn-outline-primary" id="subOtp">Xác Nhận
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Information;
