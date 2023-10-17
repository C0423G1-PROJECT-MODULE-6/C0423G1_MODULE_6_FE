import React from "react";
import { useNavigate } from "react-router-dom";

const Error401 = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="d-flex align-items-center  justify-content-center vh-100 bg-light">
                <div className="text-center">
                    <h1 className="display-1 fw-bold text-dark mb-4">401 Unauthorization</h1>
                    <div>Chức năng này cần đăng nhập, hãy đăng nhập hoặc quay lại trang chủ</div>
                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={() => navigate('/login')} className="btn btn-primary me-1">Đăng nhập</button>
                        <button onClick={() => navigate('/home')} className="btn btn-secondary ">Quay lại</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Error401;