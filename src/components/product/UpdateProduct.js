import {useEffect, useRef, useState} from "react";
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
                navigate("/admin/product/list")
                toast("Không tìm thấy sản phẩm!")
            }
            setProduct(result);
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
            toast.success(`Cập nhật sản phẩm ${product1.nameProduct} thành công!`);
        } catch (error) {
            console.log(error);
        }

    }
    const removeImg = (index) => {
        setImageUpload((pre) => pre.filter((e, i) => i !== index));
    }
    const handleInputChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        if (file.size > 3000000) {
            toast("Dung lượng ảnh tối đa 3MB")
            return;
        }
        setImageUpload((prev) => [...prev, file]);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
        }
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
                            .required("Không để trống tên sản phẩm!")
                            .max(70, "Tên sản phẩm quá dài, nhập tên không quá 70 ký tự!")
                            .min(5, "Vui lòng nhập tên hơn 5 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Tên sản phẩm không chứa ký tự đặc biệt!")
                        ,
                        screenProduct: Yup.string()
                            .required("Không để trống màn hình sản phẩm!")
                            .max(50, "Thông tin màn hình quá dài, vui lòng nhập ít hơn 50 ký tự!")
                            .min(5, "Thông tin màn hình phải hơn 5 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin màn hình khng chứa ký tự đặc biệt!")
                        ,
                        cameraProduct: Yup.string()
                            .required("Không để trống camera sảm phẩm!")
                            .max(100, "Thông tin camera quá dài, vui lòng nhập không quá 100 ký tự!")
                            .min(5, "Thông tin camera sản phẩm dài hơn 5 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin camera không chứa ký tự đặc biệt!")
                        ,
                        descriptionProduct: Yup.string()
                            .min(0)
                            .max(1000000, "Thông tin chi tiết sản phẩm quá dài, vui lòng nhập dưới 1.000.000 ký tự!")
                        ,
                        selfieProduct: Yup.string()
                            .required("Vui lòng bổ sung thông tin selfie!")
                            .min(5, "Thông tin selfie quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin selfie quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin selfie không chứa ký tự đặc biệt!")
                        ,
                        batteryProduct: Yup.string()
                            .required("Không để trống thông tin pin!")
                            .min(5, "Thông tin pin quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin pin quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin pin không chứa ký tự đặc biệt!")
                        ,
                        weightProduct: Yup.string()
                            .required("Không để trống thông tin trọng lượng!")
                            .min(5, "Thông tin trọng lượng quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin trọng lượng quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin trọng lượng không đúng định dạng!")
                        ,
                        priceProduct: Yup.number()
                            .typeError("Thông tin giá không đúng định dạng!")
                            .required("Vui lòng bổ sung thông tin giá!")
                            .min(0, "Giá không được là số âm!")
                            .max(300000000, "Giá không quá 300.000.000")
                    })}
                    onSubmit={(values, {setSubmitting, setErrors}) => {
                        setSubmitting(true)
                        add(values, setErrors);
                    }}>

                    <div className="row p-2 mt-3 container" style={{marginLeft: 110}}>
                        <div className="col-6 justify-content-center" style={{marginTop: "9%"}}>
                            <fieldset
                                className="form-input-dao shadow"
                                style={{width: 600, height: 480}}
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
                                                    className="image-gap mx-2 mb-2
                                                    "
                                                    style={{
                                                        margin: "0px 8px 8px",
                                                        width: "150px",
                                                        height: "100px",
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
                                                <label>
                                                    Tên sản phẩm<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Giá<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Kích thước <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Dung lượng Pin<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Camera sau <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Camera trước <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Trọng lượng<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
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
                                                <label>
                                                    Số lượng <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    name="quantityProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="number"
                                                    style={{width: 270, height: 27.6}}
                                                    readOnly
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage name="priceProduct" className="p-3 mb-2 text-danger"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-6">
                                                <label>
                                                    Dung lượng<span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                <label>
                                                    Màu sắc <span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                <label>
                                                    Cpu <span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                <label>
                                                    Ram <span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                <label>
                                                    Series <span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                <label>
                                                    Loại sản phẩm<span style={{color: "red"}}>*</span></label>
                                                <Field
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
                                                accept="image/png, image/gif, image/jpeg"
                                                ref={inputFileRef}
                                                onChange={handleInputChange}
                                                multiple=""/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Mô tả thêm </label>
                                        </div>
                                        <div>
                                            <Field
                                                className="form-control-dao mt-2 border border-dark"
                                                name="descriptionProduct"
                                                component={CKEditorComponent}
                                                // style={{width: 540, height: 90}}
                                            />
                                        </div>
                                        <div className="col-4 p-2 mt-3">
                                            <NavLink
                                                to={"/admin/product/list"}
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
        </>
)

}

export default UpdateProduct;