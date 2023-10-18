import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as customerService from "../../service/customer/CustomerService"
import {Link} from "react-router-dom";

export function ShoppingHistoryList() {
    const param = useParams();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [searchName, setSearchName] = useState("");
    const [historys, setHistorys] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    const getCustomer = async () => {
        const result = await customerService.findById(param.id);
        console.log(result)
        setCustomer(result.data);
    }
    const getHistory = async () => {
        try {
            const result = await customerService.getAllHistory(param.id, limit, page, searchName);
            setHistorys(result.data.content);
            setRecords(result.data.totalElements);
            setTotalPage(result.data.totalPages);
        } catch (e) {
            setHistorys([]);
            setRecords(0);
            setTotalPage(0);
        }

    }

    useEffect(() => {
        getCustomer();
        getHistory();
    }, [page, refresh]);

    const handleSearch = () => {
        setPage(0);
        setRefresh(!refresh)
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    return (customer &&
        <>
            <div className="container-fluid">
                <div className="my-5 pt-5">
                    <fieldset className="form-input shadow mx-auto" style={{
                        borderRadius: "20px",
                        border: "1px solid black",
                        height: "auto",
                        width: "40%",
                        padding: "20px"
                    }}>
                        <legend className="float-none w-auto px-3" style={{textAlign: "center"}}><h3>Thông tin khách
                            hàng</h3></legend>
                        <table className="info-NguyenHN">
                            <tr>
                                <td>Tên khách hàng:</td>
                                <td style={{paddingLeft: "30%", width: "70%"}}>{customer.nameCustomer}</td>
                            </tr>
                            <tr>
                                <td>Giới tính:</td>
                                <td style={{paddingLeft: "30%"}}>{customer.genderCustomer ? "Nam" : "Nữ"}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại:</td>
                                <td style={{paddingLeft: "30%"}}>{customer.phoneNumberCustomer}</td>
                            </tr>
                            <tr>
                                {
                                    (() => {
                                        const birthDate = new Date(customer.dateOfBirthCustomer);
                                        const currentDate = new Date();
                                        const age = currentDate.getFullYear() - birthDate.getFullYear();

                                        return (
                                            <>
                                                <td>Tuổi:</td>
                                                <td style={{ paddingLeft: "30%" }}>{age}</td>
                                            </>
                                        );
                                    })()
                                }
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td style={{paddingLeft: "30%"}}>{customer.emailCustomer}</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ:</td>
                                <td style={{paddingLeft: "30%"}}>{customer.addressCustomer}</td>
                            </tr>

                        </table>
                    </fieldset>
                </div>
                <div className="container mt-5">
                    <div className="col-12 d-flex justify-content-center">
                        <h2 className="mb-3">Chi tiết lịch sử mua hàng</h2>
                    </div>
                    <div className="col-12 d-flex justify-content-end my-3">
                        <div className="col-auto d-flex justify-content-start" style={{marginRight:"64%"}}>
                            <p className="m-0"> Số lượng: <span style={{color:"#0d6efd"}}>{records}</span> </p>
                        </div>
                        <div className="col-auto mx-2">
                            <input className="form-control" type="search" placeholder="Tìm theo tên"
                                   aria-label="Search" onChange={(name) => {
                                setSearchName(name.target.value)
                            }}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button"
                                    onClick={handleSearch}>Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <table className="border border-dark table table-hover table-layout">
                        <thead>
                        <tr>
                            <th style={{background: "darkgrey", width:"10%"}}>#</th>
                            <th style={{background: "darkgrey", width:"30%"}}>Ngày mua</th>
                            <th style={{background: "darkgrey", width:"40%"}}>Sản phẩm mua</th>
                            <th style={{background: "darkgrey", width:"20%"}}>Số tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historys.length !== 0 ? (
                            historys.map((history, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{new Date(history.dateOfOrder).toLocaleDateString('en-GB')}</td>
                                        <td>{history.nameProduct}</td>
                                        <td>{vnd.format(history.priceOrder)}</td>

                                    </tr>
                                )
                            })) : (<tr>
                            <td colSpan={4} style={{textAlign: "center",color:"red"}}>Không tìm thấy!</td>
                        </tr>)
                        }
                        </tbody>
                    </table>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-auto ms-auto">
                            <nav style={{display: "flex"}} aria-label="Page navigation">
                                <ul className="pagination mb-0 me-2">
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
                                </ul>
                                <Link to="/admin/customer">
                                    <button className="btn btn-outline-primary text-center" type="button">Trở về
                                    </button>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}