import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findProductById, findSupplierById, importProduct } from "../../service/warehouse/WarehouseService";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../../css/warehouse/warehouse.css"
import * as Yup from "yup";
import ProductChooseModal from "../modal/ProductChooseModal";
import SupplierChooseModal from "./SupplierChooseModal";
import HeaderAdmin from "../user/HeaderAdmin";
import ProductChooseModalForWarehouse from "./ProductChooseModalForWarehouse";

export function ImportProduct() {
  const param = useParams()
  const navigate = useNavigate();
  const [supplierId, setSupplier] = useState(null)
  const [productId, setProduct] = useState()
  const vnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })

  const findSupplier = async (id) => {
    const res = await findSupplierById(id);
    console.log("res", res);
    setSupplier(res)
  }
  const findProduct = async (id) => {
    const res = await findProductById(id);
    console.log("res", res);
    setProduct(res)
  }
  const handleDataByChooseSupplier = (data) => {
    findSupplier(data);
  }
  const handleDataByChooseProductQR = (data) => {
    const productObj = JSON.parse(data);
    console.log(productObj);
    console.log(productObj.id);
    findProduct(productObj.id)
  }
  const handleDataByChooseProduct = (data) => {
    findProduct(data)
  }

  useEffect(() => {
    handleDataByChooseProductQR(param.product)
  }, [])


  const addWarehouse = async (value, setErrors) => {
    try {
    const newValue = {
      ...value,
      productId: productId.id,
      supplierId: supplierId.idSupplier
    }
    // alert(JSON.stringify(newValue))
      await importProduct(newValue);
      navigate("/admin/ware/warehouse");
      toast("Nhập thêm sản phẩm thành công!");
    } catch (error) {
      console.log("error:",error);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  }
  useEffect(() => {


  }, [])
  console.log("Supplier:", supplierId);

  return (
    <>
      <HeaderAdmin />
      <Formik
        initialValues={{
          quantity: 1,
          supplierId: supplierId ? supplierId.idSupplier : null,
          productId: productId ? productId.id : null
        }}
        validationSchema={Yup.object({
          quantity: Yup.number("ok")
            .integer("Vui lòng nhập số nguyên dương")
            .required("Vui lòng không bỏ trống số lượng")
            .min(1, "Số lượng phải lớn hơn 0")
            .max(2000, "Không được nhập quá 2000 sản phẩm")
        })}
        onSubmit={(values, { setErrors }) => {
          console.log("values:", values);
          if (!productId && !supplierId) {
            toast.error("Vui lòng chọn sản phẩm và nhà cung cấp");
            return;
          }else if(!productId){
            toast.error("Vui lòng chọn sản phẩm")
          }else if (!supplierId) {
            toast.error("Vui lòng chọn nhà cung cấp");
            return;
          }
          const newSubmit = {
            ...values,
            productId: productId.id,
            supplierId: supplierId.idSupplier
          }
          addWarehouse(newSubmit, setErrors);
        }}>
        <Form>
          <div className="mt-5 pt-5">
            <fieldset className="form-input-Phap shadow mx-auto"
              style={{ borderRadius: 20, border: '1px solid black', height: 'auto', width: '60%' }}>
              <legend className="float-none w-auto px-1">Nhập kho</legend>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-primary col-6 mx-1"
                  style={{ width: '30%' }} data-bs-toggle="modal"
                  data-bs-target="#exampleModalProduct">
                  Chọn hàng có sẵn
                </button>
                <Link to="/admin/ware/scanner-qr" className="btn btn-outline-primary col-6 mx-1"
                  style={{ width: '30%' }}>Quét mã QR</Link>
              </div>
              <div>
                <div className="row p-2 mx-auto" style={{ width: '90%' }}>
                  <div className="col-4 p-2">
                    <label>Tên sản phẩm <span style={{ color: "red" }}>*</span></label>
                  </div>
                  <div className="col-6 mb-2">
                    <Field className="form-control mt-2 border border-dark" value={productId?.name}
                      name="product" type="text" readOnly />
                    <ErrorMessage className="text-danger" name="productId"
                      component="span"></ErrorMessage>
                  </div>
                  <div className="col-4 p-2">
                    <label>Đơn giá <span style={{ color: "red" }}>*</span></label>
                  </div>
                  <div className="col-6 mb-2">
                    <Field className="form-control mt-2 border border-dark" value={productId?.price ? vnd.format(productId?.price): null}
                      name="product" type="text" readOnly />

                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="file-upload">
                      Hình ảnh <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-6 mb-2">
                    {productId?.image ? (
                    <img
                      alt=""
                      src={productId?.image}
                      style={{
                        width: "170px",
                        height: "200px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        border: "1px solid black"
                      }} />
                    ): (
                      <img
                        alt=""
                        src="https://i.pinimg.com/564x/e8/03/d1/e803d189c1a961c2b404641ea477128c.jpg"
                        style={{
                          width: "170px",
                          height: "200px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          border: "1px solid black"
                        }}
                      />
                    )}
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="quantity">Số lượng <span style={{ color: "red" }}>*</span></label>
                  </div>
                  <div className="col-6">
                    <Field className="form-control mt-2 border border-dark" name="quantity"
                      type="number" id="quantity" />
                    <ErrorMessage className="text-danger" name="quantity"
                      component="span"></ErrorMessage>
                  </div>
                  <div className="col-4 p-2">
                    <label>Nhà cung cấp <span style={{ color: "red" }}>*</span></label>
                  </div>
                  <div className="col-4 mb-2">
                    <Field className="form-control mt-2 border border-dark" placeholder="Chọn nhà cung cấp"
                      value={supplierId?.nameSupplier} name="supplier" type="text" readOnly />
                    <ErrorMessage className="text-danger" name="supplierId"
                      component="span"></ErrorMessage>
                  </div>
                  <div className="col-4">
                    <button type="button"
                      className="btn btn-outline-primary float-center mt-2 shadow"
                      data-bs-toggle="modal" data-bs-target="#exampleModalSupplier">
                      Chọn NCC
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-outline-primary d-flex justify-content-center" type="submit"
                      style={{ width: '20%', marginTop: 10 }}>Lưu
                    </button>
                    <Link to="/admin/ware/warehouse"
                      className="btn btn-outline-primary d-flex justify-content-center"
                      style={{ width: '20%', marginTop: 10, marginLeft: 10 }}>Trở về</Link>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="float-end">
                      <small className="text-danger">(*)</small> Thông tin bắt buộc
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

        </Form>
      </Formik>
      <ToastContainer/>
      <ProductChooseModalForWarehouse data1={1} handleData={handleDataByChooseProduct} />
      <SupplierChooseModal handleData={handleDataByChooseSupplier} />
    </>
  )
}