import React, {useEffect, useState} from "react";
import * as orderService from "../../service/order/OrderService"
import HeaderAdmin from "../user/HeaderAdmin";

export function SaleHistory() {
    const [saleHistorys, setSaleHistorys] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [searchName, setSearchName] = useState("");
    const [refresh, setRefresh] = useState(true);

    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    const getSaleHistory = async () => {
        try {
            const array =  await orderService.getSaleHistory(limit, page, searchName);
            setSaleHistorys(array.data.content);
            setRecords(array.data.totalElements);
            setTotalPage(array.data.totalPages);
        }catch (e) {
            setSaleHistorys([]);
            setRecords(0);
            setTotalPage(0);
        }

    }
    useEffect(() => {
        getSaleHistory();
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
    return(
        <>
            <HeaderAdmin/>
            <div className="container mt-5 pt-5">
                <div className="col-12 d-flex justify-content-center my-3">
                    <h1>Lịch sử bán hàng</h1>
                </div>
                <div className="row my-3">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="col-auto me-2">
                            <select className="form-select">
                                <option selected>--Sắp xếp theo--</option>
                                <option>Thời Gian</option>
                                <option>Khách Hàng</option>
                                <option>Tên Sản Phẩm</option>
                                <option>Số lượng</option>
                                <option>Tổng tiền</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <input className="form-control" type="search" aria-label="Search" placeholder="Tìm tên khách hàng"
                                   onChange={(name) => (setSearchName(name.target.value))}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button"
                                    onClick={handleSearch}>Tìm kiếm</button>
                        </div>
                    </div>

                </div>
                <table className="border border-dark table table-hover">
                    <thead>
                    <tr>
                        <th style={{background: "darkgrey", width:"10%"}}>#</th>
                        <th style={{background: "darkgrey", width:"15%"}}>Ngày</th>
                        <th style={{background: "darkgrey", width:"15%"}}>Thời Gian</th>
                        <th style={{background: "darkgrey", width:"20%"}}>Họ và tên khách hàng</th>
                        <th style={{background: "darkgrey", width:"23%"}}>Thông tin mua hàng</th>
                        <th style={{background: "darkgrey", width:"17%"}}>Tổng tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {saleHistorys.length !==0?(
                        saleHistorys.map((sale, index)=>{
                            return(
                                <tr key={sale.idOrderBill}>
                                    <td>{index+1}</td>
                                    <td>{new Date(sale.dateOfOrder).toLocaleDateString('en-GB')}</td>
                                    <td>{sale.timeOfOrder}</td>
                                    <td>{sale.nameCustomer}</td>
                                    <td>{sale.infoBuy}</td>
                                    <td>{vnd.format(sale.totalMoney)}</td>
                                </tr>
                            )
                        })):(
                        <tr>

                            <td colSpan={6} style={{textAlign: "center", color:"red"}}>Không tìm thấy!</td>

                        </tr>
                    )
                    }
                    </tbody>
                </table>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-auto ms-auto">
                            <nav className="bottom" aria-label="Page navigation">
                                <ul className="pagination mb-0 ">
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
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}