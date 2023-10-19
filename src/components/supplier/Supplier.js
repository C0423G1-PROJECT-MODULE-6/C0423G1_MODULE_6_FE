import { useEffect, useState } from "react"
import { deleteSupplier, getList } from "../../service/supplier/SupplierService";
import "../../css/supplier/supplier.css";
import Modal from "react-bootstrap/Modal";
import HeaderAdmin from "../user/HeaderAdmin";
import { toast } from "react-toastify";

function Supplier() {
    const [listSupplier, setListSupplier] = useState([]);
    const limit = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [addressSearch, setAddressSearch] = useState("");
    const [emailSearch, setEmailSearch] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [refresh, setRefresh] = useState(true);
    const [activeRow, setActiveRow] = useState(null);
    const [supplierDelete, setSupplierDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [typeSearch, setTypeSearch] = useState("");
    const [valueInput, setValueInput] = useState("");
    useEffect(() => {
        getAll();
    }, [refresh])

    const handleSetTypeSearch = () => {
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if(!specialCharsRegex.test(valueInput)){
            switch (typeSearch) {
                case "Tên nhà cung cấp":
                    setSearchName(valueInput);
                    break;
                case "Địa chỉ":
                    setAddressSearch(valueInput);
                    break;
                case "Email":
                    setEmailSearch(valueInput);
                    break;
                default:
                    setSearchName("");
                    setAddressSearch("");
                    setEmailSearch("");
            }
            setRefresh(!refresh);
        }else{
            toast("Không được nhập ký tự đặc biệt");
        }
    }
   
    const handleRowClick = (index, obj) => {
        if (activeRow === index) {
            setActiveRow(null);
            setSupplierDelete(null);
            setRefresh(!refresh);
        } else {
            setActiveRow(index);
            setSupplierDelete(obj);
            setRefresh(!refresh);
        }
    };
    const handleShowModal = () => {
        setShowModal(true);
        setRefresh(!refresh);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setRefresh(!refresh);
    }

    const getAll = async () => {
        const newList = await getList(currentPage, limit, searchName, addressSearch, emailSearch);
        if (newList[2].status === 200) {
            setSearchName("");
            setAddressSearch("");
            setEmailSearch("");
            setListSupplier(newList[0]);
            setTotalPage(Math.ceil(newList[1] / limit));
            console.log(newList[2].status);
        } else {
            console.log("aaaaaaaa");
            setListSupplier([]);
            setTotalPage(1);
            setCurrentPage(0);
        }



    }

    const handleDelete = async () => {
        const result = await deleteSupplier(supplierDelete.idSupplier);
        if (listSupplier.length === 1 && totalPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
        if(result===204){
            toast("Xóa thành công")
        }else{
            toast.error("Lỗi không thể xóa đối tượng này")
        }
        handleCloseModal();
        setActiveRow(null);
        setSupplierDelete({});
        setRefresh(!refresh);
        console.log(result)
    }

    const prePage = () => {
        setCurrentPage(currentPage - 1);
        setRefresh(!refresh);
    }

    const nextPage = () => {
        const totalReal = totalPage - 1;
        if (currentPage < totalReal) {
            setCurrentPage(currentPage + 1);
            setRefresh(!refresh);
        }
    }
    console.log(listSupplier.length);

    return (
        <>
            <HeaderAdmin />
            <div className="container mt-5 pt-5">
                <div className="col-12 d-flex justify-content-center">
                    <h1>Danh sách nhà cung cấp</h1>
                </div>
                <div className="row my-3">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="col-auto me-2">
                            <select className="form-select" onClick={(event) => setTypeSearch(event.target.value)}>
                                <option selected value={""}>--Tìm kiếm theo--</option>
                                <option>Tên nhà cung cấp</option>
                                <option>Địa chỉ</option>
                                <option>Email</option>
                            </select>
                        </div>
                        <div className="col-auto me-2">
                            <input className="form-control" type="search" aria-label="Search" onChange={(event) => setValueInput(event.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button" onClick={() => handleSetTypeSearch()}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <table className="border border-dark table table-hover">

                    <thead style={{ background: 'darkgrey' }}>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th>MS</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSupplier
                            && listSupplier.length != 0 ? listSupplier.map((supplier, index) =>

                                <>
                                    <tr key={supplier.idSupplier} className={activeRow === index ? "active" : {}}
                                        onClick={() => handleRowClick(index, supplier)}
                                    >
                                        <td>#</td>
                                        <td>{supplier.idSupplier}</td>
                                        <td>{supplier.nameSupplier}</td>
                                        <td>{supplier.addressSupplier}</td>
                                        <td>{supplier.phoneNumberSupplier}</td>
                                        <td>{supplier.emailSupplier}</td>
                                    </tr>
                                </>

                            )
                            : <tr>
                                 <td colSpan="10" className="text-center"><h4>Không tìm thấy dữ liệu</h4></td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className="row d-flex justify-content-around my-3">
                    <div className="col float-start">
                        <a className="me-1" href="NghiaNPX_CreateSupplier.html" style={{ textDecoration: 'none' }}>
                            <button type="button```jsx
" className="btn btn-outline-primary">Thêm mới</button>
                        </a>
                        <a className="me-1" href="NghiaNPX_EditSupplier.html" style={{ textDecoration: 'none' }}>
                            <button type="button" className="btn btn-outline-success">Cập nhật</button>
                        </a>
                        <button className={`btn btn-outline-danger ${(activeRow === null) ? "disabled" : ""}`} title="Delete" onClick={() => handleShowModal()}  >
                            Xóa
                        </button>
                        <Modal show={showModal} onHide={handleCloseModal} >
                            <MyModal action={handleCloseModal} data={supplierDelete} deleteFunc={handleDelete} />
                        </Modal>
                    </div>
                    <div className="col-auto float-end">
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <button onClick={() => prePage()} className={`page-link  ${currentPage <= 0 ? "disabled" : ""}`}>Trước</button>
                            </li>
                            <li className="page-item" aria-current="page">
                                <a className="page-link" href="#">{currentPage + 1}/{totalPage}</a>
                            </li>
                            <li className="page-item">
                                <button onClick={() => nextPage()} className={`page-link ${currentPage >= (totalPage - 1) ? "disabled" : ""}`}>Sau</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

function MyModal({ action, data, deleteFunc }) {
    return (
        <>
            <Modal.Header>
                <h5 className="modal-title" id="deleteModalLabel">Thông báo!!!</h5>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có muốn xóa sản phẩm này không {data.nameSupplier} ?</p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline-primary" onClick={() => deleteFunc()} >Xác nhận</button>
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => action()}>Hủy</button>
            </Modal.Footer>
        </>
    )
}

export default Supplier;

