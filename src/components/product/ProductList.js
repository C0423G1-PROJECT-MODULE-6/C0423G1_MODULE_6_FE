import React, {useEffect, useState} from "react";
import {getAllType, getListProduct, removeProduct} from "../../service/product/ProductService";
import {toast, ToastContainer} from "react-toastify";
import HeaderAdmin from "../user/HeaderAdmin";
import {Link, Route, useNavigate} from "react-router-dom";
import './table_quan.css'
import Footer from "../home/common/Footer";

export default function ProductList() {
    const [listType, setListType] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [value, setValue] = useState("");
    const [choose, setChoose] = useState("name");
    const [sort, setSort] = useState("");
    const [otherSort, setOtherSort] = useState("dsc");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();
    const pattern = /[!@#$%^&*(),.?":{}|<>[\]/\\]/;
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    const handleSearch = () => {
        if (pattern.test(value)) {
            toast("Không được nhập kí tự đặc biệt")
        } else {
            setPage(0);
            setSelectedProducts([]);
            list()
        }

    }
    const showModal = () => {
        if (selectedProducts.length === 0) {
            toast("Vui lòng chọn sản phẩm");
        } else {
            setModal(true)
        }
    }
    const handleUpdate = () => {
        if (selectedProducts.length === 0) {
            toast("vui lòng chọn sản phẩm")
        } else {
            navigate(`/admin/product/update/${selectedProducts[0].id}`)
        }
    }
    const confirmDelete = async () => {
        selectedProducts.map(async p => {
            await removeProduct(p.id)
        })
        toast("Xóa thành công");
        setModal(false);
        setSelectedProducts([]);
        list();
    }
    const list = async () => {
        const list = await getListProduct(sort, otherSort, choose, value, page);
        setListProduct(list.content);
        const res = await getAllType();
        setListType(res)
        setTotalPages(list.totalPages);
        setTotalElements(list.totalElements);
    }
    useEffect(() => {
        list()
    }, [page, modal])
    return (
        <>
            <HeaderAdmin/>
            <div className="container mt-5 pt-5">
                <div className="col-12 d-flex justify-content-center my-3">
                    <h1>Thông tin hàng hóa</h1>
                </div>
                <div className="row my-3">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={(event) => setSort(event.target.value)}>
                                <option value="">Sắp xếp theo</option>
                                <option value="name">Tên</option>
                                <option value="price">Giá</option>
                                <option value="quantity">Số lượng</option>
                                <option value="type">Loại</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={event => setOtherSort(event.target.value)}>
                                <option value="dsc">Giảm gần</option>
                                <option value="asc">Tăng dần</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={(event) => {
                                setChoose(event.target.value);
                                setValue("")
                            }}>
                                <option value="name">Tìm theo tên</option>
                                <option value="price">Tìm theo giá</option>
                                <option value="quantity">Theo số lượng</option>
                                <option value="type">Theo Loại</option>
                            </select>
                        </div>
                        <div className="col-auto me-2" style={{width: "15%"}}>
                            {choose === "price" && (
                                <select onChange={event => setValue(event.target.value)} className="form-select"
                                        name="price" id="price">
                                    <option value="">Chọn giá</option>
                                    <option value="smaller 5m">Dưới 5 triệu</option>
                                    <option value="5m to 10m">5 đến 10 triệu</option>
                                    <option value="better 10m">Trên 10 triệu</option>
                                </select>
                            )}
                            {choose === "quantity" && (
                                <select onChange={event => setValue(event.target.value)} className="form-select"
                                        name="quantity" id="quantity">
                                    <option value="">Chọn số lượng</option>
                                    <option value="smaller 10">Dưới 10</option>
                                    <option value="10 to 50">Từ 10 đến 50</option>
                                    <option value="better 50">Trên 50</option>
                                </select>)}
                            {choose === "type" && (
                                <select onChange={event => setValue(event.target.value)} className="form-select"
                                        name="type">
                                    <option value="">Chọn loại</option>
                                    {listType.map((type) => (
                                            <option key={type.idType} value={type.idType}>{type.name}</option>
                                        )
                                    )}
                                </select>)}
                            {choose === "name" && (
                                <input name="name" id="name" className="form-control"
                                       onChange={(event => setValue(event.target.value))} type="search"
                                       onKeyDown={(event => {
                                           if (event.key === 'Enter') {
                                               handleSearch()
                                           }
                                       })}
                                       aria-label="Search"/>
                            )}
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button"
                                    onClick={() => {
                                        handleSearch()
                                    }}>Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{minHeight: "455px"}} id="QuanND">
                    <table className="shadow w-100">
                        <thead>
                        <tr style={{background: "darkgrey"}}>
                            <th style={{background: "darkgrey"}}>#</th>
                            <th style={{background: "darkgrey"}}>Tên</th>
                            <th style={{background: "darkgrey"}}>Giá</th>
                            <th style={{background: "darkgrey"}}>CPU</th>
                            <th style={{background: "darkgrey"}}>Loại</th>
                            <th style={{background: "darkgrey"}}>Màu</th>
                            <th style={{background: "darkgrey"}}>Lưu Trữ</th>
                            <th style={{background: "darkgrey"}}>Số lượng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listProduct && listProduct.map((p, status) =>
                            (<tr key={p.id} onClick={() => {
                                const isSelected = selectedProducts.find(product => product.id === p.id);

                                if (isSelected) {
                                    const updatedProducts = selectedProducts.filter(product => product.id !== p.id);
                                    setSelectedProducts(updatedProducts);
                                } else {
                                    const updatedProducts = [...selectedProducts, {
                                        id: p.id,
                                        name: p.name
                                    }];
                                    setSelectedProducts(updatedProducts);
                                }
                            }}
                                 style={{
                                     height: "40px",
                                     background: selectedProducts.some(product => product.id === p.id) ? "darkgrey" : "white"
                                 }}
                            >
                                <td style={{width: "5%"}}>{(status + 1)+page*10}</td>
                                <td style={{width: "30%"}}>{p.name}</td>
                                <td style={{width: "12%"}}>{vnd.format(p.price)}</td>
                                <td style={{width: "15%"}}>{p.cpu}</td>
                                <td style={{width: "10%"}}>{p.type}</td>
                                <td style={{width: "12%"}}>{p.color}</td>
                                <td style={{width: "8%"}}>{p.capacity}</td>
                                <td style={{width: "8%"}}>{p.quantity}</td>
                            </tr>)
                        )}
                        {!totalElements && (
                            <tr>
                                <td colSpan={8}>
                                    <p style={{textAlign: "center", color: "red"}}>Không tìm thấy</p>
                                </td>
                            </tr>

                        )}
                        </tbody>
                    </table>
                </div>


                <div className="row d-flex justify-content-around my-3">
                    <div className="col float-start">
                        <a className="me-1">
                            <Link to={"/admin/product/create"} type="button" className="btn btn-outline-primary">Thêm
                                mới</Link>
                        </a>
                        {
                            totalElements > 0 && (
                                <>
                                    {selectedProducts.length <= 1 && (
                                        <a className="me-1">
                                            <button onClick={() => handleUpdate()} type="button"
                                                    className="btn btn-outline-success">Cập nhật
                                            </button>
                                        </a>
                                    )}

                                    <button type="button" className="btn btn-outline-danger me-1"
                                            data-bs-toggle={modal ? "modal" : ''}
                                            data-bs-target="#deleteModal" onClick={() => showModal()}>Xóa
                                    </button>
                                    {selectedProducts.length >= 2 && (
                                        <a className="me-1">
                                            <button onClick={() => setSelectedProducts([])} type="button"
                                                    className="btn btn-outline-secondary">Hủy Chọn
                                            </button>
                                        </a>
                                    )}
                                </>
                            )
                        }

                    </div>
                    {totalPages > 1 && (
                        <div className="col-auto float-end">
                            <ul className="pagination mb-0">
                                <li className="page-item">
                                    <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                                       onClick={() => setPage(0)} tabIndex="-1"
                                       aria-disabled="true">Đầu</a>
                                </li>
                                <li className="page-item">
                                    <a className={`page-link ${page <= 0 ? "disabled" : ""}`}
                                       onClick={() => setPage(page - 1)} tabIndex="-1"
                                       aria-disabled="true">Trước</a>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link" href="#">{page + 1}/{totalPages}</a>
                                </li>
                                <li className="page-item">
                                    <a className={`page-link ${page >= totalPages - 1 ? "disabled" : ""}`}
                                       onClick={() => setPage(page + 1)}>Sau</a>
                                </li>
                                <li className="page-item">
                                    <a className={`page-link ${page >= totalPages - 1 ? "disabled" : ""}`}
                                       onClick={() => setPage(totalPages - 1)}>Cuối</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {modal && (
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Thông báo!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có muốn xóa các sản phẩm :{selectedProducts.map((product, s) => (
                                        <>
                                            <br/>
                                            {s + 1}: {product.name}
                                        </>
                                    )
                                )} không ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary"
                                        data-bs-dismiss="modal"
                                        onClick={() => confirmDelete()}>Xác nhận
                                </button>
                                <button type="button" onClick={() => setModal(false)}
                                        className="btn btn-outline-secondary" data-bs-dismiss="modal">Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer/>
            <Footer/>
        </>
    )
}