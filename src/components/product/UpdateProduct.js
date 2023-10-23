import React, {useEffect, useRef, useState} from "react";
import * as productService from "../../service/product/ProductService";
import {storage} from "../../firebase/Firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {toast} from "react-toastify";
import "../../css/product/CreateProduct.css"
import HeaderAdmin from "../user/HeaderAdmin";
import {v4} from "uuid";
import CKEditorComponent from "./CKEditorComponent";
import Footer from "../home/common/Footer";

function randomString(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function UpdateProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [capacitys, setCapacity] = useState([]);
    const [colors, setColor] = useState([]);
    const [cpus, setCpu] = useState([]);
    const [rams, setRam] = useState([]);
    const [series, setSeries] = useState([]);
    const [types, setType] = useState([]);
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState([]);
    const params = useParams();

    const getListCapacity = async () => {
        const result = await productService.getAllCapacity();
        setCapacity(result);
    }

    const getListColor = async () => {
        const result = await productService.getAllColor();
        setColor(result);
    }

    const getListCpu = async () => {
        const result = await productService.getAllCpu();
        setCpu(result);
    }

    const getListRam = async () => {
        const result = await productService.getAllRam();
        setRam(result);
    }

    const getListSeries = async () => {
        const result = await productService.getAllSeries();
        setSeries(result);
    }

    const getListType = async () => {
        const result = await productService.getAllType();
        setType(result);
    }

    const loadProductDetail = async (id) => {
        try {
            const result = await productService.getProductId(id)
            if (result == null) {
                navigate("/admin/business/product/list")
                toast("Không tìm thấy sản phẩm.")
            }
            setProduct(result);
            console.log(result);
            setImageUpload(result.imageDtoList)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListCapacity();
        getListColor();
        getListCpu();
        getListRam();
        getListSeries();
        getListType();
    }, [])

    useEffect(() => {
        loadProductDetail(params.id);
    }, [params.id]);

    const add = async (product, setErrors) => {
        let listImgPath = imageUpload.filter((pre) => typeof pre === "string");
        let listFileImg = imageUpload.filter((pre) => typeof pre !== "string");
        try {
            const uploadPromises = listFileImg.map(async (image) => {
                const imageRef = ref(storage, `product/${image.name + v4() + randomString(10)}`);
                const snapshot = await uploadBytes(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                return url;
            });

            const downloadUrls = await Promise.all(uploadPromises);
            listImgPath = [...listImgPath, ...downloadUrls]

        } catch (error) {
            console.error("Lỗi khi tải lên ảnh:", error);
        }
        try {
            const product1 = {
                ...product,
                idProduct: params.id,
                capacityDto: (typeof product?.capacityDto == "string") ? JSON.parse(product?.capacityDto) : product?.capacityDto,
                colorDto: (typeof product?.capacityDto == "string") ? JSON.parse(product?.colorDto) : product?.colorDto,
                cpuDto: (typeof product?.cpuDto == "string") ? JSON.parse(product?.cpuDto) : product?.cpuDto,
                ramDto: (typeof product?.ramDto == "string") ? JSON.parse(product?.ramDto) : product?.ramDto,
                seriesDto: (typeof product?.seriesDto == "string") ? JSON.parse(product?.seriesDto) : product?.seriesDto,
                typeDto: (typeof product?.typeDto == "string") ? JSON.parse(product?.typeDto) : product?.typeDto,
                imageDtoList: listImgPath
            }
            await productService.updateProduct(params.id, product1);
            await navigate("/admin/product/list");
            await toast(`Cập nhật sản phẩm ${product.nameProduct} thành công.`)
        } catch (error) {
            console.log(error);
        }
    
    }
    const removeImg = (index) => {
        setImageUpload((pre) => pre.filter((e, i) => i !== index));
    }

    const handleInputChange = (event) => {
        const files = event.target.files;
        const maxImageCount = 5;
        const allowedFormats = ["image/png", "image/gif", "image/jpeg", "image/webp"];

        const newImages = Array.from(files).filter((file) => {
            if (imageUpload.map((img) => img.name).includes(file.name)) {
                toast(`Ảnh "${file.name}" đã được chọn trước đó.`);
                return false;
            }

            if (imageUpload.length >= maxImageCount) {
                toast(`Vui lòng không chọn quá ${maxImageCount} ảnh.`);
                return false;
            }

            if (!allowedFormats.includes(file.type)) {
                toast("Vui lòng chọn chỉ các tệp hình ảnh (JPEG, PNG, WEBP hoặc GIF).");
                return false;
            }

            return true;
        });

        newImages.forEach((file) => {
            setImageUpload((prev) => [...prev, file]);
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                imgPreviewRef.current.src = reader.result;
                imgPreviewRef.current.style.display = "block";
            });
            reader.readAsDataURL(file);
        });
    };

    if (!product) return null;
    return (
        <>
            <HeaderAdmin/>
            <div id="anhdao" className="pt-5">
                <Formik
                    initialValues={{
                        nameProduct: product?.nameProduct,
                        screenProduct: product?.screenProduct,
                        cameraProduct: product?.cameraProduct,
                        descriptionProduct: product?.descriptionProduct,
                        selfieProduct: product?.selfieProduct,
                        batteryProduct: product?.batteryProduct,
                        weightProduct: product?.weightProduct,
                        priceProduct: product?.priceProduct,
                        quantityProduct: product?.quantityProduct,
                        capacityDto: product?.capacityDto,
                        colorDto: product?.colorDto,
                        cpuDto: product?.cpuDto,
                        ramDto: product?.ramDto,
                        seriesDto: product?.seriesDto,
                        typeDto: product?.typeDto,
                        imageDto: {
                            name: "",
                        }
                    }}
                    validationSchema={Yup.object({
                        nameProduct: Yup.string()
                            .required("Không để trống tên sản phẩm.")
                            .max(70, "Nhập tên không quá 70 ký tự.")
                            .min(5, "Vui lòng nhập tên hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Tên sản phẩm không chứa ký tự đặc biệt.")
                        ,
                        screenProduct: Yup.string()
                            .required("Không để trống màn hình sản phẩm.")
                            .max(50, "Vui lòng nhập ít hơn 50 ký tự.")
                            .min(5, "Thông tin màn hình phải hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        cameraProduct: Yup.string()
                            .required("Không để trống camera sảm phẩm.")
                            .max(100, "Vui lòng nhập không quá 100 ký tự.")
                            .min(5, "Thông tin camera sản phẩm dài hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        descriptionProduct: Yup.string()
                            .min(0)
                            .max(1000000, "Thông tin chi tiết sản phẩm quá dài, vui lòng nhập dưới 1.000.000 ký tự.")
                        ,
                        selfieProduct: Yup.string()
                            .required("Vui lòng bổ sung thông tin selfie.")
                            .min(5, "Vui lòng nhập hơn 5 ký tự.")
                            .max(100, "Vui lòng nhập ít hơn 100 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        batteryProduct: Yup.string()
                            .required("Không để trống thông tin pin.")
                            .min(5, "Vui lòng nhập hơn 5 ký tự.")
                            .max(100, "Vui lòng nhập ít hơn 100 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        weightProduct: Yup.string()
                            .required("Không để trống thông tin trọng lượng.")
                            .min(5, "Vui lòng nhập hơn 5 ký tự.")
                            .max(100, "Vui lòng nhập ít hơn 100 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không đúng định dạng.")
                        ,
                        priceProduct: Yup.number()
                            .typeError("Thông tin giá không đúng định dạng.")
                            .required("Vui lòng bổ sung thông tin giá.")
                            .min(0, "Giá không được là số âm.")
                            .max(300000000, "Giá không quá 300.000.000")
                    })}
                    onSubmit={(values, {setSubmitting, setErrors}) => {
                        setSubmitting(true);
                        add(values, setErrors);
                    }}>

                    <div className="p-2 mt-3 container" style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <div className="col-6">
                            <fieldset
                                className="form-input-dao shadow"
                                style={{width: 600, minHeight:"450px"}}
                            >
                                <legend className="float-none w-auto px-3">
                                    <h2>Ảnh hàng hóa đã chọn</h2>
                                </legend>
                                <div id="upload-img" className="mt-2 ">
                                    {imageUpload ? imageUpload.map((img, index) => {
                                        return (
                                            <div className="float-start ">
                                                <div className=" h-100 d-flex justify-content-end w-100 pe-2">
                                                    <div onClick={() => removeImg(index)}>
                                                        <i className="fa-solid fa-circle-minus"
                                                           style={{color: "#d71c0f"}}></i>
                                                    </div>
                                                </div>
                                                <img
                                                    alt=""
                                                    src={img}
                                                    ref={imgPreviewRef}
                                                    className="image-gap mx-2 mb-2"
                                                    style={{
                                                        padding:"10px",
                                                        margin: "0px 8px 8px",
                                                        width: "160px",
                                                        height: "160px",
                                                        borderRadius: "10px",
                                                        objectFit: "cover",
                                                        border: "1px solid black"
                                                    }}/>

                                            </div>
                                        )
                                    }) : null}
                                </div>
                            </fieldset>
                        </div>
                        <div className="d-flex justify-content-center col-6  float-end">
                            <Form>
                                <fieldset className="form-input-dao shadow">
                                    <legend className="float-none w-auto px-3">
                                        <h2>Chỉnh sửa thông tin hàng hóa</h2>
                                    </legend>
                                    <div className="row p-2">
                                        <div className="row">
                                            <div className="col-6 ">
                                                <label htmlFor={"1"}>
                                                    Tên sản phẩm<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"1"}
                                                    name="nameProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="nameProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor={"2"}>
                                                    Giá<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"2"}
                                                    className="form-control-dao mt-2 border border-dark"
                                                    name="priceProduct"
                                                    type="number"
                                                    style={{width: 270, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="priceProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"3"}>
                                                    Kích thước <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"3"}
                                                    name="screenProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div style={{ height: "16px" , marginTop:"2%", marginBottom:"2%"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="screenProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"4"}>
                                                    Dung lượng Pin<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"4"}
                                                    name="batteryProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="batteryProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor={"5"}>
                                                    Camera sau <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"5"}
                                                    name="cameraProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="cameraProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor={"6"}>
                                                    Camera trước <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"6"}
                                                    name="selfieProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="selfieProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor={"7"}>
                                                    Trọng lượng<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"7"}
                                                    name="weightProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="weightProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor={"8"}>
                                                    Số lượng <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"8"}
                                                    name="quantityProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="number"
                                                    style={{width: 270, height: 27.6}}
                                                    readOnly
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage name="quantityProduct" className="p-3 mb-2 text-danger"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-6">
                                                <label htmlFor={"9"}>
                                                    Dung lượng</label>
                                                <Field
                                                    id={"9"}
                                                    name="capacityDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn dung lượng điện thoại</option>
                                                    {
                                                        capacitys.map((capacity) => (
                                                            <option key={capacity.idCapacity}
                                                                    value={JSON.stringify(capacity)}>{capacity.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor={"10"}>
                                                    Màu sắc </label>
                                                <Field
                                                    id={"10"}
                                                    name="colorDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn màu sắc điện thoại</option>
                                                    {
                                                        colors.map((color) => (
                                                            <option key={color.idColor}
                                                                    value={JSON.stringify(color)}>{color.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"11"}>
                                                    Cpu </label>
                                                <Field
                                                    id={"11"}
                                                    name="cpuDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn cpu điện thoại</option>
                                                    {
                                                        cpus.map((cpu) => (
                                                            <option key={cpu.idCpu}
                                                                    value={JSON.stringify(cpu)}>{cpu.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"12"}>
                                                    Ram </label>
                                                <Field
                                                    id={"12"}
                                                    name="ramDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn Ram điện thoại</option>
                                                    {
                                                        rams.map((ram) => (
                                                            <option key={ram.idRam}
                                                                    value={JSON.stringify(ram)}>{ram.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"13"}>
                                                    Series </label>
                                                <Field
                                                    id={"13"}
                                                    name="seriesDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn Series điện thoại</option>
                                                    {
                                                        series.map((seriess) => (
                                                            <option key={seriess.idSeries}
                                                                    value={JSON.stringify(seriess)}>{seriess.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"14"}>
                                                    Loại sản phẩm </label>
                                                <Field
                                                    id={"14"}
                                                    name="typeDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250, height: 27.6}}>
                                                    <option value="" disabled>Chọn loại điện thoại</option>
                                                    {
                                                        types.map((type) => (
                                                            <option key={type.idType}
                                                                    value={JSON.stringify(type)}>{type.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="form-label" htmlFor="inputGroupFile01">Chọn ảnh</label>
                                        </div>
                                        <div>
                                            <Field
                                                type="file"
                                                name="imageDto.name"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon03"
                                                aria-label="Upload"
                                                accept="image/png, image/gif, image/jpeg, image/webp"
                                                ref={inputFileRef}
                                                onChange={handleInputChange}
                                                multiple=""/>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={"15"}>Mô tả thêm </label>
                                        </div>
                                        <div>
                                            <Field
                                                id={"15"}
                                                className="form-control-dao mt-2 border border-dark"
                                                name="descriptionProduct"
                                                component={CKEditorComponent}
                                            />
                                        </div>s
                                        <div className="col-4 p-2 mt-3">
                                            <NavLink
                                                to={"/admin/business/product/list"}
                                                className="btn btn-outline-secondary float-end mx-2 mt-2 shadow">
                                                Trở về
                                            </NavLink>
                                            <button type="submit"
                                                    className="btn btn-outline-primary float-end mx-3 mt-2 shadow">
                                                Lưu
                                            </button>
                                        </div>
                                        <div className="col-8 mt-5">
                                            <div className="float-end">
                                                <small className="text-danger">(*)</small> Thông tin bắt buộc
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </Form>
                        </div>
                    </div>

                </Formik>
            </div>
            <Footer/>
        </>
)

}

export default UpdateProduct;