import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findProductById, findSupplierById, importProduct } from "../../service/warehouse/WarehouseService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../../css/warehouse/warehouse.css"
import * as Yup from "yup";
import ProductChooseModal from "../modal/ProductChooseModal";
import SupplierChooseModal from "./SupplierChooseModal";
import HeaderAdmin from "../user/HeaderAdmin";

export function ImportProduct() {
  const navigate = useNavigate();
  const [supplierId, setSupplier] = useState(null)
  const [productId, setProduct] = useState()
  // const getProduct = async (id) => {
  //   const res = await findProductById(id)
  //   setProduct(res);
  // }
  // const getSupplier = async (id) => {
  //   const res = await findSupplierById(id)
  //   setSupplier(res); 
  // }
  const findSupplier = async (id) => {
    const res = await findSupplierById(id);
    console.log("ré", res);
    setSupplier(res)
  }
  const findProduct = async (id) => {
    const res = await findProductById(id);
    console.log("ré", res);
    setProduct(res)
  }
  const handleDataByChooseSupplier = (data) => {
    findSupplier(data);
  }
  const handleDataByChooseProduct = (data) => {
    findProduct(data);
  }


  const addWarehouse = async (value, setErrors) => {
    const newValue = {
      ...value,
      productId: productId.id,
      supplierId: supplierId.idSupplier
    }
    // alert(JSON.stringify(newValue))
    try {

      await importProduct(newValue);
      navigate("/admin/warehouse");
      toast("Nhập thêm sản phẩm thành công!");
    } catch (error) {
      console.log(error);
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
          // img: "dhdhđ",
          supplierId: supplierId ? supplierId.idSupplier : null,
          productId: productId ? productId.id : null
        }}
        validationSchema={Yup.object({
          quantity: Yup.number()
            .required("Vui lòng không bỏ trống số lượng")
            .min(1, "Số lượng phải lớn hơn 0")
            .max(2000, "Không được nhập quá 2000 sản phẩm"),
          // img: Yup.string().required(),
          // supplierId: Yup.object().required("Vui lòng chọn nhà cung cấp"),
          // productId: Yup.object().required("Vui lòng chọn sản phẩm")
        })}
        onSubmit={(values, {setErrors}) => {
          console.log("values:", values);
          const newSubmit = {
            ...values,
            productId: productId.id,
            supplierId: supplierId.idSupplier
          }
          console.log("submit:", newSubmit);
          console.log(setErrors);
          addWarehouse(newSubmit, setErrors);
        }}>
        <Form>
          <div className="mt-5 pt-5">
            <fieldset className="form-input-Phap shadow mx-auto" style={{ borderRadius: 20, border: '1px solid black', height: 'auto', width: '60%' }}>
              <legend className="float-none w-auto px-1">Nhập kho</legend>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }} data-bs-toggle="modal" data-bs-target="#exampleModalProduct">
                  Chọn hàng có sẵn
                </button>
                <Link to="#" className="btn btn-outline-primary col-6 mx-1" style={{ width: '30%' }}>Quét mã QR</Link>
              </div>
              <div>
                <div className="row p-2 mx-auto" style={{ width: '90%' }}>
                  <div className="col-4 p-2">
                    <label>Tên sản phẩm</label>
                  </div>
                  <div className="col-6 mb-2">
                    <Field className="form-control mt-2 border border-dark" value={productId?.name} name="product" type="text" readOnly />
                    <ErrorMessage className="text-danger" name="productId" component="span"></ErrorMessage>
                  </div>
                  <div className="col-4 p-2">
                    <label>Đơn giá</label>
                  </div>
                  <div className="col-6 mb-2">
                    <Field className="form-control mt-2 border border-dark" value={productId?.price} name="product" type="text" readOnly />

                  </div>
                  {/* <div className="col-4 p-2">
                    <label htmlFor="file-upload">
                      Hình ảnh
                    </label>
                  </div> */}
                  {/* <div className="col-6 mb-2">
                    <Field id="file-upload" type="image" name="img" src="" className="form-control mt-2 border border-dark" />
                    <ErrorMessage className="text-danger" name="img" component="span"></ErrorMessage>
                  </div> */}
                  <div className="col-4 p-2">
                    <label>Số lượng</label>
                  </div>
                  <div className="col-6">
                    <Field className="form-control mt-2 border border-dark" name="quantity" type="number" />
                    <ErrorMessage className="text-danger" name="quantity" component="span"></ErrorMessage>
                  </div>
                  <div className="col-4 p-2">
                    <label>Nhà cung cấp </label>
                  </div>
                  <div className="col-4 mb-2">
                    <Field className="form-control mt-2 border border-dark" value={supplierId?.nameSupplier} name="supplier" type="text" readOnly />
                    <ErrorMessage className="text-danger" name="supplierId" component="span"></ErrorMessage>
                  </div>
                  <div className="col-4">
                    <button type="button" className="btn btn-outline-primary float-center mt-2 shadow" data-bs-toggle="modal" data-bs-target="#exampleModalSupplier">
                      Chọn NCC
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-outline-primary d-flex justify-content-center" style={{ width: '20%', marginTop: 10 }}>Lưu</button>
                    <Link to="/admin/warehouse" className="btn btn-outline-primary d-flex justify-content-center" style={{ width: '20%', marginTop: 10, marginLeft: 10 }}>Trở về</Link>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

        </Form>
      </Formik>
      {/* <ProductChooseModal data1={handleDataByChooseProduct} /> */}
      <ProductChooseModal data1={1} handleData={handleDataByChooseProduct} />
      <SupplierChooseModal handleData={handleDataByChooseSupplier} />
    </>
  )
}