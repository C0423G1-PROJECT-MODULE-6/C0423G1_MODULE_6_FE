import { differenceInYears, parse } from 'date-fns';
import { ErrorMessage, Field, Formik,Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { storage } from "../../firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { crateEmployee, getNewEmployee } from '../../service/user/EmployeeService';
import { async } from '@firebase/util';
import {getAppRoleList} from '../../service/user/AppRoleService'

function CreateEmployee(props) {
    const navigate = useNavigate();
    const [roles,setRole] = useState()
    const [employee, setEmployee] = useState();
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const saveEmployee = async (employee, setErrors) => {
        if (imageUpload !== null) {
            const fileName = `images/${imageUpload.name + v4()}`;
            const imageRef = ref(storage, fileName);
            await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    try {
                        await crateEmployee({
                            ...employee,
                            employeeImage: url,
                        })
                            .then(() => {
                                navigate("/admin/admin/employee");
                            })
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Tạo mới thành công !",
                                    showConfirmButton: false,
                                    timer: 2000,
                                    customClass: {
                                        icon: "icon-post",
                                    },
                                });
                            });
                    } catch (err) {
                        if (err.response.data) {
                            setErrors(err.response.data);
                        }
                    }
                });
            });
        } else {
            try {
                await crateEmployee({
                    ...employee,
                    employeeImage: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg?fit=512%2C20000&quality=95&ssl=1"
                }).then(() => {
                    navigate("/admin/admin/employee");
                })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Tạo mới thành công !",
                            showConfirmButton: false,
                            timer: 2000,
                            customClass: {
                                icon: "icon-post",
                            },
                        });
                    });
            } catch (err) {
                if (err.response.data) {
                    setErrors(err.response.data);
                }
            }
        }
    };
    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: "error",
                title: "Dung lượng ảnh tối đa 3MB",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    icon: "icon-post",
                },
            });
            return;
        }
        setImageUpload(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
        }
        console.log(imgPreviewRef);
    };
    useEffect(() => {
        document.title = "C4Zone - Thêm mới nhân viên";
        loadNewEmployee();
    }, []);
    const loadNewEmployee = async () => {
        const newEmployee = await getNewEmployee();
        setEmployee(newEmployee.data);
    };

    const displayRole = async () => {
        const data = await getAppRoleList()
        setRole(data)
    }
    useEffect(() => { displayRole() }, [])
    
    if (employee === undefined) {
        return null;
    }
    return (
        <div>
            <>
                <Formik
                    initialValues={{
                        employeeCode: employee?.employeeCode,
                        employeeName: "",
                        employeeAddress: "",
                        employeePhone: "",
                        userName: "",
                        employeeImage: "",
                        employeeStartDate: "",
                        employeeBirthday: "",
                        employeeIdCard: "",
                        email: "",
                        employeeGender: "Nam",
                        roleId:roles?.id
                    }}
                    validationSchema={Yup.object({
                        employeeName: Yup.string()
                            .required("Vui lòng nhập tên nhân viên.")
                            .max(100, "Vui lòng nhập dưới 100 kí tự.")
                            .matches(
                                /^[\p{L}\s]+$/u,
                                "Tên nhân viên chỉ được chứa chữ cái và khoảng trắng."),
                        employeeAddress: Yup.string()
                            .required("Vui lòng nhập địa chỉ.")
                            .max(100, "Vui lòng nhập dưới 100 kí tự.")
                            .matches(/^[\p{L}\p{N}\s]+$/u, "Địa chỉ chỉ chứa số, chữ và dấu '/'"),
                        employeePhone: Yup.string()
                            .required("Vui lòng nhập số điện thoại.")
                            .min(10, "Vui lòng chỉ nhập từ 10 đến 11 số.")
                            .max(11, "Vui lòng chỉ nhập từ 10 đến 11 số.")
                            .matches(
                                /^0\d{9,10}$/u,
                                "Số điện thoại phải đúng định dạng 0XXXXXXXXX"),
                        userName: Yup.string()
                            .required("Vui lòng nhập tên tài khoản.")
                            .max(30, "Vui lòng nhập dưới 30 kí tự")
                            .matches(/^[0-9a-zA-Z]+$/u, "Tên tài khoản chỉ chứa chữ và số"),
                       
                        employeeStartDate: Yup.date()
                            .required("Vui lòng nhập ngày bắt đầu làm.."),
                        employeeBirthday: Yup.string()
                            .required("Vui lòng nhập ngày sinh.")
                            .test("age", "Nhân viên chưa đủ 18 tuổi.", function (value) {
                                const currentDate = new Date();
                                const selectedDate = parse(value, "yyyy-MM-dd", new Date());
                                const age = differenceInYears(currentDate, selectedDate);
                                return age >= 18;
                            }),
                        employeeIdCard: Yup.string()
                            .required("Vui lòng nhập CCCD hoặc CMND.")
                            .max(12, "Vui lòng nhập từ 12 kí tự trở xuống.")
                            .matches(
                                /^\d{9}(\d{3})?$/u,
                                "Vui lòng chỉ nhập số và độ dài là 9 hoặc 12."),
                        email: Yup.string()
                        .required("Vui lòng nhập email")

                    })}
                    onSubmit={(value, { setErrors }) => {
                        let timerInterval;
                        Swal.fire({
                            title: "Auto close alert!",
                            html: "I will close in <b></b> milliseconds.",
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const b = Swal.getHtmlContainer().querySelector("b");
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft();
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                        });
                        saveEmployee(value, setErrors);
                    }}>
                    <Form>
                        <div className="container mt-5 pt-5 table-responsive">
                            <div className="row">
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <img
                                        style={{
                                            borderRadius: 50,
                                            objectFit: "cover",
                                            border: "1px solid black",
                                            padding: 20,
                                            width: "90%"
                                        }}
                                        src={employee.employeeImage}
                                        ref={imgPreviewRef}
                                    />
                                    
                                </div>
                                <div className="col-8 d-flex justify-content-center align-items-center">
                                    <fieldset
                                        className="form-input shadow"
                                        style={{
                                            borderRadius: 20,
                                            border: "1px solid #000000",
                                            height: "auto",
                                            padding: 20,
                                            backgroundColor: "#f8f9fa",
                                            width: 790
                                        }}
                                    >
                                        <legend className="float-none w-auto px-3">
                                            <h2>Thêm mới nhân viên</h2>
                                        </legend>
                                        <div className="row">
                                            {/* employeeCode  */}
                                            <div className="col-2 p-2">
                                                <label style={{ fontWeight: "bold" }}>Mã nhân viên</label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    readOnly
                                                    className="form-control border border-dark mt-2"
                                                    name="employeeCode"
                                                    type="text" />
                                            </div>
                                            {/* employeeName  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Tên nhân viên <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name="employeeName"
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeName"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* Address  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Địa chỉ <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name='employeeAddress'
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeAddress"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* phone  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Số điện thoại <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name='employeePhone'
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeePhone"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* Account  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Tên tài khoản <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name='userName'
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="userName"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* image  */}
                                            <div className="col-2 p-2">
                                                <label>Ảnh nhân viên</label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    type="file"
                                                    className="form-control border border-dark mt-2 mb-4"
                                                    aria-describedby="inputGroupFileAddon03"
                                                    aria-label="Upload"
                                                    accept="image/png, image/gif, image/jpeg"
                                                    ref={inputFileRef}
                                                    onChange={handleInputChange}
                                                    name="employeeImage"
                                                   
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeImage"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* startDay  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Ngày vào làm <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name="employeeStartDate"
                                                    className="form-control border border-dark mt-2"
                                                    type="date"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeStartDate"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* birthDay  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Ngày sinh <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name="employeeBirthday"
                                                    className="form-control border border-dark mt-2"
                                                    type="date"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeBirthday"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* idCart  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    CCCD <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name="employeeIdCard"
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeIdCard"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* email  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Email <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field
                                                    name="email"
                                                    className="form-control border border-dark mt-2"
                                                    type="text"
                                                />
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="email"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* gender  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Giới tính <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                <Field as="select" name="employeeGender" className="form-select border border-dark mt-2">
                                                    
                                                    <option value="Nam" >Nam</option>
                                                    <option value="Nữ" >Nữ</option>
                                                </Field>
                                                <div style={{ height: 16 }}>
                                                    <ErrorMessage
                                                        name="employeeGender"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                            {/* job  */}
                                            <div className="col-2 p-2">
                                                <label>
                                                    Công việc <sup style={{ color: "red" }}>*</sup>
                                                </label>
                                            </div>
                                            <div className="col-4">
                                        
                                                <Field as="select" name="roleId" className="form-select border border-dark mt-2">
                                                
                                                    {roles.map(role => (<option key={role.id} value={role.id} label={role.type} />))}
                                                    
                                                </Field>
                                                <div style={{ height: 16 }}>
                                                   <ErrorMessage
                                                        name="email"
                                                        style={{ color: "red", marginLeft: "20px" }}
                                                        component={"small"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* button  */}
                                            <div className="col-3 p-2 mt-3">
                                                <Link to={"/admin/admin/employee"}>
                                                    <button className="btn btn-outline-secondary float-end mx-1 mt-2 shadow">
                                                        Trở về
                                                    </button>
                                                </Link>
                                                <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                                type='submit'>
                                                    Lưu
                                                </button>
                                            </div>
                                            {/* information  */}
                                            <div className="col-9 p-4 float-end">
                                                <span className="float-end">
                                                    (<span style={{ color: "red" }}>*</span>) Thông tin bắt buộc
                                                </span>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </>

        </div>
    );
}

export default CreateEmployee;