import { useEffect, useState } from "react"
import { getAllWarehouse } from "../../service/warehouse/WarehouseService"
import { Link } from "react-router-dom"
import HeaderAdmin from "../user/HeaderAdmin"
import "../product/table_quan.css"
import Footer from "../home/common/Footer"

export function Warehouse() {
  const [warehouse, setWarehouse] = useState([])
  const [choose, setChoose] = useState("name")
  const [value, setValue] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const vnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const getAll = async () => {
    const res = await getAllWarehouse(sort, choose, value, page)
    console.log("Res:", res);
    setWarehouse(res.content)
    setTotalPages(res.totalPages)
    setTotalElements(res.totalElements)
  }
  useEffect(() => {
    getAll();
  }, [page])

  return (
    <>
      <HeaderAdmin />
      <div className="container mt-5 pt-5">
        <div className="col-12 d-flex justify-content-center my-3">
          <h1>Quản lý nhập kho</h1>
        </div>
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-end">
            <div className="col-auto me-2">
              <select className="form-select" onChange={(event) => setSort(event.target.value)}>
                <option value="">--Sắp xếp theo--</option>
                <option value="name">Tên</option>
                <option value="price">Đơn giá</option>
                <option value="quantity">Số lượng</option>
                <option value="supplier">Nhà cung cấp</option>
                <option value="inputDate">Ngày nhập kho</option>
              </select>
            </div>
            <div className="col-auto me-2">
              <select className="form-select" onChange={(event) => setChoose(event.target.value)}>
                <option value="name">Tên</option>
                <option value="price">Đơn giá</option>
                <option value="quantity">Số lượng</option>
                <option value="supplier">Nhà cung cấp</option>
              </select>
            </div>
            <div className="col-auto me-2">
              {choose === "price" && (
                <select onChange={event => setValue(event.target.value)} className="form-select"
                  name="price" id="price">
                  <option value="">--Chọn giá--</option>
                  <option value="smaller 5m">Dưới 5 triệu</option>
                  <option value="5m to 10m">5 đến 10 triệu</option>
                  <option value="better 10m">Trên 10 triệu</option>
                </select>
              )}
              {choose === "quantity" && (
                <select onChange={event => setValue(event.target.value)} className="form-select"
                  name="quantity" id="quantity">
                  <option value="">--Chọn số lượng--</option>
                  <option value="smaller 50">Dưới 50</option>
                  <option value="50 to 200">Từ 50 đến 200</option>
                  <option value="better 200">Trên 200</option>
                </select>)}
              {choose === "supplier" && (
                <input name="supplier" id="supplier" className="form-control"
                  onChange={(event => setValue(event.target.value))} type="search"
                  aria-label="Search" />
              )}
              {choose === "name" && (
                <input name="name" id="name" className="form-control"
                  onChange={(event => setValue(event.target.value))} type="search"
                  aria-label="Search" />
              )}
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-primary text-center" onClick={() => { setPage(0); getAll() }} type="button">Tìm kiếm</button>
            </div>
          </div>
        </div>
        <div style={{ minHeight: "455px" }} id="QuanND">
          <table className="shadow w-100">
            <thead style={{color: "white"}}>
              <tr style={{ background: "black" }}>
                <th style={{ background: "black" }}>#</th>
                <th style={{ background: "black" }}>Ngày</th>
                <th style={{ background: "black" }}>Tên hàng</th>
                <th style={{ background: "black" }}>Màu sắc</th>
                <th style={{ background: "black" }}>Lưu trữ</th>
                <th style={{ background: "black" }}>Tên nhà cung cấp</th>
                <th style={{ background: "black" }}>Số lượng</th>
                <th style={{ background: "black" }}>Đơn giá</th>
                <th style={{ background: "black" }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {
                warehouse.map((w, index) => (
                  <tr key={w.id} style={{ height: 40 }}>
                    <td style={{ width: "4%" }}>{(index + 1) + page * 10}</td>
                    <td style={{ width: "8%" }}>{w.inputDate}</td>
                    <td style={{ width: "18%" }}>{truncateText(w.nameProduct,30)}</td>
                    <td style={{ width: "8%" }}>{w.color}</td>
                    <td style={{ width: "8%" }}>{w.capacity}</td>
                    <td style={{ width: "25%" }}>{truncateText(w.nameSupplier,40)}</td>
                    <td style={{ width: "7%" }}>{w.quantity}</td>
                    <td style={{ width: "9%" }}>{vnd.format(w.priceProduct)}</td>
                    <td style={{ width: "10%" }}>{vnd.format(w.totalPrice)}</td>
                  </tr>
                ))
              }
              {!totalElements && (
                <tr>
                  <td colSpan={8}>
                    <p style={{ textAlign: "center", color: "red" }}>Không tìm thấy</p>
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
        <div className="row d-flex justify-content-around my-3">
          <div className="col float-start">
            <Link className="me-1  " to="/admin/ware/warehouse/import/0" style={{ textDecoration: 'none' }}>
              <button type="button" className="btn btn-outline-primary">Nhập sản phẩm</button>
            </Link>
          </div>
          {totalPages > 1 && (
            <div className="col-auto float-end">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                    onClick={() => setPage(0)} tabIndex="-1"
                    aria-disabled="true">Đầu</a>
                </li>
                <li className="page-item">
                  <a className={`page-link ${page <= 0 ? "disabled" : ""}`}
                    onClick={() => setPage(page - 1)} tabIndex="-1"
                    aria-disabled="true">Trước</a>
                </li>
                <li className="page-item" aria-current="page">
                  <a className="page-link" href="#">{page + 1}/{totalPages}</a>
                </li>
                <li className="page-item">
                  <a className={`page-link ${page >= totalPages - 1 ? "disabled" : ""}`}
                    onClick={() => setPage(page + 1)}>Sau</a>
                </li>
                <li className="page-item">
                  <a className={`page-link ${page >= totalPages - 1 ? "disabled" : ""}`}
                    onClick={() => setPage(totalPages - 1)}>Cuối</a>
                </li>

              </ul>
            </div>)}
        </div>
      </div>
      <Footer />
    </>
  )
}