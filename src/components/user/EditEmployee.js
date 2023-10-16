import React from 'react';

function EditEmployee(props) {
    return (
        <div>
            <>
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark"
                    style={{ position: "fixed", width: "100%", top: 0, zIndex: 9999 }}
                >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="HaiBH_Home_Admin.html">
                            Home
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDarkDropdown"
                            aria-controls="navbarNavDarkDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                            <ul className="navbar-nav">
                                <a
                                    className="nav-link"
                                    href="PhuocLQ_EmployeeList.html"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    Quản Lý Nhân Viên
                                </a>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Kinh Doanh
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <a className="dropdown-item" href="LoiVT_SalesReport.html">
                                                Quản Lý Báo Cáo Doanh Thu
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="QuanND_Product_List.html">
                                                Xem Thông Tin Hàng Hoá
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="ThienPT_supplierList.html">
                                                Quản Lý Nhà Cung Cấp
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="ThoiND_sale_management.html"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Bán Hàng
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <a className="dropdown-item" href="ThoiND_sale_management.html">
                                                Quản Lý Bán Hàng
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="PhapTM_warehouse.html"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Thủ Kho
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <a className="dropdown-item" href="QuanND_Product_List.html">
                                                Quản Lý Xuất/Nhập Kho
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="collapse navbar-collapse"
                            style={{ marginLeft: "auto", width: 0 }}
                        >
                            <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="HaiBH_Infomation.html"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Bùi Hữu Hải - Admin
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <a className="dropdown-item" href="HaiBH_Infomation.html">
                                                Thông Tin Cá Nhân
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="HaiBH_Login.html">
                                                Đăng Xuất
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-5 pt-5 table-responsive">
                    <div className="row">
                        <div className="col-4 d-flex justify-content-center align-items-center">
                            <img
                                style={{
                                    borderRadius: 50,
                                    objectFit: "cover",
                                    border: "1px solid black",
                                    padding: 20,
                                    width: "90%"
                                }}
                                src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg?fit=512%2C20000&quality=95&ssl=1"
                            />
                        </div>
                        <div className="col-8 d-flex justify-content-center align-items-center">
                            <fieldset
                                className="form-input shadow"
                                style={{
                                    borderRadius: 20,
                                    border: "1px solid #000000",
                                    height: "auto",
                                    padding: 20,
                                    backgroundColor: "#f8f9fa",
                                    width: 790
                                }}
                            >
                                <legend className="float-none w-auto px-3">
                                    <h2>Thêm mới nhân viên</h2>
                                </legend>
                                <div className="row">
                                    {/* employeeCode  */}
                                    <div className="col-2 p-2">
                                        <label>Mã nhân viên</label>
                                    </div>
                                    <div className="col-4">
                                        <span className="text-black-50 form-control mt-2">NV028</span>
                                    </div>
                                    {/* employeeName  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Tên nhân viên <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* Address  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Địa chỉ <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* phone  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Số điện thoại <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* Account  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Tên tài khoản <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* image  */}
                                    <div className="col-2 p-2">
                                        <label>Ảnh nhân viên</label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            type="file"
                                            className="form-control border border-dark mt-2 mb-4"
                                            aria-describedby="inputGroupFileAddon03"
                                            aria-label="Upload"
                                            accept="image/png, image/gif, image/jpeg"
                                            ref="{inputFileRef}"
                                            onchange="{handleInputChange}"
                                            name="image"
                                        />
                                    </div>
                                    {/* startDay  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Ngày vào làm <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="date"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* birthDay  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Ngày sinh <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="date"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* idCart  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            CCCD <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* email  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Email <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control border border-dark mt-2"
                                            type="text"
                                        />
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* gender  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Giới tính <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <select className="form-select border border-dark mt-2">
                                            <option value={1}>Nam</option>
                                            <option value={2}>Nữ</option>
                                        </select>
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                    {/* job  */}
                                    <div className="col-2 p-2">
                                        <label>
                                            Công việc <sup style={{ color: "red" }}>*</sup>
                                        </label>
                                    </div>
                                    <div className="col-4">
                                        <select className="form-select border border-dark mt-2">
                                            <option value={1}>Nhân viên kinh doanh</option>
                                            <option value={2}>Nhân viên bán hàng</option>
                                            <option value={2}>Thủ kho</option>
                                        </select>
                                        <div style={{ height: 16 }}>
                                            <small style={{ color: "red" }}>error</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* button  */}
                                    <div className="col-3 p-2 mt-3">
                                        <a href="PhuocLQ_EmployeeList.html">
                                            <button className="btn btn-outline-secondary float-end mx-1 mt-2 shadow">
                                                Trở về
                                            </button>
                                        </a>
                                        <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow">
                                            Lưu
                                        </button>
                                    </div>
                                    {/* information  */}
                                    <div className="col-9 p-4 float-end">
                                        <span className="float-end">
                                            (<span style={{ color: "red" }}>*</span>) Thông tin bắt buộc
                                        </span>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </>

        </div>
    );
}

export default EditEmployee;