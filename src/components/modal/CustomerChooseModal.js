import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import * as customerService from '../../service/customer/CustomerService';
import "./modal_table.css";
import {Field, Form, Formik, ErrorMessage} from "formik";

const CustomerChooseModal = ({handleData}) => {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState(3);
    const [age, setAge] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState({
        idCustomer: null,
        nameCustomer: ""
    });
    const [optionSearch, setOptionSearch] = useState();
    const loadCustomerList = async (page, name, age, gender) => {
        const result = await customerService.getAllCustomerModal(page, name, age, gender);
        if (result?.status === 200) {
            setCustomerList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            handleReset();
        }
    }
    const handleOptionSearchChange = (e) => {
        const {value} = e.target;
        setOptionSearch(+value);
        setSearchValue(document.getElementById("search").value);
        handleReset();
    }
    const handleReset = () => {
        setPage(0);
        setName("");
        setAge("");
        setGender("");
    }
    const handleSubmit = () => {
        console.log(selectedCustomer);
        let submitModal = document.getElementById("submitModal");
        submitModal.setAttribute("data-bs-dismiss", "modal");
        submitModal.click()
        submitModal.removeAttribute("data-bs-dismiss");
        handleData(selectedCustomer.idCustomer);
    }
    const previousPage = () => {
        if (page > 0) {
            setPage((pre) => pre - 1)
        }
    }

    const nextPage = () => {
        if (page + 1 < totalPage) {
            setPage((pre) => pre + 1)
        }
    }
    const handleEditEvent = () => {
        if (selectedCustomer.id == null) {
            alert("Vui long chon khachs hang")
        }
    }
    useEffect(() => {
        loadCustomerList(page, name, age, gender);
    }, [page, name, age, gender]);

    if (!customerList) {
        return <div></div>;
    }
    return (
        <div className="modal fade" id="exampleModalCustomer" data-bs-backdrop="static" tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Chọn khách hàng có sẵn</h1>
                    </div>
                    <div className="modal-body">
                        <div className="pt-4">
                            <div className="row g-3 align-items-center justify-content-end" style={{marginRight: '3%'}}>
                                <div className="col-auto">
                                    <h1 className="col-form-label">Tìm kiếm theo</h1>
                                </div>
                                <div className="col-auto">
                                    <select name='optionSearch' defaultValue={0} onChange={handleOptionSearchChange}
                                            className="form-select shadow border-dark">
                                        <option value="1">Tên khách hàng</option>
                                        <option value="2">Giới tính</option>
                                        <option value="3">Tuổi</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <input type="text" name="inputSearch" id="inputPassword6"
                                           className="shadow form-control border-dark"
                                           aria-describedby="passwordHelpInline"/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-primary text-center shadow">Tìm kiếm</button>
                                </div>
                            </div>
                            <div className="mx-auto p-3" style={{width: '95%'}}>
                                <table className=" shadow w-100 " >
                                    <thead style={{fontSize: 'large', backgroundColor: 'darkgrey'}}>
                                    <tr >
                                        <th style={{width: '6%'}} className="text-center">STT</th>
                                        <th style={{width: '20%'}}>Tên khách hàng</th>
                                        <th style={{width: '15%'}}>Số điện thoại</th>
                                        <th style={{width: '25%'}}>Địa chỉ</th>
                                        <th style={{width: '10%'}}>Tuổi</th>
                                        <th style={{width: '31%'}}>Email</th>
                                    </tr>
                                    </thead>
                                    {customerList && customerList.length !== 0 ?
                                        <tbody>
                                        {customerList.map((customer, index) => (
                                            <tr key={index} id={index} onClick={() => {
                                                if (selectedCustomer.idCustomer === null || selectedCustomer.idCustomer !== customer?.id) {
                                                    setSelectedCustomer({ idCustomer: customer?.idCustomer, nameCustomer: customer?.nameCustomer });
                                                } else {
                                                    setSelectedCustomer({ idCustomer: null, nameCustomer: "" });
                                                }
                                            }} style={(selectedCustomer.nameCustomer === customer?.nameCustomer) ?{
                                                background: '#0d6efd',
                                                height: 50
                                            } : {height: 50}}
                                            >
                                                <td className="text-center">
                                                    {(index + 1) + page * 5}
                                                </td>
                                                <td>{customer?.nameCustomer}</td>
                                                <td>{customer?.phoneNumberCustomer}</td>
                                                <td>{customer?.addressCustomer}</td>
                                                <td>1</td>
                                                <td>{customer?.emailCustomer}</td>
                                            </tr>))}
                                        </tbody> :
                                        <tbody>
                                        <tr style={{height: '150px'}}>
                                            <td style={{fontSize: '30px', textAlign: 'center'}} colSpan="6">Không có dữ
                                                liệu
                                            </td>
                                        </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* Footer của Modal */}
                        <div className="row col-12 mx-auto">
                            <div className="col-6 p-3">
                                <div style={{marginLeft: '8%'}}>
                                    <button className="btn btn-outline-primary shadow"
                                            style={{marginRight: '2rem', width: '40%'}}
                                            id="submitModal"
                                            onClick={() => handleSubmit()}>
                                        Chọn
                                    </button>
                                    <button className="btn btn-outline-secondary shadow" data-bs-dismiss="modal"
                                            style={{width: '40%'}}>
                                        Trở về
                                    </button>
                                </div>
                            </div>
                            <div className="col-6 mt-3">
                                <div className="float-end" style={{marginRight: '8%'}}>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <button className="page-link " onClick={() => previousPage()}
                                                        href="#">Trước
                                                </button>
                                            </li>
                                            <li className="page-item"><button className="page-link "
                                                                        >{page + 1} / {totalPage}</button></li>
                                            <li className="page-item">
                                                <button className="page-link " onClick={() => nextPage()} href="#">Sau
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerChooseModal;
