import React, {useEffect, useState} from 'react';
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {addCustomer} from "../../service/customer/CustomerService";
import {isAfter, parseISO} from "date-fns";
import XRegExp from "xregexp";

const CustomerCreateModal = ({handleData}) => {
    const validateBirth = (value) => {
        const currentDate = new Date();
        const birthday = parseISO(value);
        return !isAfter(birthday, currentDate);
    };
    const handleSubmit = async (value, setErrors) => {
        console.log("create")
        try {
            const result = await addCustomer(value);
            let submitModal = await document.getElementById("closeModalCreate");
            submitModal.click();
            handleData(result.data.idCustomer);
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            }
        }
    };
    return (
        <Formik
            initialValues={
                {
                    nameCustomer: "",
                    phoneNumberCustomer: "",
                    dateOfBirthCustomer: "",
                    emailCustomer: "",
                    addressCustomer: "",
                    genderCustomer: true,
                }
            }
            validationSchema={Yup.object({
                nameCustomer: Yup.string()
                    .max(100, "Tên khách hàng tối đa 100 ký tự!")
                    .min(3, "Tên khách hàng tối thiểu 3 ký tự .").required("Không bỏ trống trường này.").matches(XRegExp('^\\p{Lu}\\p{Ll}*([\\s]\\p{Lu}\\p{Ll}*)*$'),"Nhập sai định dạng tên."),
                dateOfBirthCustomer: Yup.string().required(
                    "Không bỏ trống trường này ."
                ).test("birthday",
                    "Ngày sinh không được vượt quá thời gian thực tế .",
                    validateBirth).matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Không đúng định dạng vd:12-02-2000."),
                addressCustomer: Yup.string()
                    .required("Không bỏ trống trường này.")
                    .max(100, "Địa chỉ tối đa 100 ký tự ").min(5, "Địa chỉ tối thiểu 5 ký tự."),
                phoneNumberCustomer: Yup.string()
                    .required("Không bỏ trống trường này .")
                    .max(11, "Số điện thoại tối đa 11 ký tự.")
                    .min(10, "Số điện tối thiểu 10 ký tự .").matches(/^(0[3|5|7|8|9])([0-9]{8})\b$/
                        , "Nhập sai định dạng vd: 0339779768 ."),
                emailCustomer: Yup.string()
                    .required("Không bỏ trống trường này!").min(12, "Email tối thiểu 12 ký tự.")
                    .matches(
                        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                        "Nhập sai định dạng vd:nguyenvanan@gmail.com ."
                    ).max(50, "Email tối đa 50 ký tự ."),
            })}
            onSubmit={(values, {setErrors}) => {
                console.log("1");
                handleSubmit(values, setErrors);
            }}>
            <Form>
                <div className="modal fade" id="exampleModalCreateCustomer" data-bs-backdrop="static" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-3" id="exampleModalLabel">Thêm mới thông tin khách
                                    hàng</h1>
                            </div>
                            <div className="modal-body">
                                <div className="row p-2 mx-auto" style={{width: '80%'}}>
                                    <div className="row p-2 mx-auto" style={{width: "80%"}}>
                                        <div className="col-4 p-2">
                                            <label>
                                                Tên khách hàng <span className="text-danger">*</span>{" "}
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field
                                                className="form-control shadow mt-2 border border-dark"
                                                type="text"
                                                name="nameCustomer"
                                            />
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="nameCustomer"
                                                    component="small"
                                                /></div>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>
                                                Giới tính <span className="text-danger">*</span>{" "}
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field as="select" name="genderCustomer"
                                                   className="form-select shadow mt-2 border border-dark">
                                                <option value={true}>Nam</option>
                                                <option value={false}>Nữ</option>
                                            </Field>
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>

                                            </div>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>
                                                Số điện thoại <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field
                                                className="form-control shadow mt-2 border border-dark"
                                                type="text"
                                                name="phoneNumberCustomer"
                                            />
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="phoneNumberCustomer"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>
                                                Ngày sinh <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field
                                                className="form-control shadow mt-2 border border-dark"
                                                type="date"
                                                name="dateOfBirthCustomer"
                                            />
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="dateOfBirthCustomer"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>
                                                Địa chỉ email <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field
                                                className="form-control shadow mt-2 border border-dark"
                                                type="email"
                                                name="emailCustomer"
                                            />
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="emailCustomer"
                                                    component="small"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-4 p-2">
                                            <label>
                                                Địa chỉ <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <Field
                                                className="form-control mt-2 shadow border border-dark"
                                                as="textarea"
                                                name="addressCustomer"/>
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="addressCustomer"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row col-12 mx-auto">
                                    <div className="col-8 p-3">
                                        <div style={{marginLeft: '9%'}}>
                                            <button className="btn btn-outline-primary shadow"
                                                    id="submitModal"
                                                    style={{marginRight: '1rem', width: '30%'}} type="submit">
                                                Lưu
                                            </button>
                                            <button className="btn btn-outline-secondary shadow"
                                                    style={{marginRight: '1rem',width: '30%'}} type="reset">
                                                Làm mới
                                            </button>
                                            <button className="btn btn-outline-secondary shadow" data-bs-dismiss="modal"
                                                    id="closeModalCreate"
                                                    style={{width: '30%'}} type="button">
                                                Trở về
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-4 mt-3">
                                        <div className="float-end" style={{marginRight: '20%'}}>
                                            <small className="text-danger">(*)</small> Thông tin bắt buộc
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default CustomerCreateModal;
