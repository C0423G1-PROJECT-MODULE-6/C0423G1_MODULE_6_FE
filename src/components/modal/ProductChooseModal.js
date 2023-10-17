import React from 'react';
import "./modal_table.css";
const ProductChooseModal = () => {
    return (
        <div className="modal fade" id="exampleModalProduct" data-bs-backdrop="static" tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Chọn sản phẩm</h1>
                    </div>
                    <div className="modal-body">
                        <div className="pt-3">
                            <div
                                className="row g-3 align-items-center justify-content-end mb-2"
                                style={{ marginRight: "4%" }}
                            >
                                <div className="col-auto">
                                    <h1 htmlFor="inputPassword6" className="col-form-label">
                                        Tìm kiếm theo
                                    </h1>
                                </div>
                                <div className="col-auto">
                                    <select className="form-select shadow border-dark">
                                        <option value={1}>Tên sản phẩm</option>
                                        <option value={2}>Loại sản phẩm</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control shadow border-dark"
                                        aria-describedby="passwordHelpInline"
                                    />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-primary text-center shadow ">
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center p-2">
                                <button
                                    className=" btn btn-outline-primary shadow"
                                    style={{ marginRight: "2rem", width: "14%" }}
                                >
                                    Chọn
                                </button>
                                <button
                                    className=" btn btn-outline-secondary shadow"
                                    data-bs-dismiss="modal"
                                    style={{ width: "14%" }}
                                >
                                    Hủy
                                </button>
                            </div>
                            <div className="mx-auto p-3 " style={{ width: "93%" }}>
                                <table className=" shadow w-100">
                                    <tbody>
                                    <tr style={{ fontSize: "larger", backgroundColor: "darkgrey" }}>
                                        <th style={{ width: "15%", paddingLeft: "1%"}}>STT</th>
                                        <th style={{ width: "30%" }}>Tên</th>
                                        <th style={{ width: "25%" }}>Giá</th>
                                        <th style={{ width: "19%" }}>CPU</th>
                                        <th style={{ width: "15%" }}>Lưu trữ</th>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "15%" }}>1</td>
                                        <td style={{ width: "30%" }}>Sam Sung Galaxy S21 4GB-250GB</td>
                                        <td style={{ width: "25%" }}>23.190.000</td>
                                        <td style={{ width: "19%" }}>SCT 301</td>
                                        <td style={{ width: "15%" }}>250 GB</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        {/* Footer của Modal */}
                        <div className="row col-12 mx-auto">
                            <div className="col-6 p-3">
                                <div style={{ marginLeft: "8%" }}>
                                    <button
                                        className=" btn btn-outline-secondary shadow"
                                        data-bs-dismiss="modal"
                                        style={{ width: "35%" }}
                                    >
                                        Trở về
                                    </button>
                                </div>
                            </div>
                            <div className="col-6 mt-3">
                                <div className="float-end " style={{ marginRight: "8%" }}>
                                    <nav aria-label="Page navigation example ">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link " href="#">
                                                    Trước
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link " href="#">
                                                    1/2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link " href="#">
                                                    Sau
                                                </a>
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

export default ProductChooseModal;
