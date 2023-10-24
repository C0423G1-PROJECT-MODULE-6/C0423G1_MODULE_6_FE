import { useEffect } from "react";
import { useState } from "react";
import {
  deleteEmployee,
  getEmployeeList,
} from "../../service/user/EmployeeService";
import { Link, useNavigate } from "react-router-dom";
import { getAppRoleList } from "../../service/user/AppRoleService";
import ModalDelete from "./EmployeeDeleteModal";
import "../../css/user/employee.css";
import HeaderAdmin from "./HeaderAdmin";
import { toast } from "react-toastify";
import Footer from "../home/common/Footer";
import { format, parseISO } from "date-fns";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [listJob, setListJob] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    info: [],
  });
  const [totalElement, setTotalElement] = useState(0);

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
      if (result.data.content.length === 0) {
        setPage(page - 1);
      }
      setTotalPage(result.data.totalPages);
      setEmployeeList(result.data.content);
      setTotalElement(result.data.totalElements);
    } catch {
      setEmployeeList([]);
      setTotalPage(0);
      setTotalElement(0);
    }
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
  const showModalDelete = () => {
    if (selectedEmployees.length !== 0) {
      setModal({
        show: true,
        info: selectedEmployees,
      });
    } else {
      toast("Vui lòng chọn nhân viên để xóa");
    }
  };
  const hideModalDelete = () => {
    setModal({
      show: false,
      info: [],
    });
  };
  const deleteConfirm = async () => {
    for( const e of selectedEmployees){
      if(e.employeeTypeName === "Admin"){
        toast.error("Không thể xóa admin")
        return null;
      }
    }
    for (const e of selectedEmployees) {
      await deleteEmployee(e.id);
    }
    toast("Xóa thành công");
    if (employeeList.length === selectedEmployees.length && totalPage !== 1) {
      setPage(page - 1);
    }
    setSelectedEmployees([]);
    hideModalDelete();
    loadEmployeeList();
  };

  //search
  const getSearch = () => {
    const searchName = document.getElementById("searchName").value;
    setSearchName(searchName);
    const searchPhone = document.getElementById("searchPhone").value;
    setSearchPhone(searchPhone);
    const searchJob = document.getElementById("searchJob").value;
    setSearchJob(searchJob);
    setPage(0);
  };

  const handleUpdate = () => {
    if (selectedEmployees.length === 0) {
      toast("Vui lòng chọn nhận viên để chỉnh sửa");
    } else {
      navigate(`/admin/admin/employee/edit/${selectedEmployees[0].id}` );
      
    }

  };

  console.log(selectedEmployees);
  return (
    <>
      <HeaderAdmin></HeaderAdmin>

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
                  <option key={job.id} value={job.type}>
                    {job.type}
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
                placeholder="Tìm số điện thoại"
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
        <div style={{ minHeight: "365px" }}>
          <table className="border border-dark table table-hover">
            <thead>
              <tr>
                <th style={{ backgroundColor: "black",color:"white", width: "5%" }}>#</th>
                <th style={{ backgroundColor: "black",color:"white", width: "20%" }}>
                  Họ và tên
                </th>
                <th style={{ backgroundColor: "black",color:"white", width: "10%" }}>
                  Ảnh
                </th>
                <th style={{ backgroundColor: "black",color:"white", width: "10%" }}>
                  Ngày sinh
                </th>
                <th style={{ backgroundColor: "black",color:"white", width: "30%" }}>
                  Địa chỉ
                </th>
                <th style={{ backgroundColor: "black",color:"white", width: "15%" }}>
                  Công việc
                </th>
                <th style={{ backgroundColor: "black",color:"white", width: "10%" }}>
                  Số điện thoại
                </th>
              </tr>
            </thead>
            <tbody>
              {employeeList.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
                    Không tìm thấy
                  </td>
                </tr>
              ) : (
                employeeList.map((employee, index) => (
                  <tr
                    key={employee.id}
                    onClick={() => {
                      const isSelected = selectedEmployees.find(
                        (e) => e.id === employee.id
                      );

                      if (isSelected) {
                        const updatedEmployee = selectedEmployees.filter(
                          (e) => e.id !== employee.id
                        );
                        setSelectedEmployees(updatedEmployee);
                      } else {
                        const updatedEmployee = [
                          ...selectedEmployees,
                          employee,
                        ];
                        setSelectedEmployees(updatedEmployee);
                      }
                    }}
                    className={
                      selectedEmployees.some((e) => e.id === employee.id)
                        ? "selectedphuoc"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{employee.employeeName}</td>
                    <td>
                      <img
                        src={employee.employeeImage}
                        alt={"không có ảnh"}
                        height="47.5"
                        width="40"
                        style={{
                          borderRadius: "100px",
                          marginRight: "3px",
                        }}
                      />
                    </td>
                    <td>
                      {format(
                        parseISO(employee.employeeBirthday),
                        "dd-MM-yyyy"
                      )}
                    </td>
                    <td>{employee.employeeAddress}</td>
                    <td>{employee.employeeTypeName}</td>
                    <td>{employee.employeePhone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* java script để chọn row */}
        {/* java script để chọn row */}
        <div className="d-flex col-12 mt-3">
          <Link to={"/admin/admin/employee/create"}>
            <button type="button" className="btn btn-outline-primary me-1">
              Thêm mới
            </button>
          </Link>
          {totalElement > 0 && (
            <>
           
              <div className="col float-start">
                {selectedEmployees.length <= 1 && 
                <button
                  type="button"
                  className="btn btn-outline-success me-1"
                  onClick={() => handleUpdate()}
                >
                  Cập nhật
                </button>
          }
                
                <button
                  type="button"
                  className="btn btn-outline-danger me-1"
                  onClick={() => showModalDelete()}
                >
                  Xóa
                </button>

                {selectedEmployees.length >= 2 && (
                                    <a className="me-1">
                                        <button onClick={() => setSelectedEmployees([])} type="button"
                                            className="btn btn-outline-secondary">Hủy Chọn
                                        </button>
                                    </a>
                                )}
              </div>
            </>
          )}

          {totalPage > 1 && (
            <>
              <div className="col-auto float-end">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        onClick={() => setPage(0)}
                        className={`page-link ${page <= 0 ? "disabled" : ""}`}
                      >
                        Đầu
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        onClick={() => previousPage()}
                        className={`page-link ${page <= 0 ? "disabled" : ""}`}
                      >
                        Trước
                      </button>
                    </li>
                    <li className="page-item" aria-current="page">
                      <a className="page-link" href="#">
                        {page + 1}/{totalPage}
                      </a>
                    </li>
                    <li className="page-item">
                      <button
                        onClick={() => nextPage()}
                        className={`page-link ${
                          page >= totalPage - 1 ? "disabled" : ""
                        }`}
                      >
                        Sau
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        onClick={() => setPage(totalPage - 1)}
                        className={`page-link ${
                          page >= totalPage - 1 ? "disabled" : ""
                        }`}
                      >
                        Cuối
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
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
