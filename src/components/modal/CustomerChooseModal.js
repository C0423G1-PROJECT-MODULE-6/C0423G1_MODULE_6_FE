import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
// import * as customerService from '../../service/customer/CustomerService';
import "./modal_table.css";
import {Field, Form, Formik, ErrorMessage} from "formik";
import {getAllCustomerModal} from "../../service/customer/CustomerService";

const CustomerChooseModal = ({handleData}) => {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [change, setChange] = useState(0);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState({
        idCustomer: null,
        nameCustomer: ""
    });
    // const [optionSearch, setOptionSearch] = useState();
    const loadCustomerList = async (page, name, phone, gender) => {
        const result = await getAllCustomerModal(page, name, phone, gender);
        if (result?.status === 200) {
            setCustomerList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            setCustomerList([]);
        }
    }
    const handleOptionSearchChange = (e) => {
        const {value} = e.target;
        setChange(+value);
        // loadCustomerList();
    }
    const handleReset = () => {
        setPage(0);
        setName("");
        setPhone("");
        setGender("");
    }
    const handleSubmitCustomer = () => {
        console.log(selectedCustomer);
        let submitModal = document.getElementById("submitModalCustomer");
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
    const handleSearch = () => {
        const choose = +document.getElementById("chooseSearchCustomer").value;
        const value = document.getElementById("search").value;
        let valueGender = document.getElementById("valueGender");
        // if (valueGender) {
        //     valueGender = valueGender.value;
        // }
        if (choose === 0) {
            setName(value);
            setPhone("");
            setGender("");
            setPage(0);
            setSelectedCustomer({
                idCustomer: null,
                nameCustomer: ""
            })
        }
        if (choose === 1) {
            console.log(name)
            console.log(gender)
            console.log(phone)
            setName(value);
            setGender(valueGender.value);
            setPhone("");
            setPage(0);
            setSelectedCustomer({
                idCustomer: null,
                nameCustomer: ""
            })
        }
        if (choose === 2) {
            console.log(name)
            console.log(gender)
            console.log(phone)
            setName("");
            setGender("");
            setPhone(value);
            setPage(0);
            setSelectedCustomer({
                idCustomer: null,
                nameCustomer: ""
            })
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
        loadCustomerList(page, name, phone, gender);
    }, [page, name, phone, gender, change]);

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
                                    <select name='optionSearch' defaultValue={0} id="chooseSearchCustomer"
                                            className="form-select shadow border-dark"
                                            onChange={handleOptionSearchChange}>
                                        <option value={0}>Tên khách hàng</option>
                                        <option value={1}>Giới tính</option>
                                        <option value={2}>Số điện thoại</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    {change === 1 &&
                                    <select className="form-select shadow border-dark" name="groupValue"
                                            id="valueGender">
                                        <option value={"0"}>Nữ</option>
                                        <option value={"1"}>Nam</option>
                                        <option value={"2"}>Tất cả</option>
                                    </select>}
                                </div>
                                <div className="col-auto">

                                    <input type="text" name="inputSearch" id="search"
                                           className="shadow form-control border-dark"
                                           aria-describedby="passwordHelpInline"
                                           placeholder={(change === 2) ? "Nhập tên số điện thoại..." : "Nhập tên khách hàng"}
                                    />

                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-primary text-center shadow"
                                            onClick={handleSearch}>Tìm kiếm
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto p-3 " style={{width: '95%'}} id="TinDT">
                                <table className=" shadow w-100 ">
                                    <thead style={{fontSize: 'large', backgroundColor: 'darkgrey'}}>
                                    <tr>
                                        <th style={{width: '6%'}} className="text-center">STT</th>
                                        <th style={{width: '20%'}}>Tên khách hàng</th>
                                        <th style={{width: '15%'}}>Số điện thoại</th>
                                        <th style={{width: '20%'}}>Địa chỉ</th>
                                        <th style={{width: '15%'}}>Ngày sinh</th>
                                        <th style={{width: '31%'}}>Email</th>
                                    </tr>
                                    </thead>
                                    {customerList && customerList.length !== 0 ?
                                        <tbody>
                                        {customerList.map((customer, index) => (
                                            <tr key={index} id={index} onClick={() => {
                                                if (selectedCustomer.idCustomer === null || selectedCustomer.idCustomer !== customer?.idCustomer) {
                                                    setSelectedCustomer({
                                                        idCustomer: customer?.idCustomer,
                                                        nameCustomer: customer?.nameCustomer
                                                    });
                                                } else {
                                                    setSelectedCustomer({idCustomer: null, nameCustomer: ""});
                                                }
                                            }} style={(selectedCustomer.idCustomer === customer?.idCustomer) ? {
                                                background: '#282c34',
                                                color: '#f5f5f5',
                                                height: 50
                                            } : {height: 50}}
                                            >
                                                <td className="text-center">
                                                    {(index + 1) + page * 5}
                                                </td>
                                                <td>{customer?.nameCustomer}</td>
                                                <td>{customer?.phoneNumberCustomer}</td>
                                                <td>{customer?.addressCustomer}</td>
                                                <td>{customer?.dateOfBirthCustomer}</td>
                                                <td>{customer?.emailCustomer}</td>
                                            </tr>))}
                                        </tbody> :
                                        <tbody>
                                        <tr style={{height: '150px'}}>
                                            <td style={{fontSize: '30px', textAlign: 'center'}} colSpan="6">Không tìm
                                                thấy khách hàng phù hợp
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
                                    {selectedCustomer.idCustomer === null ? null : (
                                        <button
                                            className="btn btn-outline-primary shadow"
                                            style={{marginRight: '2rem', width: '40%'}}
                                            id="submitModalCustomer"
                                            onClick={() => handleSubmitCustomer()}
                                        >
                                            Chọn
                                        </button>
                                    )}
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
                                            <li className="page-item">
                                                <button className="page-link "
                                                >{page + 1} / {totalPage}</button>
                                            </li>
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
