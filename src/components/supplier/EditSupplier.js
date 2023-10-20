import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import * as supplierService from '../../service/supplier/SupplierService'
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import HeaderAdmin from "../user/HeaderAdmin";

function EditSupplier() {
    const navigate = useNavigate();
    const [address, setAddress] = useState([]);
    const [supplier, setSupplier] = useState(null);
    const {id} = useParams();


    useEffect(() => {
        findSupplier();
        getAllAddress()
    }, [id]);

    const findSupplier = async () => {
        const res = await supplierService.findSupplierById(id);
        setSupplier(res);
    }

    const getAllAddress = async () => {
        const data = await supplierService.getAllAddress();
        setAddress(data);
    }

    const editSupplier = async (supplier) => {
        console.log(supplier)
        const res = await supplierService.editSupplier(supplier);
        if (res.status === 200) {
            navigate("/admin/supplier")
            toast("Chỉnh sửa thành công!")
        } else {
            toast.error("Chỉnh sửa thất bại!")
        }
    }

    return (supplier && address && address.length !== 0 &&
        <div>
            <HeaderAdmin/>
            <Formik initialValues={
                supplier
            }
                    onSubmit={(values) => {
                        editSupplier(values)
                    }}
                    validationSchema={Yup.object(
                        {
                            nameSupplier: Yup.string()
                                .required("Không được để trống")
                                .matches(/^[^0-9`~!@#$%^()_=\[{\]}\\|;:",><?]+$/, "Tên chỉ chứa chữ cái và một số ký tự đặc biệt &,.,*,'!,/")
                                .max(100, "Tên nhà cung cấp tối đa 100 ký tự")
                                .min(2, "Tên nhà cung cấp tối thiểu 2 ký tự"),
                            phoneNumberSupplier: Yup.string()
                                .required("Không được để trống")
                                .matches(/^[^a-zA-Z`~!@#$%^&*()_\-+=\[{\]}\\|;:'",<.>/?]+$/, "SĐT không chứa ký tự chữ và ký tự đặc biệt")
                                .matches(/^(0|(\+84))[0-9]+$/, "SĐT phải bắt đầu từ 0 hoặc +84")
                                .max(12, "SĐT tối đa 12 chữ số")
                                .min(10, "SĐT tối thiểu 10 chữ số"),
                            emailSupplier: Yup.string()
                                .required("Không được để trống")
                                .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng")
                                .max(100, "Email tối đa 100 ký tự")
                                .min(10, "Email tối thiểu 10 ký tự")
                        }
                    )}
            >
                <div className="d-flex justify-content-center col-8 container mt-5 pt-5">
                    <Form>
                        <fieldset
                            className="form-Field shadow mx-auto"
                            style={{
                                borderRadius: 20,
                                border: "1px solid #000000",
                                height: "auto",
                                padding: 20,
                                backgroundColor: "#f8f9fa",
                                width: 790
                            }}
                        >
                            <legend className="float-none w-auto px-2 h1">Chỉnh sửa nhà cung cấp</legend>
                            <div>
                                <div className="row p-2 mx-auto" style={{width: "90%"}}>
                                    <div className="col-4 p-2">
                                        <label htmlFor="idSupplier">
                                            Mã số <span style={{color: "red"}}>*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            className="form-control shadow mt-2 border border-dark"
                                            type="text"
                                            readOnly
                                            name="idSupplier"
                                            id="idSupplier"
                                            style={{backgroundColor: "DarkGrey"}}
                                        />
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="idSupplier"
                                                component="small"/>
                                        </div>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label htmlFor="nameSupplier">
                                            Tên nhà cung cấp <span style={{color: "red"}}>*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            className="form-control shadow mt-2 border border-dark"
                                            type="text"
                                            name="nameSupplier"
                                            id="nameSupplier"
                                        />
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="nameSupplier"
                                                component="small"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label htmlFor="addressSupplier">
                                            Địa chỉ <span style={{color: "red"}}>*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            as="select"
                                            className="form-control shadow mt-2 border border-dark"
                                            aria-label="Default select example"
                                            id="addressSupplier"
                                            name="addressSupplier"
                                        >
                                            {
                                                address.map((e) => (
                                                    <option key={e.code} value={e.code}>{e.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="addressSupplier"
                                                component="small"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label htmlFor="phoneNumberSupplier">
                                            SĐT <span style={{color: "red"}}>*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            className="form-control shadow mt-2 border border-dark"
                                            type="text"
                                            id="phoneNumberSupplier"
                                            name="phoneNumberSupplier"
                                        />
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="phoneNumberSupplier"
                                                component="small"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>
                                            Email <span style={{color: "red"}}>*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            className="form-control shadow mt-2 border border-dark"
                                            type="text"
                                            name="emailSupplier"
                                            id="emailSupplier"
                                        />
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="emailSupplier"
                                                component="small"
                                            />
                                        </div>
                                    </div>
                                    <div className="row col-12 mt-2">
                                        <div className="col-6">
                                            <div style={{marginLeft: "10%"}}>
                                                <button
                                                    type="submit"
                                                    className="btn btn-outline-primary"
                                                    style={{marginRight: "1rem", width: "25%"}}
                                                >
                                                    Lưu
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => navigate('/admin/supplier')}
                                                >
                                                    Trở về
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6 float-end">
                                                <span className="float-end">
                                                    (<span style={{ color: "red" }}>*</span>) Thông tin bắt buộc
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </Form>
                </div>
            </Formik>
        </div>
    );
}

export default EditSupplier;