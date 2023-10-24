import React, { useEffect, useState } from 'react';
import "../modal/modal_table.css";
import { getAllSupplierModal } from '../../service/warehouse/WarehouseService';

const SupplierChooseModal = ({ handleData }) => {
    const [supplierList, setSupplierList] = useState([]);
    const [change, setChange] = useState("");
    const [searchName, setSearchName] = useState("");
    const [addressSearch, setAddressSearch] = useState("");
    const [emailSearch, setEmailSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [typeSearch, setTypeSearch] = useState("");
    const [valueInput,setValueInput] = useState("");
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
    
    const [selectedSupplier, setSelectedSupplier] = useState({
        idSupplier: null,
        nameSupplier: ""
    });
    
    // const [optionSearch, setOptionSearch] = useState();
    const loadSupplierList = async (page, searchName, addressSearch, emailSearch) => {
        const result = await getAllSupplierModal(page, searchName, addressSearch, emailSearch);
        if (result?.status === 200) {
            setSupplierList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            setSupplierList([]);
        }
    }
    const handleSetTypeSearch = () => {
        switch (typeSearch) {
            case "supplier":
                setSearchName(valueInput);
                setAddressSearch("");
                setEmailSearch("");
                break;
            case "address":
                setAddressSearch(valueInput);
                setSearchName("");
                setEmailSearch("");
                break;
            case "email":
                setEmailSearch(valueInput);
                setAddressSearch("");
                setSearchName("");
                break;
        }
    }
    const handleReset = () => {
        setPage(0);
        setSearchName("");
        setAddressSearch("");
        setEmailSearch("");
    }
    const handleSubmit = () => {
        // console.log(selectedCustomer);
        let submitModal = document.getElementById("closeModal");
        submitModal.setAttribute("data-bs-dismiss", "modal");
        submitModal.click()
        submitModal.removeAttribute("data-bs-dismiss");
        handleData(selectedSupplier.idSupplier);
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

    const handleEditEvent = () => {
        if (selectedSupplier.id == null) {
            alert("Vui long chon nhà cung cấp")
        }
    }
    useEffect(() => {
        loadSupplierList(page, searchName, addressSearch, emailSearch);
    }, [page, searchName, addressSearch, emailSearch]);

    if (!supplierList) {
        return <div></div>;
    }
    return (
        <div className="modal fade" id="exampleModalSupplier" data-bs-backdrop="static" tabIndex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Chọn nhà cung cấp</h1>
                    </div>
                    <div className="modal-body">
                        <div className="pt-4">
                            <div className="row g-3 align-items-center justify-content-end" style={{ marginRight: '3%' }}>
                                <div className="col-auto">
                                    <h1 className="col-form-label">Tìm kiếm theo</h1>
                                </div>
                                <div className="col-auto">
                                    <select name='optionSearch' onChange={(even) => setTypeSearch(even.target.value)}
                                        className="form-select shadow border-dark">
                                            <option value="">---Tìm kiếm theo---</option>
                                        <option value="supplier">Tên nhà cung cấp</option>
                                        <option value="address">Địa chỉ</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <input type="text" name="inputSearch" id="inputPassword6"
                                        className="shadow form-control border-dark"
                                        onChange={(even) => setValueInput(even.target.value)}
                                        aria-describedby="passwordHelpInline" />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-primary text-center shadow" onClick={()=>handleSetTypeSearch()}>Tìm kiếm</button>
                                </div>
                            </div>
                            <div className="mx-auto p-3" style={{minHeight: "350px"}} id="TinDT">
                                <table className=" shadow w-100 " >
                                    <thead style={{ fontSize: 'large', backgroundColor: '#282c34', color: '#f5f5f5' }}>
                                        <tr>
                                            <th style={{ width: '6%' }} className="text-center">STT</th>
                                            <th style={{ width: '15%' }}>Tên nhà cung cấp</th>
                                            <th style={{ width: '25%' }}>Địa chỉ</th>
                                            <th style={{ width: '10%' }}>SĐT</th>
                                            <th style={{ width: '31%' }}>Email</th>
                                        </tr>
                                    </thead>
                                    {supplierList && supplierList.length !== 0 ?
                                        <tbody>
                                            {supplierList.map((supplier, index) => (
                                                <tr key={index} id={index} onClick={() => {
                                                    if (selectedSupplier.idSupplier === null || selectedSupplier.idSupplier !== supplier?.idSupplier) {
                                                        setSelectedSupplier({ idSupplier: supplier?.idSupplier, nameSupplier: supplier?.nameSupplier });

                                                    } else {
                                                        setSelectedSupplier({ idSupplier: null, nameSupplier: "" });

                                                    }
                                                }} style={(selectedSupplier.idSupplier === supplier?.idSupplier) ? {
                                                    background: 'darkgrey',
                                                    // color: "#f5f5f5",
                                                    height: 50
                                                } : { height: 50 }}
                                                >
                                                    <td style={{width: "5%"}} className="text-center">
                                                        {(index + 1) + page * 5}
                                                    </td>
                                                    <td style={{width: "40%"}}>{supplier?.nameSupplier}</td>
                                                    <td style={{width: "20%"}}>{addressList[supplier?.addressSupplier]}</td>
                                                    <td style={{width: "15%"}}>{supplier?.phoneNumberSupplier}</td>
                                                    <td style={{width: "20%"}}>{supplier?.emailSupplier}</td>
                                                </tr>))}
                                        </tbody> :
                                        <tbody>
                                            <tr style={{ height: '150px' }}>
                                                <td style={{ fontSize: '30px',color:"red", textAlign: 'center' }} colSpan="6">Không tìm thấy kết quả
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
                                <div style={{ marginLeft: '8%' }}>
                                    {selectedSupplier.idSupplier === null ? null : (
                                        <button
                                            className="btn btn-outline-primary shadow"
                                            data-bs-dismiss="modal"
                                            style={{ marginRight: '2rem', width: '40%' }}
                                            id="closeModal"
                                            onClick={() => handleSubmit()}
                                        >
                                            Chọn
                                        </button>
                                    )}
                                    <button className="btn btn-outline-secondary shadow" data-bs-dismiss="modal"
                                        style={{ width: '40%' }}>
                                        Trở về
                                    </button>
                                </div>
                            </div>
                            <div className="col-6 mt-3">
                                <div className="float-end" style={{ marginRight: '8%' }}>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <button className={`page-link`}
                                                style={{ display: page <= 0 ? "none" : "inline-block" }}
                                                 onClick={() => previousPage()}>Trước
                                                </button>
                                                
                                            </li>
                                            <li className="page-item"><button className="page-link "
                                            >{page + 1} / {totalPage}</button></li>
                                            <li className="page-item">
                                                <button className="page-link " onClick={() => nextPage()}
                                                style={{ visibility: page >= totalPage - 1 ? "hidden" : "visible" }}>Sau
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

export default SupplierChooseModal;
