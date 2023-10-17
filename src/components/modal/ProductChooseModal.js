import React, {useEffect, useState} from 'react';
import "./modal_table.css";
import * as productService from "../../service/product/ProductService";
const ProductChooseModal = () => {
    const [productList, setProductList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [choose, setChoose] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: ""
    });
    const JWT = localStorage.getItem("JWT");
    console.log(JWT);
    const loadProductList = async (choose,page,searchValue) => {
        const result = await productService.getPageProductModal(choose,page,searchValue);
        if (result?.status === 200) {
            setProductList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            handleReset();
        }
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
    const handleReset = () => {
        setPage(0);
        setChoose("name");
        setSearchValue("");
    }
    useEffect(() => {
        loadProductList(choose, page, searchValue);
    }, [choose, page, searchValue]);

    if (!productList) {
        return <div></div>;
    }
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
                            <div className="mx-auto p-3 " style={{ width: "93%" }} id="TinDT">
                                <table className=" shadow w-100">

                                    <tr style={{ fontSize: "larger", backgroundColor: "darkgrey" }}>
                                        <th style={{ width: "5%", paddingLeft: "1%"}}>STT</th>
                                        <th style={{ width: "40%", paddingLeft: "2%" }}>Tên</th>
                                        <th style={{ width: "20%",paddingLeft: "3%" }}>Giá</th>
                                        <th style={{ width: "10%" }}>CPU</th>
                                        <th style={{ width: "15%" }}>Lưu trữ</th>
                                    </tr>
                                    {productList && productList.length !== 0 ?
                                        <tbody>
                                        {productList.map((product, index) => (
                                            <tr>
                                        <td style={{ width: "5%" , paddingLeft: "2%"}}>{(index + 1) + page * 5}</td>
                                        <td style={{ width: "43%", paddingLeft: "2%" }}>{product?.name}</td>
                                        <td style={{ width: "25%" ,paddingLeft: "3%"}}>{product?.price}</td>
                                        <td style={{ width: "19%" }}>{product?.cpu}</td>
                                        <td style={{ width: "15%" }}>{product?.capacity}</td>
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

export default ProductChooseModal;
