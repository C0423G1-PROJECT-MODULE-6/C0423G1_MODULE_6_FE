import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as orderService from "../../service/order/OrderService"
import BillNotPayConfirm from "./BillNotPayConfirm";
import CustomerChooseModal from "../modal/CustomerChooseModal";
import CustomerCreateModal from "../modal/CustomerCreateModal";
import ProductChooseModal from "../modal/ProductChooseModal";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup"
import HeaderAdmin from "../user/HeaderAdmin";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import * as UserService from "../../service/user/UserService";
import {toast} from "react-toastify";

function Order() {
    const [customer, setCustomer] = useState(null);
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderBillNotPay, setOrderBillNotPay] = useState(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [userId, setUserId] = useState("");
    const [renderStatus, setRenderStatus] = useState(false)

    const getAppUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
        }
    };
    useEffect(() => {
        getAppUserId();
    }, []);
    const findCustomerByid = async (data) => {
        const res =await orderService.findCustomerById(data);
        console.log(res)
        if (res && res.type === "customer") {
            setCustomer(res.objectResponse);
        } else if (res && res.type === "orderBill") {
            setOrderBillNotPay(res.objectResponse);
        } else if (res && res.type === "cartOrder"){
            setCarts(res.objectResponse);
        }else {
            console.log("Dữ liệu không hợp lệ hoặc không có type");
        }
    };

    const handleDataByChooseCustomer=(data)=>{
        findCustomerByid(data);
    }
    const handleDataByChooseProduct=(data)=>{
        getAllCart();
    }
    const handleDataByCreateCustomer=(data)=>{
        findCustomerByid(data);
        toast("Bạn đã thêm mới khách hàng thành công");
    }
    const updateCustomerConfirm = (data) => {
        console.log(data)
        console.log(data.idCustomer)
        setCustomer(data)
    }




    const getAllCart = async (idCustomer) => {
        const res = await orderService.getAllCart(idCustomer);
        console.log(res.data)
        if (res.status === 200){
            if(res.data){
                setHasResult(res.data.length > 0);
                setProducts(res.data);
                const initialQuantities = res.data.map(quantity => quantity.quantityOrder);
                setQuantity(initialQuantities);
            }
        }else if (res.status === 404){
            setHasResult(false);
        }
    }
    useEffect(() => {
        customer && getAllCart(customer.idCustomer);
    }, [customer,renderStatus]);


    useEffect(() => {
        let total = 0;
        products.forEach((product, index) => {
            total += product.priceProduct * quantity[index] + product.priceProduct * 0.1;
        });
        setTotalPrice(total);
    }, [products, quantity]);




    const closeModal = () => {
       carts && setCarts([]);
       orderBillNotPay && setOrderBillNotPay(null);
    }

    console.log("customer "+JSON.stringify(customer))

    const decreaseValue = (index) => {
        if (quantity[index] > 1) {
            const newQuantities = [...quantity];
            newQuantities[index] = quantity[index] - 1;
            setQuantity(newQuantities);
            customer && updateCurrentQuantity(newQuantities[index],products[index].idProduct,customer.idCustomer);
        }
    };

    const increaseValue = (index) => {
        if (products[index]){
            const newQuantities = [...quantity];
            newQuantities[index] = quantity[index] + 1;
            setQuantity(newQuantities);
            customer && updateCurrentQuantity(newQuantities[index],products[index].idProduct,customer.idCustomer);
        }

    };

    const updateCurrentQuantity =async (newQuantity, idProduct, idCustomer) => {
        await orderService.updateQuantity(newQuantity,idProduct,idCustomer);
    };

    const handleDeleteProduct = async (idProduct,idCustomer) => {
       const res= await orderService.deleteChosenProduct(idProduct,idCustomer);
       res.status === 200 && getAllCart(idCustomer);
    };

    const showOrderBill =async (value) => {
        if (customer === null) {
            toast.error("Khách hàng không được để trống");
        }else if (products.length < 1){
            toast.error("Bạn cần phải có sản phẩm");
        }else {
            value = {
                ...value,
                idCustomerOrder : customer.idCustomer,
                idUser: userId
            }
            const res = await orderService.getBillNotPay(value);
            if (res.status === 200){
                navigate("/admin/order/showBill");
            }
        }
    };

    const initialValues = {
        paymentMethod : 1,
        idCustomerOrder : "",
        idUser: ""
    }
    return (
        <>
            <HeaderAdmin/>
            <Formik initialValues={initialValues}
            onSubmit={(value)=>{
                console.log("Form values:", value);
                showOrderBill(value)}}
            >
                <Form>
                    <div className="  d-flex justify-content-center my-5 pt-5">
                        <fieldset className="form-input shadow mx-auto" style={{ borderRadius: '20px', border: '1px solid black', height: 'auto', width: '80%' }}>
                            <legend><h3 style={{ margin: '2%' }}>Thanh toán sản phẩm</h3></legend>
                            <div style={{ marginBottom: '5%' }}>
                                <fieldset className="form-input shadow mx-auto" style={{ borderRadius: '20px', border: '1px solid black', height: 'auto', width: '80%', padding: '20px' }}>
                                    <legend className="float-none w-auto px-1">Thông tin khách hàng</legend>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }} data-bs-toggle="modal" data-bs-target="#exampleModalCustomer" >
                                            Chọn khách hàng cũ
                                        </button>
                                        <button type="button" className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }} data-bs-toggle="modal" data-bs-target="#exampleModalCreateCustomer">
                                            Thêm mới khách hàng
                                        </button>
                                    </div>
                                    {customer ? (
                                        <div>
                                            <div className="row p-2 mx-auto" style={{ width: '90%' }}>
                                                <div className="col-4 p-2">
                                                    <label>Tên khách hàng</label>
                                                </div>

                                                <div className="col-8 mb-2">
                                                    <input
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        value={customer ? customer.nameCustomer : ""}
                                                        disabled
                                                    />
                                                    {customer ? null : (
                                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                            <ErrorMessage
                                                                className="text-danger"
                                                                name="idCustomerOrder"
                                                                component="small"
                                                            />
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="col-4 p-2">
                                                    <label>Số điện thoại</label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <input
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        value={customer ? customer.phoneNumberCustomer : ""}
                                                        disabled
                                                    />

                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Địa chỉ</label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <input
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        value={customer ? customer.addressCustomer : ""}
                                                        disabled
                                                    />

                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Ngày sinh </label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <input
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        value={customer ? customer.dateOfBirthCustomer : ""}
                                                        disabled
                                                    />

                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <input
                                                        className="form-control mt-2 border border-dark"
                                                        type="email"
                                                        value={customer ? customer.emailCustomer : ""}
                                                        disabled
                                                    />
                                                </div>
                                                <Field name="idCustomerOrder" type="hidden" value={customer ? customer.idCustomer : ""}/>
                                                <Field name="idUser" type="hidden" value={1}/>
                                            </div>
                                        </div>
                                    ):
                                        (<div className="text-center">
                                            <br/>
                                            <b>----Hãy chọn hoặc thêm mới khách hàng----</b>
                                        </div>)}
                                </fieldset>
                            </div>
                            <div style={{ marginBottom: '5%' }}>
                                <fieldset className="form-input shadow mx-auto" style={{ borderRadius: '20px', border: '1px solid black', height: 'auto', width: '80%', padding: '20px' }}>
                                    <legend className="float-none w-auto px-1">Sản phẩm đã chọn</legend>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button type="button" className="btn btn-outline-primary col-6 mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModalProduct" style={{ width: '30%' }}
                                                disabled={customer === null}
                                        >
                                            Chọn sản phẩm
                                        </button>
                                        <button className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }}
                                                disabled={customer === null}
                                        >Scan QR</button>
                                    </div>

                                    {/*<div className="row">*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table " style={{ width: '100%' }}>
                                                    <thead>
                                                    <tr>
                                                        <th className="col-1 text-center">#</th>
                                                        <th className="col-3 text-center">Tên sản phẩm</th>
                                                        <th className="col-2 text-center">Đơn giá</th>
                                                        <th className="col-2 text-center">Số lượng</th>
                                                        <th className="col-2 text-center">Số tiền</th>
                                                        <th className="col-1 text-center" style={{width: "100%"}}>Thao tác</th>
                                                    </tr>

                                                    </thead>
                                                    <tbody>
                                                    { customer ? (
                                                            products.map((product, index) => (
                                                                <tr key={index}>
                                                                    <td className="col-1 text-center">{index + 1}</td>
                                                                    <td className="col-3 text-center">{product.nameProduct}</td>
                                                                    <td className="col-2 text-center">
                                                                        {product.priceProduct
                                                                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                    </td>
                                                                    <td className="col-2">
                                                                        <div className="input-group">
                                                                            <button
                                                                                className="btn btn-danger"
                                                                                type="button"
                                                                                disabled={quantity[index] <= 1}
                                                                                onClick={() => decreaseValue(index)}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <input
                                                                                type="number"
                                                                                className="form-control text-center"
                                                                                value={quantity[index]}
                                                                                onChange={(e) => {
                                                                                    const newQuantities = [...quantity];
                                                                                    const quantityOfChosen = parseInt(e.target.value);
                                                                                    quantityOfChosen <= product.quantityProduct && (newQuantities[index] = quantityOfChosen);
                                                                                    quantityOfChosen > product.quantityProduct && (newQuantities[index]  = product.quantityProduct);
                                                                                    quantityOfChosen <= 0 && (newQuantities[index] = 1);
                                                                                    setQuantity(newQuantities);
                                                                                    customer && updateCurrentQuantity(newQuantities[index], product.idProduct, customer.idCustomer);
                                                                                }}
                                                                            />
                                                                            <button
                                                                                className="btn btn-success"
                                                                                type="button"
                                                                                disabled={quantity[index] >= product.quantityProduct}
                                                                                onClick={() => increaseValue(index)}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td className="col-2 text-center text-danger">
                                                                        { (product.priceProduct * quantity[index])
                                                                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                    </td>
                                                                    <td className="col-2 text-center">
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            type="button"
                                                                            onClick={()=> handleDeleteProduct(product.idProduct,customer.idCustomer)}
                                                                        >
                                                                            <i className="fa fa-times"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        ) :
                                                        (<tr>
                                                            <td className="text-center" colSpan="6">
                                                                <b>----Trống----</b>
                                                            </td>
                                                        </tr>)
                                                    }
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="row" style={{ width: '70%', margin: '1% auto 0 auto' }}>
                                <div className="col-4 p-2">
                                    <label>Thành tiền</label>
                                </div>
                                <div className="col-8">
                                    <Field
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                        value={totalPrice.toFixed(0)
                                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " ₫"}
                                        disabled
                                    />
                                </div>
                                <div className="col-4 p-2 mt-2">
                                    <label>Hình thức thanh toán</label>
                                </div>
                                <div className="col-8 mt-2" style={{ position: 'relative', top: '9px' }}>
                                    <div>
                                        <Field
                                            type="radio"
                                            id="theTinDung"
                                            name="paymentMethod"
                                            value="1"
                                            checked
                                            style={{ marginRight: '1%' }}
                                        />
                                        <label htmlFor="theTinDung" style={{ marginRight: '4%' }}>
                                            Thẻ tín dụng
                                        </label>
                                    </div>
                                    <div>
                                        <Field
                                            type="radio"
                                            id="tienMat"
                                            name="paymentMethod"
                                            value="2"
                                            style={{ marginRight: '1%' }}
                                        />
                                        <label htmlFor="tienMat">Tiền mặt</label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-outline-primary col-6 d-flex justify-content-center my-3" style={{ width: '30%', margin: '15px' }}>
                                        Tiến hành thanh toán
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <BillNotPayConfirm
                        carts={carts}
                        orderBill={orderBillNotPay}
                        handleClose={closeModal}
                        handleData={updateCustomerConfirm}
                    ></BillNotPayConfirm>
                </Form>
            </Formik>
            <CustomerChooseModal handleData={handleDataByChooseCustomer}/>
            <CustomerCreateModal handleData={handleDataByCreateCustomer} />
            <ProductChooseModal data1={0} handleData={handleDataByChooseProduct}/>
        </>
    );
}
export default Order;