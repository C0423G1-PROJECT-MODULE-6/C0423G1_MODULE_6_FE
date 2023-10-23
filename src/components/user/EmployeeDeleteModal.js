import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModalDelete({showModal, hideModal, confirm }) {

    return (
        <>
            <Modal show={showModal.show} onHide={hideModal}>
                <Modal.Header >
                <h5 className="modal-title">Thông báo!!!</h5>
                </Modal.Header>
                <Modal.Body>
                   <p>
                    Bạn có muốn xóa nhân viên sau :
                    {showModal.info.map((item,index) => 
                    <>
                    <br/>
                    <b>
                         {index + 1}: {item.employeeName}
                    </b>
                    </>
                    )}
                    </p> 
                        
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-outline-primary" onClick={confirm} >Xác nhận</button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={hideModal} >Hủy</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;