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
                break;
            case "address":
                setAddressSearch(valueInput);
                break;
            case "email":
                setEmailSearch(valueInput);
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
                                    <thead style={{ fontSize: 'large', backgroundColor: 'darkgrey' }}>
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
                                                    background: '#282c34',
                                                    color: "#f5f5f5",
                                                    height: 50
                                                } : { height: 50 }}
                                                >
                                                    <td style={{width: "5%"}} className="text-center">
                                                        {(index + 1) + page * 5}
                                                    </td>
                                                    <td style={{width: "30%"}}>{supplier?.nameSupplier}</td>
                                                    <td style={{width: "25%"}}>{supplier?.addressSupplier}</td>
                                                    <td style={{width: "15%"}}>{supplier?.phoneNumberSupplier}</td>
                                                    <td style={{width: "25%"}}>{supplier?.emailSupplier}</td>
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
