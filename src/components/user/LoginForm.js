import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import * as AuthService from "../../service/user/AuthService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {RingLoader} from "react-spinners";
import '../../css/user/spinner.css'
import Footer from "../home/common/Footer";


function LoginForm() {

    const [user, setUser] = useState({
        username: "",
        otp: ""
    });

    const navigate = useNavigate();
    const [isOTPVisible, setOTPVisible] = useState(false);
    const [isOTPReset, setOTPReset] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };


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

    const resetOTP = async () => {
        try {
            handleClick();
            handleButtonClick();
            let initOtp = {
                userName: user.userName
            }
            console.log(initOtp)
            const res = await AuthService.resetOTP(initOtp);
            console.log(res)
            if (res.status === 200) {
                toast("OTP đã được gửi qua mail của bạn");
            } else {
                toast.error("Vui lòng đăng nhập lại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Vui lòng đăng nhập lại");
        }
    }

    const initAccount = {
        userName: "",
        password: ""
    }

    const login = async (data) => {
        try {
            const res = await AuthService.login(data);
            console.log(res)
            let initOtp = {
                userName: res.data.userName,
                otp: ""
            }
            setUser(initOtp);
            if (res.status === 200) {
                showOTP();
                toast("OTP đã được gửi qua mail của bạn");
            } else {
                toast.error("Sai tên đăng nhâp hoặc mật khẩu");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Sai tên đăng nhâp hoặc mật khẩu");
        }
    }


    const auth = async (data) => {
        try {
            let initOtp = {
                ...data,
                userName: user.userName
            }
            const res = await AuthService.auth(initOtp);
            AuthService.addJwtTokenToLocalStorage(res.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (res.status === 200) {
                if (tempURL) {
                    navigate(tempURL);
                } else {
                    navigate("/admin/home")
                }
                toast("Đăng nhập thành công");
            } else {
                showResetOTP();
                toast.error("Đăng nhập thất bại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            showResetOTP();
            toast.error("Đăng nhập thất bại");
        }
    }

    return (
        <>

            <div style={{width: '40%', margin: '15% auto 20% auto'}}>
                <div className="spinner-overlay" style={{display: loading ? 'flex' : 'none'}}>
                    <div className="spinner-container">
                        <RingLoader color="#000000"/>
                    </div>
                </div>
                <fieldset
                    className="form-input shadow"
                    style={{
                        borderRadius: '20px',
                        border: '1px solid #000000',
                        height: 'auto',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        width: '100%',
                    }}
                >
                    <legend className="float-none w-auto px-1">
                        <h2>Đăng Nhập</h2>
                    </legend>
                    <div style={{margin: '3%'}}>
                        <Formik
                            initialValues={initAccount}
                            onSubmit={(values) => {
                                login(values);
                            }}
                        >
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tên Đăng Nhập</label>
                                    <Field type="text" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" name="userName" disabled={isOTPVisible}/>
                                </div>
                                <div className="mb-3" style={{display: isOTPVisible ? 'none' : 'block'}}>
                                    <label htmlFor="exampleInputPassword1" className="form-label">Mật Khẩu</label>
                                    <Field type="password" className="form-control" id="exampleInputPassword1"
                                           name="password"/>
                                </div>
                                <div className="mt-4" style={{display: isOTPVisible ? 'none' : 'block'}}>
                                    <div style={{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                                        <button type="submit" style={{width: '100%'}}
                                                className="btn btn-outline-primary" onClick={handleClick}>Login
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                        <Formik
                            initialValues={user}
                            onSubmit={(values) => {
                                auth(values);
                            }}
                        >
                            <Form>
                                <div id="hiddenDiv" style={{display: isOTPVisible ? 'block' : 'none'}}>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label">Mã Xác Nhận</label>
                                        <Field type="text" className="form-control" name="otp"/>
                                    </div>
                                    <div className="mt-4">
                                        <div style={{
                                            width: '50%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: isOTPReset ? 'none' : 'block'
                                        }}>
                                            <button type="submit" style={{width: '100%'}}
                                                    className="btn btn-outline-primary">
                                                Xác Nhận
                                            </button>
                                        </div>
                                        <div className="row" style={{
                                            display: isOTPReset ? 'block' : 'none',
                                            marginLeft: '5%',
                                            marginRight: '5%'
                                        }}>
                                            <button type="button"
                                                    style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}
                                                    className="btn btn-outline-primary" disabled={isCounting}
                                                    onClick={() => resetOTP()}>
                                                {isCounting ? `${countdown}s` : 'Gửi Lại OTP'}
                                            </button>
                                            <button type="submit"
                                                    style={{width: '40%', marginLeft: '10%', marginRight: 'auto'}}
                                                    className="btn btn-outline-primary" onClick={handleClick}>Xác Nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </fieldset>
            </div>
            <Footer/>
        </>
    );
}

export default LoginForm;
