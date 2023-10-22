import React, {useEffect, useState} from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import {Link, useNavigate, NavLink} from "react-router-dom";
import {
    getIdByUserName,
    infoAppUserByJwtToken,
} from "../../service/user/AuthService";
import * as appUserService from '../../service/user/AuthService';
import * as UserService from '../../service/user/UserService';
// import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";


function HeaderAdmin({refresh}) {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userAppName, setUserAppName] = useState("");

    // replace 2 with userId
    // const dispatch = useDispatch();

    const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
    const roleSale = appUserService.checkRoleAppUser("ROLE_SALE");
    const roleBusiness = appUserService.checkRoleAppUser("ROLE_BUSINESS");
    const roleWarehouse = appUserService.checkRoleAppUser("ROLE_WAREHOUSE");

    const roleName = () => {
        // const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
        // const roleSale = appUserService.checkRoleAppUser("ROLE_SALE");
        // const roleBusiness = appUserService.checkRoleAppUser("ROLE_BUSINESS");
        // const roleWarehouse = appUserService.checkRoleAppUser("ROLE_WAREHOUSE");
        if (roleAdmin) {
            return "Admin";
        } else if (roleSale) {
            return "Sale";
        } else if (roleBusiness) {
            return "Business";
        } else if (roleWarehouse) {
            return "Warehouse";
        }
    }


    useEffect(() => {
        getAppUserId();
        getUsername();
        // getNameUser()
    }, [refresh]);

    const getUsername = async () => {
        const response = await appUserService.infoAppUserByJwtToken();
        setUsername(response);
    };

    const getAppUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
            const nameUser = await UserService.findById(id.data);
            setUserAppName(nameUser.data.employeeName)
        }
    };

    // const getNameUser = async () => {
    //     const nameUser = await UserService.findById(userId);
    //     console.log(nameUser);
    //     setUserAppName(nameUser.data.employeeName)
    // }

    const handleLogOut = () => {
        localStorage.removeItem("JWT");
        setJwtToken(undefined);
        setUsername(undefined);
        navigate("/login");
        toast("Đăng xuất thành công");
        window.location.reload();
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/admin/home" style={{padding: "0"}}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/c4zone-da49c.appspot.com/o/logoplus.png?alt=media&token=8abd0661-05bf-4fc3-804f-60ab9482b75f&_gl=1*pc8atb*_ga*OTEwMjg5ODY2LjE2OTM3NjU2MzY.*_ga_CW55HF8NVT*MTY5NzU5ODI2OS44LjEuMTY5NzU5ODM1Ni41Mi4wLjA" // Đường dẫn đến hình ảnh logo của bạn
                        alt="Home"
                        height="40"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDarkDropdown"/>
                <Navbar.Collapse id="navbarNavDarkDropdown">
                    {(roleAdmin) && (
                        <Nav>
                            <NavDropdown title="Quản Lý" id="nav-dropdown-dark">
                            <Link to="/admin/employee" className="dropdown-item">Quản Lý Nhân Viên</Link>
                            <Link to="/admin/customer" className="dropdown-item">Quản Lý Khách Hàng</Link>
                            </NavDropdown>
                        </Nav>
                    )}
                    {(roleAdmin || roleBusiness) && (
                        <Nav>
                            <NavDropdown title="Kinh Doanh" id="nav-dropdown-dark">
                                <Link to="/admin/order/saleHistory" className="dropdown-item">Quản Lý Lịch Sử Bán Hàng</Link>
                                <Link to="/admin/salesreport" className="dropdown-item">Quản Lý Báo Cáo Doanh Thu</Link>
                                <Link to="/admin/product/list" className="dropdown-item">Xem Thông Tin Hàng Hoá</Link>
                                <Link to="/admin/supplier" className="dropdown-item">Quản Lý Nhà Cung Cấp</Link>
                            </NavDropdown>
                        </Nav>
                    )}

                    {(roleAdmin || roleSale) && (
                        <Nav>
                            <NavDropdown title="Bán Hàng" id="nav-dropdown-dark">
                                <Link to="/admin/order" className="dropdown-item">Quản Lý Bán Hàng</Link>
                            </NavDropdown>
                        </Nav>
                    )}

                    {(roleAdmin || roleWarehouse) && (
                        <Nav>
                            <NavDropdown title="Thủ Kho" id="nav-dropdown-dark">
                                <Link to="/admin/warehouse" className="dropdown-item">Quản Lý Xuất/Nhập Kho</Link>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
                <div className="collapse navbar-collapse" style={{marginLeft: "auto", width: "0"}}>
                    <ul className="navbar-nav" style={{marginLeft: "auto"}}>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="HaiBH_Infomation.html" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                {userAppName} - {roleName()}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" style={{left: "-60px"}}>
                                <li><Link to={`/admin/information/${userId}`} className="dropdown-item">Thông Tin Cá
                                    Nhân</Link></li>
                                <li>
                                    <button onClick={() => {
                                        handleLogOut();
                                    }} className="dropdown-item">Đăng Xuất
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </Navbar>
    );
}

export default HeaderAdmin;

