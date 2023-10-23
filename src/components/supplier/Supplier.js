import { useEffect, useState } from "react"
import { deleteSupplier, getAllAddress, getList } from "../../service/supplier/SupplierService";
import "../../css/supplier/supplier.css";
import Modal from "react-bootstrap/Modal";
import HeaderAdmin from "../user/HeaderAdmin";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../home/common/Footer";

function Supplier() {
    const navigate = useNavigate();
    const [listSupplier, setListSupplier] = useState([]);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [addressSearch, setAddressSearch] = useState("");
    const [emailSearch, setEmailSearch] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [refresh, setRefresh] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [typeSearch, setTypeSearch] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [listAddress, setListAddress] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [inputAddress,setInputAddress] = useState("");
    const addressList = {
        1: "Thành phố Hà Nội",
        2: "Tỉnh Hà Giang",
        4: "Tỉnh Cao Bằng",
        6: "Tỉnh Bắc Kạn",
        8: "Tỉnh Tuyên Quang",
        10: "Tỉnh Lào Cai",
        11: "Tỉnh Điện Biên",
        12: "Tỉnh Lai Châu",
        14: "Tỉnh Sơn La",
        15: "Tỉnh Yên Bái",
        17: "Tỉnh Hoà Bình",
        19: "Tỉnh Thái Nguyên",
        20: "Tỉnh Lạng Sơn",
        22: "Tỉnh Quảng Ninh",
        24: "Tỉnh Bắc Giang",
        25: "Tỉnh Phú Thọ",
        26: "Tỉnh Vĩnh Phúc",
        27: "Tỉnh Bắc Ninh",
        30: "Tỉnh Hải Dương",
        31: "Thành phố Hải Phòng",
        33: "Tỉnh Hưng Yên",
        34: "Tỉnh Thái Bình",
        35: "Tỉnh Hà Nam",
        36: "Tỉnh Nam Định",
        37: "Tỉnh Ninh Bình",
        38: "Tỉnh Thanh Hóa",
        40: "Tỉnh Nghệ An",
        42: "Tỉnh Hà Tĩnh",
        44: "Tỉnh Quảng Bình",
        45: "Tỉnh Quảng Trị",
        46: "Tỉnh Thừa Thiên Huế",
        48: "Thành phố Đà Nẵng",
        49: "Tỉnh Quảng Nam",
        51: "Tỉnh Quảng Ngãi",
        52: "Tỉnh Bình Định",
        54: "Tỉnh Phú Yên",
        56: "Tỉnh Khánh Hòa",
        58: "Tỉnh Ninh Thuận",
        60: "Tỉnh Bình Thuận",
        62: "Tỉnh Kon Tum",
        64: "Tỉnh Gia Lai",
        66: "Tỉnh Đắk Lắk",
        67: "Tỉnh Đắk Nông",
        68: "Tỉnh Lâm Đồng",
        70: "Tỉnh Bình Phước",
        72: "Tỉnh Tây Ninh",
        74: "Tỉnh Bình Dương",
        75: "Tỉnh Đồng Nai",
        77: "Tỉnh Bà Rịa - Vũng Tàu",
        79: "Thành phố Hồ Chí Minh",
        80: "Tỉnh Long An",
        82: "Tỉnh Tiền Giang",
        83: "Tỉnh Bến Tre",
        84: "Tỉnh Trà Vinh",
        86: "Tỉnh Vĩnh Long",
        87: "Tỉnh Đồng Tháp",
        89: "Tỉnh An Giang",
        91: "Tỉnh Kiên Giang",
        92: "Thành phố Cần Thơ",
        93: "Tỉnh Hậu Giang",
        94: "Tỉnh Sóc Trăng",
        95: "Tỉnh Bạc Liêu",
        96: "Tỉnh Cà Mau"
    }
    const [selectedSupplier, setSelectSupplier] = useState([]);
    useEffect(() => {
        handleGetListAddress()
    }, [typeSearch])
    const handleGetListAddress = async () => {
        const res = await getAllAddress();
        setListAddress(res);
    }
    useEffect(() => {
        getAll();
    }, [currentPage,showModal,refresh])

    const handleSetTypeSearch = () => {
        const specialCharsRegex = /[!#$%^&*(),?":{}|<>_]/;
        if (!specialCharsRegex.test(valueInput)) {
            switch (typeSearch) {
                case "Tên nhà cung cấp":
                    setSearchName(valueInput);
                    setAddressSearch("");
                    setEmailSearch("");
                    setInputAddress("");
                    break;
                case "Địa chỉ":
                    setAddressSearch(inputAddress);
                    setSearchName("");
                    setEmailSearch("");
                    break;
                case "Email":
                    setEmailSearch(valueInput);
                    setSearchName("");
                    setAddressSearch("");
                    setInputAddress("");
                    break;
                default:
                    setSearchName("");
                    setAddressSearch("");
                    setEmailSearch("");
            }
            setRefresh(!refresh);
        } else {
            setListSupplier([]);
        }
    }

    const handleShowModal = () => {
        if(selectedSupplier.length ===0){
            toast("vui lòng chọn sản phẩm")
        } else{
            setShowModal(true);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleUpdate = () => {
        if (selectedSupplier.length === 0) {
            toast("vui lòng chọn sản phẩm")
        } else {
            navigate(`/admin/business/supplier/edit/${selectedSupplier[0].idSupplier}`)
        }
    }

    const getAll = async () => {
        const newList = await getList(currentPage, limit, searchName, addressSearch, emailSearch);
            setSearchName("");
            setAddressSearch("");
            setEmailSearch("");
            setListSupplier(newList[0]);
            setTotalPage(newList[2].data.totalPages);
            setTotalElement(newList[2].data.totalElements);
            console.log(newList[2]);
    }

    const handleDelete = async () => {
        for (const s of selectedSupplier) {
            await deleteSupplier(s.idSupplier);
          }
        toast("Xóa thành công")
        if (listSupplier.length === selectedSupplier.length && totalPage !== 1) {
            setCurrentPage(currentPage-1);
        }
         setSelectSupplier([]);
         handleCloseModal();
         
    }

    const prePage = () => {
        setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        const totalReal = totalPage - 1;
        if (currentPage < totalReal) {
            setCurrentPage(currentPage + 1);
        }
    }


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
                            <select style={{ width: "180px" }} className="form-select" onClick={(event) => setTypeSearch(event.target.value)}>
                                <option selected value={""}>--Tìm kiếm theo--</option>
                                <option value={"Tên nhà cung cấp"}>Tên nhà cung cấp</option>
                                <option value={"Địa chỉ"}>Địa chỉ</option>
                                <option value={"Email"}>Email</option>
                            </select>
                        </div>
                        {typeSearch === "Địa chỉ" ?
                            <div className="col-auto me-2">
                                <select style={{ width: "180px" }} className="form-control" onClick={(event) => setInputAddress(event.target.value)}>
                                    <option  value={""}>---Chọn địa chỉ---</option>
                                    {listAddress.map((address) => (
                                        <option key={address.code} value={address.code}>{address.name}</option>
                                    ))}
                                </select>
                            </div>
                            :
                            <div style={{ width: "180px" }} className="col-auto me-2">
                                <input className="form-control" type="search" aria-label="Search" onChange={(event) => setValueInput(event.target.value)} />
                            </div>
                        }

                        <div className="col-auto">
                            <button className="btn btn-outline-primary text-center" type="button" onClick={() => handleSetTypeSearch()}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div style={{ minHeight: "400px" }}>
                    <table className="border border-dark table table-hover">

                        <thead style={{ background: 'grey' }} className="colorthead">
                            <tr>
                                <th style={{ width: "5%" }}>
                                    #
                                </th>
                                <th style={{ width: "5%" }}>MS</th>
                                <th style={{ width: "40%" }}>Tên nhà cung cấp</th>
                                <th style={{ width: "20%" }}>Địa chỉ</th>
                                <th style={{ width: "10%" }}>SĐT</th>
                                <th style={{ width: "20%" }}>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSupplier ? listSupplier.map((supplier, index) =>

                                    <>
                                        <tr key={supplier.idSupplier} onClick={() => {
                                            const isSelected = selectedSupplier.find(s => s.idSupplier === supplier.idSupplier);

                                            if (isSelected) {
                                                const updatedSupplier = selectedSupplier.filter(s => s.idSupplier !== supplier.idSupplier);
                                                setSelectSupplier(updatedSupplier);
                                            } else {
                                                const updatedSupplier = [...selectedSupplier, supplier];
                                                setSelectSupplier(updatedSupplier);
                                            }
                                        }}
                                            className={
                                                selectedSupplier.some(s => s.idSupplier === supplier.idSupplier) ? "active" : ""
                                            }
                                        >
                                            <td >{index + 1}</td>
                                            <td >{supplier.idSupplier}</td>
                                            <td >{supplier.nameSupplier}</td>
                                            <td >{addressList[supplier.addressSupplier]}</td>
                                            <td >{supplier.phoneNumberSupplier}</td>
                                            <td >{supplier.emailSupplier}</td>
                                        </tr>
                                    </>

                                )
                                : <tr>
                                <td colSpan={8}>
                                    <p style={{textAlign: "center", color: "red"}}>Không tìm thấy</p>
                                </td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className="row d-flex justify-content-around my-3">

                    <div className="col float-start">
                        <Link className="me-1" to={`/admin/business/supplier/create`} style={{ textDecoration: 'none' }}>
                            <button type="button" className="btn btn-outline-primary">Thêm mới</button>
                        </Link>
                        {
                            totalElement > 0 &&
                            <>
                                {selectedSupplier.length <= 1 && (
                                    <button type="button" className={`btn btn-outline-success me-1`} 
                                     title="Chỉnh sửa"
                                    onClick={() => handleUpdate()}
                                    >
                                        Cập nhật
                                    </button>
                                )}
                                <button className={`btn btn-outline-danger me-1`} title="" onClick={() => handleShowModal()}  >
                                    Xóa
                                </button>
                                <Modal show={showModal} onHide={handleCloseModal} >
                                    <MyModal action={handleCloseModal} data={selectedSupplier} deleteFunc={handleDelete} />
                                </Modal>
                                {selectedSupplier.length >= 2 && (
                                    <a className="me-1">
                                        <button onClick={() => setSelectSupplier([])} type="button"
                                            className="btn btn-outline-secondary">Hủy Chọn
                                        </button>
                                    </a>
                                )}
                            </>
}           

                    </div>

                    {totalPage > 1 && (
                        <div className="col-auto float-end">
                            <ul className="pagination mb-0">
                                <li className="page-item">
                                    <a className={`page-link ${currentPage === 0 ? "disabled" : ""}`}
                                        onClick={() => setCurrentPage(0)} tabIndex="-1"
                                        aria-disabled="true">Đầu</a>
                                </li>
                                <li className="page-item">
                                    <button onClick={() => prePage()} className={`page-link  ${currentPage <= 0 ? "disabled" : ""}`}>Trước</button>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link" href="#">{currentPage + 1}/{totalPage}</a>
                                </li>
                                <li className="page-item">
                                    <button onClick={() => nextPage()} className={`page-link ${currentPage >= (totalPage - 1) ? "disabled" : ""}`}>Sau</button>
                                </li>
                                <li className="page-item">
                                    <a className={`page-link ${currentPage >= totalPage - 1 ? "disabled" : ""}`}
                                        onClick={() => setCurrentPage(totalPage - 1)}>Cuối</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

function MyModal({ action, data, deleteFunc }) {
    return (
        <>
            <Modal.Header>
                <h5 className="modal-title" id="deleteModalLabel">Thông báo!</h5>
            </Modal.Header>
            <Modal.Body>
            <p>Bạn có muốn xóa các sản phẩm :{data.map((s,index) => (
                                        <>
                                            <br/>
                                            {index + 1}: {s.nameSupplier}
                                        </>
                                    )
                                )} không ?</p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline-primary" onClick={() => deleteFunc()} >Xác nhận</button>
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => action()}>Hủy</button>
            </Modal.Footer>
        </>
    )
}

export default Supplier;

