import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import * as supplierService from '../../service/supplier/SupplierService'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import HeaderAdmin from "../user/HeaderAdmin";

function EditSupplier() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-center col-8 container mt-5 pt-5">
                <form>
                    <fieldset
                        className="form-input shadow mx-auto"
                        style={{
                            borderRadius: 20,
                            border: "1px solid #000000",
                            height: "auto",
                            padding: 20,
                            backgroundColor: "#f8f9fa",
                            width: 790
                        }}
                    >
                        <legend className="float-none w-auto px-2">Chỉnh sửa nhà cung cấp</legend>
                        <div>
                            <div className="row p-2 mx-auto" style={{ width: "90%" }}>
                                <div className="col-4 p-2">
                                    <label>
                                        Mã số <span style={{ color: "red" }}>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                        readOnly=""
                                    />
                                    <div>
                                        <small className="p-3 mb-2 text-danger">Error</small>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Tên nhà cung cấp <span style={{ color: "red" }}>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                    />
                                    <div>
                                        <small className="p-3 mb-2 text-danger">Error</small>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Địa chỉ <span style={{ color: "red" }}>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <select
                                        className="form-select mt-2 border border-dark"
                                        aria-label="Default select example"
                                        id="address"
                                    >
                                        <option>Chọn địa chỉ</option>
                                        <option value={1} selected="">
                                            Hồ Chí Minh
                                        </option>
                                        <option value={2}>Hà Nội</option>
                                        <option value={3}>Đà Nẵng</option>
                                    </select>
                                    <div>
                                        <small className="p-3 mb-2 text-danger">Error</small>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        SĐT <span style={{ color: "red" }}>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                    />
                                    <div>
                                        <small className="p-3 mb-2 text-danger">Error</small>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Email <span style={{ color: "red" }}>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                        defaultValue="vanissa08@gmail.com"
                                    />
                                    <div>
                                        <small className="p-3 mb-2 text-danger">Error</small>
                                    </div>
                                </div>
                                <div className="row col-12 mt-2">
                                    <div className="col-6">
                                        <div style={{ marginLeft: "10%" }}>
                                            <button
                                                type="submit"
                                                className="btn btn-outline-primary"
                                                style={{ marginRight: "1rem", width: "25%" }}
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
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

        </div>
    );
}

export default EditSupplier;