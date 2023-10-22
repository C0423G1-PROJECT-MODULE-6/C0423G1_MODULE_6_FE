import React, { useEffect, useState } from 'react';
import * as orderService from "../../service/order/OrderService";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useParams} from "react-router";

function ShowBill() {
    const [orderBill, setOrderBill] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [print, setPrint] = useState(false);
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const param = useParams();

    console.log(param.id)

    const findOrderBillNewest = async () => {
        const res = await orderService.findOrderBillNewest(param.id);
        setOrderBill(res);
        setCustomer(res.customer);
    };

    const getAllCart = async (idCustomer) => {
        const res = await orderService.getAllCart(idCustomer);
        setProducts(res.data);
    };


    useEffect(() => {
        findOrderBillNewest();
        setPrint(0);
    }, []);

    useEffect(() => {
        customer && getAllCart(customer.idCustomer);
    }, [customer]);

    useEffect(() => {
        if (products.length > 0) {
            let total = 0;
            products.forEach((product, index) => {
                total += product.priceProduct * product.quantityOrder + product.priceProduct * 0.1;
            });
            setTotalPrice(total);
        }
    }, [products]);

    const handlePrintChange = (e) => {
        const printStatus = e.target.checked ? 1 : 0;
        console.log(printStatus)
        setPrint(printStatus);
    };

    const handleSubmit =async () => {
        const res =await orderService.acceptToPay(print,orderBill);
        console.log(res)
        if (res && res.type === "print"){
            navigate("/admin/order");
            toast("Bạn đã thanh toán thành công");
        }else if (res && res.type === "noPrint"){
            navigate("/admin/order")
            toast("Bạn đã thanh toán thành công");
        }
    };

    return (
        <div className="container my-5">
            {orderBill && orderBill.customer ? (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Thông tin khách hàng</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <p className="mb-0">Tên khách hàng:</p>
                            </div>
                            <div className="col-6">
                                <p className="mb-0">{orderBill.customer.nameCustomer}</p>
                            </div>
                            <div className="col-6">
                                <p className="mb-0">Số điện thoại:</p>
                            </div>
                            <div className="col-6">
                                <p className="mb-0">{orderBill.customer.phoneNumberCustomer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h4 className="text-center">Loading...</h4>
            )}

            {orderBill && orderBill.customer && (
                <div className="card my-4">
                    <div className="card-header">
                        <h5 className="card-title">Chi tiết đơn hàng</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col" className="text-center">#</th>
                                <th scope="col" className="text-center">Tên sản phẩm</th>
                                <th scope="col" className="text-center">Đơn giá</th>
                                <th scope="col" className="text-center">Số lượng</th>
                                <th scope="col" className="text-center">Số tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <th scope="row" className="text-center">{index + 1}</th>
                                    <td className="text-center">{product ? product.nameProduct : "N/A"}</td>
                                    <td className="text-center">{product ? product.priceProduct.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "N/A"}</td>
                                    <td className="text-center">{product ? product.quantityOrder : "N/A"}</td>
                                    <td className="text-center text-danger">
                                        {product ? (product.priceProduct * product.quantityOrder).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "N/A"}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <th colSpan="4" className="text-right border border-end-0">Thành tiền (đã bao gồm thuế):</th>
                                <td className="text-center text-danger border border-start-0">
                                    {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="print"
                                name="print"
                                checked={print}
                                onChange={handlePrintChange}
                                defaultChecked={false}
                            />
                            <label className="form-check-label" htmlFor="print">In hóa đơn</label>
                        </div>
                    </div>
                </div>
            )}

            {orderBill && orderBill.customer && (
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Thanh toán
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShowBill;
