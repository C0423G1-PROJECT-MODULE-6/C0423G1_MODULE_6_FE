import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findProductById, findSupplierById, importProduct } from "../../service/warehouse/WarehouseService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../../css/warehouse/warehouse.css"
import * as Yup from "yup";
import ProductChooseModal from "../modal/ProductChooseModal";

export function ImportProduct () {
const navigate = useNavigate();
const param = useParams();
const [supplier, setSupplier] = useState({})
const [product, setProduct] = useState({})
    const getSupplier = async () => {
        const res = await findSupplierById(param.id)
        setSupplier(res)
    }
    const getProduct = async () => {
        const res = await findProductById(param.id)
        setProduct(res)
    }
const addWarehouse = async (value) => {
    await importProduct(value)
    navigate("/warehouse")
    toast("Nhập thêm sản phẩm thành công!")
}
useEffect(() => {
    getProduct()
    getSupplier()
},[param])

    return(
        <>
        <Formik
        initialValues={{
            quantity:0,
            img: "",
            supplier,
            product
        }}
        validationSchema={Yup.object({
            quantity: Yup.number()
            .required("Vui lòng không bỏ trống số lượng")
            .min(0,"Số lượng phải lớn hơn 0")
            .max(2000,"Không được nhập quá 2000 sản phẩm"),
            img: Yup.string().required(),
            supplier: Yup.object().required("Vui lòng chọn nhà cung cấp"),
            product: Yup.object().required("Vui lòng chọn sản phẩm")
        })}
        onSubmit={(values) => {
            addWarehouse(values)
        }}>
            <Form>
           <div className="mt-5">
  <fieldset className="form-input-Phap shadow mx-auto" style={{borderRadius: 20, border: '1px solid black', height: 'auto', width: '60%'}}>
    <legend className="float-none w-auto px-1">Nhập kho</legend>
    <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-outline-primary col-6 mx-1" style={{width: '30%'}} data-bs-toggle="modal" data-bs-target="#exampleModalProduct">
        Chọn hàng có sẵn
      </button>
      <button className="btn btn-outline-primary col-6 mx-1" style={{width: '30%'}}>Quét mã QR</button>
    </div>
    <div>
      <div className="row p-2 mx-auto" style={{width: '90%'}}>
        <div className="col-4 p-2">
          <label>Tên sản phẩm</label>
        </div>
        <div className="col-6 mb-2">
          <Field className="form-control mt-2 border border-dark" name="product" type="text" placeholder="Iphone 15" readOnly />
        </div>
        <div className="col-4 p-2">
          <label>Đơn giá</label>
        </div>
        <div className="col-6 mb-2">
          <Field className="form-control mt-2 border border-dark" name="product" type="text" placeholder="30.000.000" readOnly />
        </div>
        <div className="col-4 p-2">
          <label htmlFor="file-upload">
            Hình ảnh
          </label>
        </div>
        <div className="col-6 mb-2">
          <Field id="file-upload" type="image" name="img" src="" className="form-control mt-2 border border-dark" />
        </div>
        <div className="col-4 p-2">
          <label>Số lượng</label>
        </div>
        <div className="col-6">
          <Field className="form-control mt-2 border border-dark" name="quantity" placeholder={100} type="text" />
          <ErrorMessage name="quantity" component="span"></ErrorMessage>
        </div>
        <div className="col-4 p-2">
          <label>Nhà cung cấp </label>
        </div>
        <div className="col-4 mb-2">
          <Field className="form-control mt-2 border border-dark" name="supplier" placeholder="Apple inc." type="text" readOnly />
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-outline-primary float-center mt-2 shadow" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Chọn NCC
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-outline-primary d-flex justify-content-center" style={{width: '20%', marginTop: 10}}>Lưu</button>
          <Link to="/admin/warehouse" className="btn btn-outline-primary d-flex justify-content-center" style={{width: '20%', marginTop: 10, marginLeft: 10}}>Trở về</Link>
        </div>
      </div>
    </div>
  </fieldset>
</div>

            </Form>
        </Formik>
            <ProductChooseModal/>
        </>
    )
}