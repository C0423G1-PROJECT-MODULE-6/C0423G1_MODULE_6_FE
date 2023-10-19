import React, {useEffect, useState, useRef} from 'react';
import "./modal_table.css";
import * as productService from "../../service/product/ProductService";
import * as appUserService from "../../service/user/AuthService";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import * as UserService from "../../service/user/UserService";
import * as customerService from '../../service/customer/CustomerService';
import Swal from "sweetalert2";

const ProductChooseModal = ({data1, handleData}) => {

    const modalRef = useRef(null); // Tạo một ref để truy cập modal
    const [productList, setProductList] = useState([]);
    const [typeProduct, setTypeProduct] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [change, setChange] = useState(1);
    const [choose, setChoose] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    // const [userAppName, setUserAppName] = useState("");
    const [userId, setUserId] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: ""
    });
    //---------------Get id User--------------------

    const getAppUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
            // const nameUser = await UserService.findById(id.data);
            // setUserAppName(nameUser.data.employeeName)
        }
    };
    // const closeModal = () => {
    //     if (modalRef.current) {
    //         modalRef.current.click();
    //     }
    // };
    const handleSubmit = async () => {
        if (data1 === 1) {
            handleData(selectedProduct.id);
            let submitModal = await document.getElementById("closeModalProduct");
            submitModal.click();
            // submitModal.setAttribute("data-bs-dismiss", "modal");
            // submitModal.removeAttribute("data-bs-dismiss");
        }
        if (data1 === 0) {
            const result = await customerService.createCart(userId, selectedProduct.id);
            if (result?.status === 200) {
                let submitModal = await document.getElementById("closeModalProduct");
                // submitModal.setAttribute("data-bs-dismiss", "modal");
                submitModal.click();
                // submitModal.removeAttribute("data-bs-dismiss");
            }
            if (result?.status === 204) {

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Rất tiếc',
                    text: 'Sản phẩm đã hết hàng',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if (result?.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Sản phẩm đã hết hàng',
                    text: 'Vui lòng chọn sản phẩm khác',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


        //     //-----Pass the product id through the sales page----
        // //    ----create cart-------
        // closeModal();
    };
    //------------------------------------------------List & Search---------------------------
    const loadProductList = async (choose, page, searchValue) => {
        const result = await productService.getPageProductModal(choose, page, searchValue);
        const listType = await productService.getAllType();
        getAppUserId();
        setTypeProduct(listType);
        if (result?.status === 200) {
            setProductList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            setProductList([]);
        }
    }
    const handleOptionSearchChange = (e) => {
        const {value} = e.target;
        setChange(+value);
        console.log(value);
    }
    //--------------------------Page------------------------------
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
    const handleSearch = () => {
        // const choose = +document.getElementById("chooseSearch").value;
        if (change === 1) {
            const name = document.getElementById("searchName").value;
            setSearchName(name);
            setChoose("name")
            setPage(0);
        }
        if (change === 2) {
            const type = document.getElementById("valueType").value;
            setSearchName(type);
            setChoose("type")
            setPage(0);
        }
        if (change === 3) {
            const price = document.getElementById("valuePrice").value;
            setSearchName(price);
            setChoose("price")
            setPage(0);
        }
        if (change === 4) {
            const quantity = document.getElementById("valueQuantity").value;
            setSearchName(quantity);
            setChoose("quantity")
            setPage(0);
        }
    }
    // const handleReset = () => {
    //     setPage(0);
    //     setChange("name");
    //     setSearchName("");
    // }
    useEffect(() => {
        loadProductList(choose, page, searchName);
    }, [choose, page, searchName]);

    if (!productList) {
        return <div></div>;
    }

    return (

        <div className="modal fade" id="exampleModalProduct" data-bs-backdrop="static" tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Chọn sản phẩm</h1>
                    </div>
                    <div className="modal-body">
                        <div className="pt-3">
                            <div
                                className="row g-3 align-items-center justify-content-end mb-2"
                                style={{marginRight: "4%"}}
                            >
                                <div className="col-auto">
                                    <h1 htmlFor="inputPassword6" className="col-form-label">
                                        Tìm kiếm theo
                                    </h1>
                                </div>
                                <div className="col-auto d-flex justify-content-center">
                                    <select className="form-select shadow border-dark " id="chooseSearch"
                                            onChange={handleOptionSearchChange}
                                            style={{width: "60%", marginRight: "1rem"}}>
                                        <option value={1}>Tên sản phẩm</option>
                                        <option value={2}>Loại sản phẩm</option>
                                        <option value={3}>Giá sản phẩm</option>
                                        <option value={4}>Số lượng</option>
                                    </select>
                                    {change === 4 &&
                                    <select className="form-select shadow border-dark w-100" name="groupValue"
                                            id="valueQuantity" style={{width: "70%"}}>
                                        <option value={"smaller 10"}>0 - 10</option>
                                        <option value={"10 to 50"}>10 - 50</option>
                                        <option value={"better 50"}>Lớn hơn 50</option>
                                    </select>}
                                    {change === 1 &&
                                    <input
                                        type="text"
                                        className="form-control shadow border-dark"
                                        aria-describedby="passwordHelpInline" id="searchName" style={{width: "80%"}}
                                    />}
                                    {change === 2 &&
                                    <select className="form-control shadow border-dark" name="groupValue"
                                            id="valueType" style={{width: "70%"}}>
                                        {typeProduct.map((type, index) => (
                                            <option value={type.idType}>{type.name}</option>))}
                                    </select>}
                                    {change === 3 &&
                                    <select className="form-control shadow border-dark" name="groupValue"
                                            id="valuePrice">
                                        <option value={"smaller 5m"}>0 - 5 triệu</option>
                                        <option value={"5m to 10m"}>5 triệu - 10 triệu</option>
                                        <option value={"better 10m"}>Lớn hơn 10 triệu</option>
                                    </select>}
                                </div>

                                <div className="col-auto">
                                    <button className="btn btn-outline-primary text-center shadow "
                                            onClick={handleSearch}>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center p-2">
                                <button
                                    className=" btn btn-outline-primary shadow"
                                    style={{marginRight: "2rem", width: "14%"}}
                                    id="submitModal"
                                    onClick={() => handleSubmit()}
                                >
                                    Chọn
                                </button>
                                <button
                                    className=" btn btn-outline-secondary shadow"
                                    style={{width: "14%"}}
                                    onClick={() => setSelectedProduct({
                                        id: null,
                                        name: ""
                                    })}
                                >
                                    Hủy
                                </button>
                            </div>
                            <div className="mx-auto p-3 " style={{width: "93%"}} id="TinDT">
                                <table className=" shadow w-100">

                                    <tr style={{fontSize: "larger", backgroundColor: "darkgrey"}}>
                                        <th style={{width: "5%", paddingLeft: "1%"}}>STT</th>
                                        <th style={{width: "40%", paddingLeft: "2%"}}>Tên</th>
                                        <th style={{width: "20%", paddingLeft: "3%"}}>Giá</th>
                                        <th style={{width: "15%"}}>CPU</th>
                                        <th style={{width: "15%", paddingLeft: "3%"}}>Lưu trữ</th>
                                    </tr>
                                    {productList && productList.length !== 0 ?
                                        <tbody>
                                        {productList.map((product, index) => (
                                            <tr key={index} id={index} onClick={() => {
                                                if (selectedProduct.id === null || selectedProduct.id !== product?.id) {
                                                    setSelectedProduct({
                                                        id: product?.id,
                                                        name: product?.name
                                                    });
                                                    console.log(selectedProduct.id)
                                                } else {
                                                    setSelectedProduct({id: null, name: ""});
                                                    console.log(selectedProduct.id)
                                                }
                                            }} style={(selectedProduct.id === product?.id) ? {
                                                background: '#282c34',
                                                color: '#f5f5f5',
                                                height: 40
                                            } : {height: 40}}
                                            >
                                                <td style={{
                                                    width: "5%",
                                                    paddingLeft: "2%"
                                                }}>{(index + 1) + page * 5}</td>
                                                <td style={{width: "43%", paddingLeft: "2%"}}>{product?.name}</td>
                                                <td style={{width: "20%", paddingLeft: "3%"}}>{product?.price}</td>
                                                <td style={{width: "15%"}}>{product?.cpu}</td>
                                                <td style={{width: "15%", paddingLeft: "4%"}}>{product?.capacity}</td>
                                            </tr>))}
                                        </tbody> :
                                        <tbody>
                                        <tr style={{height: '150px'}}>
                                            <td style={{fontSize: '30px', textAlign: 'center'}} colSpan="6">Không có sản
                                                phẩm nào phù hợp
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
                                <div style={{marginLeft: "8%"}}>
                                    <button
                                        className=" btn btn-outline-secondary shadow"
                                        data-bs-dismiss="modal"
                                        style={{width: "35%"}}
                                        id="closeModalProduct"
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
                                            <li className="page-item">
                                                <button className="page-link "
                                                >{page + 1} / {totalPage}</button>
                                            </li>
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
