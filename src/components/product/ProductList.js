import {useEffect, useState} from "react";
import {getListProduct} from "../../service/product/ProductService";
import {toast} from "react-toastify";

export default function ProductList() {
    const [listType, setListType] = useState([]);
    const [listProduct, setListProduct] = useState(null);
    const [value, setValue] = useState("");
    const [choose, setChoose] = useState("name");
    const [sort, setSort] = useState("");
    const [otherSort, setOtherSort] = useState("asc");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageable, setPageable] = useState({});
    const [productSelect, setProductSelect] = useState({});
    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    const confirmDelete = (id) => {
        console.log(id)
    }
    const list = async () => {
        const list = await getListProduct(sort, otherSort, choose, value, page);
        setListProduct(list.content);
        setTotalPages(list.totalPages);
        setTotalElements(list.totalElements);

    }
    // const getType=async ()=>{
    //     ;
    // }
    const handleOnClick = (p) => {
        setProductSelect(p);
    }
    useEffect(() => {
        list()
    }, [page])
    return (
        <>
            <div className="container mt-5 pt-5">
                <div className="col-12 d-flex justify-content-center my-3">
                    <h1>Thông tin hàng hóa</h1>
                </div>
                <div className="row my-3">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={(event) => setSort(event.target.value)}>
                                <option value="">--Sắp xếp theo--</option>
                                <option value="name">Tên</option>
                                <option value="price">Giá</option>
                                <option value="quantity">Số lượng</option>
                                <option value="type">Loại</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={event => setOtherSort(event.target.value)}>
                                <option value="asc">Tăng dần</option>
                                <option value="dsc">Giảm gần</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <select className="form-select" onChange={(event) => {
                                setChoose(event.target.value)
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
                                    <option value="">--Chọn giá--</option>
                                    <option value="smaller 5m">Dưới 5 triệu</option>
                                    <option value="5m to 10m">5 đến 10 triệu</option>
                                    <option value="better 10m">Trên 10 triệu</option>
                                </select>
                            )}
                            {choose === "quantity" && (
                                <select onChange={event => setValue(event.target.value)} className="form-select"
                                        name="quantity" id="quantity">
                                    <option value="">--Chọn số lượng--</option>
                                    <option value="smaller 10">Dưới 10</option>
                                    <option value="10 to 50">Từ 10 đến 50</option>
                                    <option value="better 50">Trên 50</option>
                                </select>)}
                            {choose === "type" && (
                                <select onChange={event => setValue(event.target.value)} className="form-select"
                                        name="type" id="type">
                                    <option value="">--Chọn loại--</option>
                                    {listType.map(t =>
                                        <option value={t.id}>{t.name}</option>
                                    )}
                                </select>)}
                            {choose === "name" && (
                                <input name="name" id="name" className="form-control"
                                       onChange={(event => setValue(event.target.value))} type="search"
                                       aria-label="Search"/>
                            )}
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button"
                                    onClick={() => {
                                        setPage(0);
                                        setProductSelect({});
                                        list()
                                    }}>Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
                <table className="border border-dark table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th style={{weight: "13%"}}>Tên</th>
                        <th style={{weight: "13%"}}>Giá</th>
                        <th style={{weight: "13%"}}>CPU</th>
                        <th style={{weight: "13%"}}>Loại</th>
                        <th style={{weight: "13%"}}>Màu</th>
                        <th style={{weight: "13%"}}>Lưu Trữ</th>
                        <th style={{weight: "13%"}}>Số lượng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listProduct && listProduct.map((p, status) =>
                        (<tr key={p.id} onClick={() => handleOnClick(p)}>
                            <td style={{weight: "9%"}}>{status + 1}</td>
                            <td style={{weight: "13%"}}>{p.name}</td>
                            <td style={{weight: "13%"}}>{vnd.format(p.price)}</td>
                            <td style={{weight: "13%"}}>{p.cpu}</td>
                            <td style={{weight: "13%"}}>{p.type}</td>
                            <td style={{weight: "13%"}}>{p.color}</td>
                            <td style={{weight: "13%"}}>{p.capacity}</td>
                            <td style={{weight: "13%"}}>{p.quantity}</td>
                        </tr>)
                    )}
                    {!totalElements&& (
                        <tr>
                            <td colSpan={8}>
                                <p style={{textAlign:"center",color:"red"}}>Không tìm thấy</p>
                            </td>
                        </tr>

                    )}
                    </tbody>
                </table>

                <div className="row d-flex justify-content-around my-3">
                    <div className="col float-start">
                        <a className="me-1">
                            <button type="button" className="btn btn-outline-primary">Thêm mới</button>
                        </a>
                        {
                            totalElements > 0 && (
                                <>
                                    <a className="me-1">
                                        <button type="button" className="btn btn-outline-success">Cập nhật</button>
                                    </a>
                                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal"
                                            data-bs-target="#deleteModal">Xóa
                                    </button>
                                </>
                            )
                        }

                    </div>
                    {totalPages && (
                        <div className="col-auto float-end">
                            <ul className="pagination mb-0">
                                <li className="page-item">
                                    <a className="page-link" onClick={() => setPage(page - 1)} tabIndex="-1"
                                       aria-disabled="true">Trước</a>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link" href="#">{page + 1}/{totalPages}</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" onClick={() => setPage(page + 1)}>Sau</a>
                                </li>
                            </ul>
                        </div>)}

                </div>
            </div>
            {productSelect && (
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Thông báo!!!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có muốn xóa sản phẩm {productSelect.name} không ??</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-primary"
                                        onClick={() => confirmDelete(productSelect.id)}>Xác nhận
                                </button>
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}