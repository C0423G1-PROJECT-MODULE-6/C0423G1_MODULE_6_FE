import { useEffect, useState } from "react"
import { getAllWarehouse } from "../../service/warehouse/WarehouseService"
import { Link } from "react-router-dom"

export function Warehouse() {
    const [warehouse, setWarehouse] = useState([])
    const getAll = async () => {
        const res = await getAllWarehouse()
        setWarehouse(res)
    }
    useEffect(() => {
            getAll();
    },[])

    return (
       <div className="container mt-5 pt-5">
  <div className="col-12 d-flex justify-content-center my-3">
    <h1>Quản lý nhập kho</h1>
  </div>
  <div className="row my-3">
    <div className="col-12 d-flex justify-content-end">
      <div className="col-auto me-2">
        <select className="form-select">
          <option selected>--Sắp xếp theo--</option>
          <option>Tên</option>
          <option>Ngày</option>
          <option>Đơn giá</option>
          <option>Số lượng</option>
        </select>
      </div>
      <div className="col-auto me-2">
        <select className="form-select">
          <option selected>--Tìm kiếm theo--</option>
          <option>Tên</option>
          <option>Ngày</option>
          <option>Đơn giá</option>
          <option>Nhà cung cấp</option>
        </select>
      </div>
      <div className="col-auto me-2">
        <input className="form-control" type="search" aria-label="Search" />
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-primary text-center" type="button">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <table className="border border-dark table table-hover">
    <thead style={{background: 'darkgrey'}}>
      <tr>
        <th>#</th>
        <th>Ngày</th>
        <th>Tên hàng</th>
        <th>Tên nhà cung cấp</th>
        <th>Số lượng nhập</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
      </tr>
    </thead>
    <tbody>
      {
        warehouse.map((w, index) => (
            <tr key={w.id}>
                <td>{index+1}</td>
                <td>{w.inputDate}</td>
                <td>{w.nameProduct}</td>
                <td>{w.nameSupplier}</td>
                <td>{w.quantity}</td>
                <td>{w.priceProduct}</td>
                <td>{w.totalPrice}</td>
            </tr>
        ))
      }
    </tbody>
  </table>
  <div className="row d-flex justify-content-around my-3">
    <div className="col float-start">
      <Link className="me-1  " to="/admin/warehouse/import" style={{textDecoration: 'none'}}>
        <button type="button" className="btn btn-outline-primary">Nhập sản phẩm</button>
      </Link>
    </div>
    <div className="col-auto float-end">
      <ul className="pagination mb-0">
        <li className="page-item">
          <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Trước</a>
        </li>
        <li className="page-item" aria-current="page">
          <a className="page-link" href="#">1/10</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">Sau</a>
        </li>
      </ul>
    </div>
  </div>
</div>

    )
}