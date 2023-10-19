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

function Order() {
    const [customer, setCustomer] = useState(null);
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderBillNotPay, setOrderBillNotPay] = useState(null);
    const navigate = useNavigate();

    const findCustomerByid = async (data) => {
        const res =await orderService.findCustomerById(data);
        console.log(res.objectResponse)
        if (res && res.type === "customer") {
            setCustomer(res.objectResponse);
        } else if (res && res.type === "orderBill") {
            setOrderBillNotPay(res.objectResponse);
        } else {
            console.log("Dữ liệu không hợp lệ hoặc không có type");
        }
    };

    const handleDataByChooseCustomer=(data)=>{
        findCustomerByid(data);
    }
    // const updateCustomerConfirm = (data) => {
    //     console.log(data)
    //     setCustomer(data)
    // }

    const getAllCart = async () => {
        const res = await orderService.getAllCart(1);
        if (res.status === 200){
            setHasResult(res.data.length > 0);
            setCarts(res.data);
            const initialQuantities = new Array(res.data.length).fill(1);
            setQuantity(initialQuantities);
        }else if (res.status === 404){
            setHasResult(false);
        }
    }



    useEffect(() => {
        getAllCart();
    }, [customer]);

    useEffect(() => {
        let total = 0;
        carts.forEach((cart, index) => {
            total += cart.priceProduct * quantity[index] + cart.priceProduct * 0.1;
        });
        setTotalPrice(total);
    }, [carts, quantity]);


    console.log("customer "+JSON.stringify(customer))

    const decreaseValue = (index) => {
        if (quantity[index] > 1) {
            const newQuantities = [...quantity];
            newQuantities[index] = quantity[index] - 1;
            setQuantity(newQuantities);
            updateCurrentQuantity(newQuantities[index],carts[index].idProduct,1);
        }
    };

    const increaseValue = (index) => {
        const newQuantities = [...quantity];
        newQuantities[index] = quantity[index] + 1;
        setQuantity(newQuantities);
        updateCurrentQuantity(newQuantities[index],carts[index].idProduct,1);
    };

    const updateCurrentQuantity =async (newQuantity, idProduct, idUser) => {
        await orderService.updateQuantity(newQuantity,idProduct,idUser);
    };

    const handleDeleteProduct = async (idProduct,idUser) => {
       const res= await orderService.deleteChosenProduct(idProduct,idUser);
        res.status === 200 && getAllCart();
    };

    const showOrderBill =async (value) => {
        console.log(value)
        value = {
            ...value,
            idCustomerOrder : customer.idCustomer,
            idUser: 1
        }
        console.log(value)

      const res = await orderService.getBillNotPay(value);
        if (res.status === 200){
            navigate("/admin/order/showBill");
        }
    };

    const initialValues = {
        paymentMethod : 1,
        idCustomerOrder : "",
        idUser: ""
    }
    // const validationSchema = {
    //     idCustomerOrder: Yup.number().required("Không được để trống")
    // }

    return (
        <>
            <HeaderAdmin/>
            <Formik initialValues={initialValues}
                    // validationSchema={Yup.object(validationSchema)}
            onSubmit={(value)=>{
                console.log("Form values:", value);
                showOrderBill(value)}}>
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
                                                    readOnly
                                                />
                                                {/*{customer ? null : (*/}
                                                {/*    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>*/}
                                                {/*        <ErrorMessage*/}
                                                {/*            className="text-danger"*/}
                                                {/*            name="idCustomerOrder"*/}
                                                {/*            component="small"*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*)}*/}

                                            </div>



                                            <div className="col-4 p-2">
                                                <label>Số điện thoại</label>
                                            </div>
                                            <div className="col-8 mb-2">
                                                <input
                                                    className="form-control mt-2 border border-dark"
                                                    type="text"
                                                    value={customer ? customer.phoneNumberCustomer : ""}
                                                    readOnly
                                                />
                                                {/*{customer ? null : (*/}
                                                {/*    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>*/}
                                                {/*        <ErrorMessage*/}
                                                {/*            className="text-danger"*/}
                                                {/*            name="idCustomerOrder"*/}
                                                {/*            component="small"*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>
                                            <div className="col-4 p-2">
                                                <label>Địa chỉ</label>
                                            </div>
                                            <div className="col-8 mb-2">
                                                <input
                                                    className="form-control mt-2 border border-dark"
                                                    type="text"
                                                    value={customer ? customer.addressCustomer : ""}
                                                    readOnly
                                                />
                                                {/*{customer ? null : (*/}
                                                {/*    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>*/}
                                                {/*        <ErrorMessage*/}
                                                {/*            className="text-danger"*/}
                                                {/*            name="idCustomerOrder"*/}
                                                {/*            component="small"*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>
                                            <div className="col-4 p-2">
                                                <label>Ngày sinh </label>
                                            </div>
                                            <div className="col-8 mb-2">
                                                <input
                                                    className="form-control mt-2 border border-dark"
                                                    type="text"
                                                    value={customer ? customer.dateOfBirthCustomer : ""}
                                                    readOnly
                                                />
                                                {/*{customer ? null : (*/}
                                                {/*    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>*/}
                                                {/*        <ErrorMessage*/}
                                                {/*            className="text-danger"*/}
                                                {/*            name="idCustomerOrder"*/}
                                                {/*            component="small"*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>
                                            <div className="col-4 p-2">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-8 mb-2">
                                                <input
                                                    className="form-control mt-2 border border-dark"
                                                    type="email"
                                                    value={customer ? customer.emailCustomer : ""}
                                                    readOnly
                                                />
                                                {/*{customer ? null : (*/}
                                                {/*    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>*/}
                                                {/*        <ErrorMessage*/}
                                                {/*            className="text-danger"*/}
                                                {/*            name="idCustomerOrder"*/}
                                                {/*            component="small"*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>
                                            <Field name="idCustomerOrder" type="hidden" value={customer ? customer.idCustomer : ""}/>
                                            <Field name="idUser" type="hidden" value={1}/>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div style={{ marginBottom: '5%' }}>
                                <fieldset className="form-input shadow mx-auto" style={{ borderRadius: '20px', border: '1px solid black', height: 'auto', width: '80%', padding: '20px' }}>
                                    <legend className="float-none w-auto px-1">Sản phẩm đã chọn</legend>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button type="button" className="btn btn-outline-primary col-6 mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModalProduct" style={{ width: '30%' }}>
                                            Chọn sản phẩm
                                        </button>
                                        <button className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }}>Scan QR</button>
                                    </div>
                                    <div className="row">
                                        <table className="table " style={{ width: '100%' }}>
                                            <thead>
                                            <tr>
                                                <th className="col-1 text-center">#</th>
                                                <th className="col-3 text-center">Tên sản phẩm</th>
                                                <th className="col-2 text-center">Đơn giá</th>
                                                <th className="col-2 text-center">Số lượng</th>
                                                <th className="col-2 text-center">Số tiền</th>
                                                <th className="col-2 text-center" style={{width: "100%"}}>Thao tác</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { hasResult ? (
                                                carts.map((cart, index) => (
                                                    <tr key={index}>
                                                        <td className="col-1 text-center">{index + 1}</td>
                                                        <td className="col-3 text-center">{cart.nameProduct}</td>
                                                        <td className="col-2 text-center">
                                                            {cart.priceProduct
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
                                                                        quantityOfChosen <= cart.quantityProduct && (newQuantities[index] = quantityOfChosen);
                                                                        quantityOfChosen > cart.quantityProduct && (newQuantities[index]  = cart.quantityProduct);
                                                                        quantityOfChosen <= 0 && (newQuantities[index] = 1);
                                                                        setQuantity(newQuantities);
                                                                        updateCurrentQuantity(newQuantities[index], cart.idProduct, 1);
                                                                    }}
                                                                />
                                                                <button
                                                                    className="btn btn-success"
                                                                    type="button"
                                                                    disabled={quantity[index] >= cart.quantityProduct}
                                                                    onClick={() => increaseValue(index)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="col-2 text-center text-danger">
                                                        { (cart.priceProduct * quantity[index])
                                                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </td>
                                                        <td className="col-2 text-center">
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={()=>handleDeleteProduct(cart.idProduct,1)}
                                                            >
                                                                <i className="fa fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                ))
                                                ) :
                                                (<tr>
                                                <td className="text-center" colSpan="6">
                                                    <b>Trống</b>
                                                </td>
                                            </tr>)
                                            }
                                            </tbody>
                                        </table>
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
                                        readOnly
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
                    {/*<BillNotPayConfirm*/}
                    {/*    orderBill={orderBillNotPay}*/}
                    {/*    handleClose={closeModal}*/}
                    {/*    handleData={updateCustomerConfirm}*/}
                    {/*></BillNotPayConfirm>*/}
                </Form>
            </Formik>

            <CustomerChooseModal handleData={handleDataByChooseCustomer}/>

            <CustomerCreateModal />
            <ProductChooseModal />
        </>
    );
}
export default Order;