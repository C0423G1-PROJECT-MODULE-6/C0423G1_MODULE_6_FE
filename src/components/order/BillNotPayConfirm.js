import React, {useState} from 'react';
import * as orderService from "../../service/order/OrderService"
function BillNotPayConfirm(props) {
    let {orderBill,handleClose,handleData} = props;
    const handleOldBill = async () => {
        const oldOrder =await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,1,1);
        console.log(oldOrder)
        handleData(oldOrder.customer);
        handleClose();
    };
    const handleCreateNewBill = async () => {
        const newOrder = await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,1,2);
        console.log(newOrder)
        handleData(newOrder.customer);
        handleClose();
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
