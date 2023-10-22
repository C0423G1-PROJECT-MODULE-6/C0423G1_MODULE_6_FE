import React, {useEffect, useState} from 'react';
import * as orderService from "../../service/order/OrderService"
import {toast} from "react-toastify";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
function BillNotPayConfirm(props) {
    let {orderBill,carts,handleClose,handleData} = props;
    const [userId, setUserId] = useState("");

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
    const handleOldBill = async () => {
        if (carts && carts.length > 0) {
            const oldCart = await orderService.getOrderNotPayByChoose(carts[0].customer.idCustomer,userId, 1,1);
            console.log(oldCart)
            if (oldCart && oldCart.length > 0) {
                handleData(oldCart[0].customer);
                handleClose();
                toast("Bạn đã giữ lại đơn hàng cũ");
            } else {
                handleClose();
                console.error("Không tìm thấy đơn hàng cũ");
            }
        } else if (orderBill != null){
            const oldOrder =await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,userId,1,2);
            if (oldOrder != null){
                handleData(oldOrder.customer);
                handleClose();
                toast("Bạn đã giữ lại bill cũ");
            }else {
                handleClose();
                console.error("Không tìm thấy bill cũ");
            }
        }else {
            handleClose();
            console.error("Không có đơn hàng để xử lý");
        }
    };

    const handleCreateNewBill = async () => {
        if (carts && carts.length > 0) {
            const newOrder = await orderService.getOrderNotPayByChoose(carts[0].customer.idCustomer, userId,2,1);
            console.log(carts[0].customer)
            if (newOrder.length === 0) {
                handleData(carts[0].customer);
                handleClose();
                toast("Bạn đã xóa đơn hàng cũ");
            } else {
                handleClose();
                console.error("Không tạo được đơn hàng mới");
            }
        } else if (orderBill != null){
            console.log(orderBill.customer)
            const newOrder = await orderService.getOrderNotPayByChoose(orderBill.customer.idCustomer,userId, 2,2);
            console.log(newOrder);
            if (newOrder){
                handleData(newOrder.customer);
                handleClose();
                toast("Bạn đã xóa bill cũ");
            }else {
                handleClose();
                console.error("Không tạo được bill mới");
            }
        }else {
            handleClose();
            console.error("Không có đơn hàng để xử lý.");
        }
    };
    return (
        <>
            {
                (orderBill != null || carts.length > 0) && (
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Bill</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={handleClose}></button>
                                </div>
                                <div className="modal-body">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {carts.length > 0 &&
                                        <p><b>{carts[0].customer.nameCustomer} </b>
                                        có một đơn hàng chưa hoàn thành
                                        Bạn muốn sử dụng lại hay là tạo mới đơn hàng?</p>
                                    }
                                    {orderBill != null &&
                                        <p><b>{orderBill.customer.nameCustomer} </b>
                                        có một bill cũ vào lúc <b>{orderBill.timeOfOrder}</b> ngày <b>{orderBill.dateOfOrder}</b>.
                                        <br/>
                                        Bạn muốn sử dụng lại hay là tạo mới bill?</p>
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={handleOldBill}
                                    >
                                        Sử dụng lại
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={handleCreateNewBill}
                                    >
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
