import { useEffect } from "react";
import { useState } from "react";
import {
  deleteEmployee,
  getEmployeeList,
} from "../../service/user/EmployeeService";
import { Link } from "react-router-dom";
import { getAppRoleList } from "../../service/user/AppRoleService";
import ModalDelete from "./EmployeeDeleteModal";
import '../../css/user/employee.css'

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [listJob, setListJob] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    info: {},
  });

  //loadListJob
  const loadListJob = async () => {
    const data = await getAppRoleList();
    setListJob(data);
  };
  useEffect(() => {
    loadListJob();
  }, []);

  //list
  const loadEmployeeList = async () => {
    try {
      const result = await getEmployeeList(
        page,
        searchJob,
        searchName,
        searchPhone
      );
      if(result.content.length === 0){
        setPage(page-1);
      }
      setTotalPage(result.totalPages);
      setEmployeeList(result.content);
    } catch {
      setEmployeeList([]);
    }
    // console.log(result);
  };
  useEffect(() => {
    loadEmployeeList();
  }, [page, searchJob, searchName, searchPhone]);

  //paging
  const nextPage = () => {
    if (page < totalPage - 1) {
      setPage((Prev) => Prev + 1);
    }
  };
  const previousPage = () => {
    if (page > 0) {
      setPage((Prev) => Prev - 1);
    }
  };

  //delete
  const handleRowClick = (employee) => {
    setSelectedRow(employee.id);
    setEmployee(employee);
  };

  const showModalDelete = (employee) => {
    setModal({
      show: true,
      info: employee,
    });
  };
  const hideModalDelete = () => {
    setModal({
      show: false,
      info: {},
    });
  };
  const deleteConfirm = async (id) => {
    if (selectedRow !== null) {
      await deleteEmployee(id);
      hideModalDelete();
      loadEmployeeList();
      setSelectedRow(null);
      setEmployee(null);
    }
  };

  //search
  const getSearch = () => {
    const searchName = document.getElementById("searchName").value;
    setSearchName(searchName);
    const searchPhone = document.getElementById("searchPhone").value;
    setSearchPhone(searchPhone);
    const searchJob = document.getElementById("searchJob").value;
    console.log(searchJob);
    setSearchJob(searchJob);
    setPage(0);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 10 }}
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
                    <a
                      className="dropdown-item"
                      href="QuanND_Product_List.html"
                    >
                      Xem Thông Tin Hàng Hoá
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="ThienPT_supplierList.html"
                    >
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
                    <a
                      className="dropdown-item"
                      href="ThoiND_sale_management.html"
                    >
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
                    <a
                      className="dropdown-item"
                      href="QuanND_Product_List.html"
                    >
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
      <div className="container my-5 pt-5">
        <div className="col-12 d-flex justify-content-center">
          <h1>Danh sách nhân viên</h1>
        </div>
        <div>
          <div className="col-12 d-flex justify-content-end my-3">
            <div className="col-auto mx-2">
              <select className="form-select" id="searchJob">
                <option value={""} selected>
                  --Tìm theo công việc--
                </option>
                {listJob.map((job) => (
                  <option key={job.id} value={job.name}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="search"
                aria-label="Search"
                placeholder="Tìm theo tên"
                id="searchName"
              />
            </div>
            <div className="col-auto mx-2">
              <input
                className="form-control"
                type="number"
                aria-label="Search"
                placeholder="Tìm theo số điện thoại"
                id="searchPhone"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-outline-primary text-center"
                type="button"
                onClick={() => getSearch()}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <table className="border border-dark table table-hover">
          <thead style={{ backgroundColor: "darkgray" }}>
            <tr>
              <th>#</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Công việc</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Không tìm thấy
                </td>
              </tr>
            ) : (
              employeeList.map((employee, index) => (
                <tr
                  key={employee.id}
                  onClick={() => handleRowClick(employee)}
                  className={selectedRow === employee.id ? "selected" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.employeeBirthday}</td>
                  <td>{employee.employeeAddress}</td>
                  <td>{employee.employeeRoleName}</td>
                  <td>{employee.employeePhone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* java script để chọn row */}
        {/* java script để chọn row */}
        <div className="d-flex col-12 mt-3">
          <div className="col float-start">
            <Link to={"/employee/create"}>
              <button type="button" className="btn btn-outline-primary mx-1">
                Thêm mới
              </button>
            </Link>
            <Link to={"/employee/edit"}>
              <button type="button" className="btn btn-outline-success mx-1">
                Cập nhật
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger mx-1"
              onClick={() => (employee !== null) & showModalDelete(employee)}
              disabled={employee === null}
            >
              Xóa
            </button>
          </div>
          <div className="col-auto float-end">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    tabIndex={-1}
                    aria-disabled="true"
                    href="#"
                    onClick={() => previousPage()}
                    style={{ display: page === 0 ? "none" : "block" }}
                  >
                    Trước
                  </a>
                </li>
                <li className="page-item" aria-current="page">
                  <a className="page-link" href="#">
                    {page + 1}/{totalPage}
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    tabIndex={-1}
                    aria-disabled="true"
                    href="#"
                    onClick={() => nextPage()}
                    style={{
                      display: page === totalPage - 1 ? "none" : "block",
                    }}
                  >
                    Sau
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Modal */}
      <ModalDelete
        showModal={modal}
        hideModal={hideModalDelete}
        confirm={deleteConfirm}
      ></ModalDelete>
      {/* Modal */}
    </>
  );
};
export default EmployeeList;
