// import React from 'react';
// import * as orderService from "../../service/order/OrderService"
// function BillNotPayConfirm(props) {
//     let {orderBill,handleClose} = props;
//     const handleCreateNewBill = () => {
//
//     };
//     return (
//         <>
//             {
//                 orderBill && (
//                     <div className="modal" tabIndex="-1" style={{display: 'block'}}>
//                         <div className="modal-dialog">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title">Confirm Deletion</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
//                                             onClick={handleClose}></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     {/* eslint-disable-next-line react/prop-types */}
//                                     <p>You have a old bill not pay in <b>{orderBill.dateOfOrder}</b>? Do you want to use it?</p>
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
//                                             onClick={()=> handleCreateNewBill()}>No
//                                     </button>
//                                     <button type="button" className="btn btn-primary"
//                                             onClick={() => handle}>Yes
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//
//         </>
//     );
// }
//
// export default BillNotPayConfirm;
