import React, {useEffect, useState} from "react";
import * as customerService from "../../service/customer/CustomerService"
import {Link} from "react-router-dom";
import HeaderAdmin from "../user/HeaderAdmin";
import {toast} from "react-toastify";
import Footer from "../home/common/Footer";

export function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [searchName, setSearchName] = useState("");
    const [searchAge, setSearchAge] = useState("");
    const [searchGender, setSearchGender] = useState("3");
    const [sort, setSort] = useState("");
    const [refresh, setRefresh] = useState(true);
    const pattern = /[!@#$%^&*()_+=|{}<>?]/;

    const getCustomerList = async () => {
        try {
            const array = await customerService.getAllPage(limit, page, searchName, searchAge, searchGender, sort, sort);
            console.log(array)
            setCustomers(array.data.content);
            setRecords(array.data.totalElements);
            setTotalPage(array.data.totalPages);
        } catch (e) {
            setCustomers([]);
            setRecords(0);
            setTotalPage(0);
        }
    }

    useEffect(() => {
        getCustomerList();
    }, [page, refresh, sort]);

    const handleSearch = () => {
        if (pattern.test(searchName)) {
            toast("Không nhập ký tự đặc biệt");
        } else {
            setPage(0);
            setRefresh(!refresh)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    return (
        <>
            <HeaderAdmin/>
            <div className="container mt-5 pt-5 ">
                <div className="col-12 d-flex justify-content-center">
                    <h1>Quản lý báo cáo khách hàng</h1>
                </div>
                <div className="col-12 d-flex justify-content-end my-3">
                    <div className="col-auto d-flex justify-content-start" style={{marginRight: "24%"}}>
                        <p className="m-0"> Số lượng: <span style={{color: "#0d6efd"}}>{records}</span></p>
                    </div>
                    <div className="col-auto mx-1">
                        <select className="form-select" onChange={(sort) => setSort(sort.target.value)}>
                            <option value="0">Sắp xếp số lần mua</option>
                            <option value="1">Tăng dần</option>
                            <option value="2">Giảm dần</option>
                        </select>
                    </div>
                    <div className="col-auto mx-1">
                        <select className="form-select" onChange={(gender) => setSearchGender(gender.target.value)}
                                onKeyDown={handleKeyDown}>
                            <option selected value="3">Tìm theo giới tính</option>
                            <option value="1">Nam</option>
                            <option value="0">Nữ</option>
                        </select>
                    </div>
                    <div className="col-auto mx-1">
                        <input className="form-control" type="number" placeholder="Tìm theo tuổi" aria-label="Search"
                               style={{width: '140px'}}
                               onChange={(age) => (setSearchAge(age.target.value))} onKeyDown={handleKeyDown}/>
                    </div>
                    <div className="col-auto mx-1">
                        <input className="form-control" type="search" placeholder="Tìm theo tên" aria-label="Search"
                               style={{width: '200px'}}
                               onChange={(name) => {
                                   (setSearchName(name.target.value))
                               }} onKeyDown={handleKeyDown}/>
                    </div>
                    <div className="col-auto mx-1">
                        <button className="btn btn-outline-primary text-center" type="button"
                                onClick={handleSearch}>Tìm kiếm
                        </button>
                    </div>
                </div>
                <div style={{minHeight: "520px"}}>
                    <table className="border border-dark table table-hover table-layout">
                        <thead>
                        <tr>
                            <th style={{background: "darkgrey", width: "3%"}}>#</th>
                            <th style={{background: "darkgrey", width: "17%"}}>Họ và tên</th>
                            <th style={{background: "darkgrey", width: "10%"}}>Giới tính</th>
                            <th style={{background: "darkgrey", width: "15%"}}>Email</th>
                            <th style={{background: "darkgrey", width: "5%"}}>Tuổi</th>
                            <th style={{background: "darkgrey", width: "15%"}}>Số điện thoại</th>
                            <th style={{background: "darkgrey", width: "10%"}}>Địa chỉ</th>
                            <th style={{background: "darkgrey", width: "10%", textAlign: "center"}}>Số lần mua</th>
                            <th style={{background: "darkgrey", width: "15%", textAlign: "center"}}>Lịch sử mua hàng
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {customers.length !== 0 ? (
                            customers.map((customer, index) => {
                                // Tính toán số tuổi từ ngày sinh
                                const birthDate = new Date(customer.dateOfBirthCustomer);
                                const currentDate = new Date();
                                let age = currentDate.getFullYear() - birthDate.getFullYear();
                                // Kiểm tra nếu chưa qua sinh nhật trong năm hiện tại
                                if (
                                    currentDate.getMonth() < birthDate.getMonth() ||
                                    (currentDate.getMonth() === birthDate.getMonth() &&
                                        currentDate.getDate() < birthDate.getDate())
                                ) {
                                    age--;
                                }
                                return (
                                    <tr key={customer.idCustomer}>
                                        <td>{index + 1}</td>
                                        <td>{customer.nameCustomer}</td>
                                        <td>{customer.genderCustomer ? 'Nam' : 'Nữ'}</td>
                                        <td>{customer.emailCustomer}</td>
                                        <td>{age}</td>
                                        <td>{customer.phoneNumberCustomer}</td>
                                        <td>{customer.addressCustomer}</td>
                                        <td style={{textAlign: "center"}}>{customer.totalPurchases}</td>
                                        <td style={{textAlign: "center"}}>
                                            <Link className="btn btn-outline-primary"
                                                  to={`/admin/business/customer/history/${customer.idCustomer}`}>Xem</Link>
                                        </td>
                                    </tr>
                                )
                            })) : (<tr>

                            <td colSpan={9} style={{textAlign: "center", color: "red"}}>Không tìm thấy</td>

                        </tr>)
                        }

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="container mt-3 mb-5">
                <div className="row">
                    <div className="col-auto ms-auto">
                        <nav className="bottom" aria-label="Page navigation">
                            <ul className="pagination mb-0 ">
                                <li className="page-item">
                                    <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                                       onClick={() => setPage(0)} tabIndex="-1" href="#"
                                       aria-disabled="true">Đầu</a>
                                </li>
                                <li className="page-item ">
                                    <a onClick={() => previousPage()}
                                       className={`page-link ${page <= 0 ? "disabled" : ""}`} href="#" tabIndex="-1"
                                       aria-disabled="true">Trước</a>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link" href="#">{page + 1}/{totalPage}</a>
                                </li>
                                <li className="page-item">
                                    <a onClick={() => nextPage()}
                                       className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                       href="#">Sau</a>
                                </li>
                                <li className="page-item">
                                    <a className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`} href="#"
                                       onClick={() => setPage(totalPage - 1)}>Cuối</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}