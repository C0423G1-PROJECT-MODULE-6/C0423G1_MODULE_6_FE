import React, {useState} from 'react';
import * as orderService from "../../service/order/OrderService"
import {toast} from "react-toastify";
function BillNotPayConfirm(props) {
    let {orderBill,handleClose,handleData} = props;
    const handleOldBill = async () => {
        const oldOrder =await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,1,1);
        handleData(oldOrder.customer);
        handleClose();
        toast("Bạn đã giữ lại bill cũ")
    };
    const handleCreateNewBill = async () => {
        const newOrder = await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,1,2);
        handleData(newOrder.customer);
        handleClose();
        toast("Bạn đã xóa bill cũ")
    };
    return (
        <>
            {
                orderBill != null && (
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Order Bill</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={handleClose}></button>
                                </div>
                                <div className="modal-body">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <p><b>{orderBill.customer.nameCustomer} </b>
                                        có một bill cũ vào ngày <b>{orderBill.dateOfOrder}</b>.
                                        <br/>
                                        Bạn muốn sử dụng lại hay là tạo mới bill?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={handleOldBill}>
                                        Sử dụng lại
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                    onClick={handleCreateNewBill}>
                                        Tạo mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default BillNotPayConfirm;
