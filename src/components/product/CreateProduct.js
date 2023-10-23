import React, {useEffect, useRef, useState} from "react";
import * as productService from "../../service/product/ProductService";
import {storage} from "../../firebase/Firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {createProduct} from "../../service/product/ProductService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {NavLink, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {toast} from "react-toastify";
import "../../css/product/CreateProduct.css"
import HeaderAdmin from "../user/HeaderAdmin";
import CKEditorComponent from "./CKEditorComponent";
import Footer from "../home/common/Footer";

function CreateProduct() {
    const navigate = useNavigate();
    const [capacitys, setCapacity] = useState([]);
    const [colors, setColor] = useState([]);
    const [cpus, setCpu] = useState([]);
    const [rams, setRam] = useState([]);
    const [series, setSeries] = useState([]);
    const [types, setType] = useState([]);
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState([]);

    // const getImage = async () => {
    //     const result = await productService.getImageProduct();
    //     setImageUpload(result.imageDto.name)
    // };

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

    // useEffect(() => {
    //     getImage();
    // }, [])

    useEffect(() => {
        getListCapacity();
    }, [])
    useEffect(() => {
        getListColor();
    }, [])
    useEffect(() => {
        getListCpu();
    }, [])
    useEffect(() => {
        getListRam();
    }, [])
    useEffect(() => {
        getListSeries();
    }, [])
    useEffect(() => {
        getListType();
    }, []);

    const add = async (product, setErrors) => {
        let listImgPath = [];
        try {
            const uploadPromises = imageUpload.map(async (image) => {
                const imageRef = ref(storage, 'product/' + image.name);
                const snapshot = await uploadBytes(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                return url;
            });
            const downloadUrls = await Promise.all(uploadPromises);
            listImgPath = [...downloadUrls]
        } catch (error) {
            console.error("Lỗi khi tải lên ảnh:", error);
        }
        try {
            const product1 = {
                ...product,
                capacityDto: JSON.parse(product?.capacityDto),
                colorDto: JSON.parse(product?.colorDto),
                cpuDto: JSON.parse(product?.cpuDto),
                ramDto: JSON.parse(product?.ramDto),
                seriesDto: JSON.parse(product?.seriesDto),
                typeDto: JSON.parse(product?.typeDto),
                imageDtoList: listImgPath
            }
            await createProduct(product1, listImgPath);
            await navigate("/admin/business/product/list");
            await toast(`Thêm mới sản phẩm ${product.nameProduct} thành công!`)
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (event) => {
        const files = event.target.files;
        const maxImageCount = 5;
        const allowedFormats = ["image/png", "image/gif", "image/jpeg"];

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
                toast("Vui lòng chọn chỉ các tệp hình ảnh (JPEG, PNG, hoặc GIF).");
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

    return (
        <>
            <HeaderAdmin/>
            <div id="anhdao" className="pt-5">
                <Formik
                    initialValues={{
                        nameProduct: "",
                        screenProduct: "",
                        cameraProduct: "",
                        descriptionProduct: "",
                        selfieProduct: "",
                        batteryProduct: "",
                        weightProduct: "",
                        priceProduct: "",
                        quantityProduct: 0,
                        capacityDto: "",
                        colorDto: "",
                        cpuDto: "",
                        ramDto: "",
                        seriesDto: "",
                        typeDto: "",
                        imageDto: {
                            name: "",
                        }
                    }}
                    validationSchema={Yup.object({
                        nameProduct: Yup.string()
                            .required("Không để trống tên sản phẩm.")
                            .max(100, "Nhập tên không quá 70 ký tự.")
                            .min(3, "Vui lòng nhập tên hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Tên sản phẩm không chứa ký tự đặc biệt.")
                        ,
                        screenProduct: Yup.string()
                            .required("Không để trống màn hình sản phẩm.")
                            .max(100, "Vui lòng nhập ít hơn 50 ký tự.")
                            .min(3, "Thông tin màn hình phải hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        cameraProduct: Yup.string()
                            .required("Không để trống camera sảm phẩm.")
                            .max(100, "Vui lòng nhập không quá 100 ký tự.")
                            .min(3, "Thông tin camera sản phẩm dài hơn 5 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        descriptionProduct: Yup.string()
                            .min(0)
                            .max(1000000, "Thông tin chi tiết sản phẩm quá dài, vui lòng nhập dưới 1.000.000 ký tự.")
                        ,
                        selfieProduct: Yup.string()
                            .required("Vui lòng bổ sung thông tin selfie.")
                            .min(3, "Vui lòng nhập hơn 5 ký tự.")
                            .max(100, "Vui lòng nhập ít hơn 100 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        batteryProduct: Yup.string()
                            .required("Không để trống thông tin pin.")
                            .min(3, "Vui lòng nhập hơn 5 ký tự.")
                            .max(100, "Vui lòng nhập ít hơn 100 ký tự.")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin không chứa ký tự đặc biệt.")
                        ,
                        weightProduct: Yup.string()
                            .required("Không để trống thông tin trọng lượng.")
                            .min(3, "Vui lòng nhập hơn 5 ký tự.")
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
                        setSubmitting(false)
                        add(values, setErrors);
                    }}>

                    <div className="row p-2 mt-3 container" style={{marginLeft: 110}}>
                        <div className="col-6 justify-content-center" style={{marginTop: "9%"}}>
                            <fieldset
                                className="form-input-dao shadow"
                                style={{width: 600, height: 480}}>
                                <legend className="float-none w-auto px-3">
                                    <h2>Ảnh hàng hóa đã chọn</h2>
                                </legend>
                                <div id="upload-img" className="mt-2 ">
                                    {imageUpload ? imageUpload.map((img) => {
                                        return (
                                            <img
                                                alt=""
                                                src={img}
                                                ref={imgPreviewRef}
                                                className="image-gap mx-2 mb-2 float-start"
                                                style={{
                                                    margin: "0px 8px 8px",
                                                    width: "150px",
                                                    height: "100px",
                                                    borderRadius: "10px",
                                                    objectFit: "cover",
                                                    border: "1px solid black"
                                                }}/>
                                        )
                                    }) : null}
                                </div>
                            </fieldset>
                        </div>
                        <div className="d-flex justify-content-center col-6  float-end">
                            <Form>
                                <fieldset className="form-input-dao shadow">
                                    <legend className="float-none w-auto px-3">
                                        <h2>Thêm mới thông tin hàng hóa</h2>
                                    </legend>
                                    <div className="row p-2">
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor={"1"}>
                                                    Tên sản phẩm<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    name="nameProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    id={"1"}
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div style={{height: "16px"}}>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="nameProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor={"2"}>
                                                    Giá <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    className="form-control-dao mt-2 border border-dark"
                                                    name="priceProduct"
                                                    type="number"
                                                    id={"2"}
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
                                                <div>
                                                    <ErrorMessage className="p-3 mb-3 text-danger" name="screenProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor={"4"}>
                                                    Dung lượng pin<span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"4"}
                                                    name="batteryProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270, height: 27.6}}
                                                />
                                                <div>
                                                    <ErrorMessage className="p-3 mb-2 text-danger" name="batteryProduct"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor={"5"}>
                                                    Camera sau<span style={{color: "red"}}>*</span>
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
                                                    Trọng lượng <span style={{color: "red"}}>*</span>
                                                </label>
                                                <Field
                                                    id={"7"}
                                                    name="weightProduct"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250, height: 27.6}}
                                                />
                                                <div>
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
                                                    <ErrorMessage name="quantityProduct"
                                                                  className="p-3 mb-2 text-danger"
                                                                  component="small"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor={"9"}>
                                                    Dung lượng </label>
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
                                                    style={{width: 270, height: 27.6}}>
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
                                                    style={{width: 270, height: 27.6}}>
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
                                                    di={"14"}
                                                    name="typeDto"
                                                    className="form-control-dao mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 270, height: 27.6}}>
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
                                            <label htmlFor={"15"}>Mô tả thêm </label>
                                        </div>
                                        <div>
                                            <Field
                                                id={"15"}
                                                className="form-control-dao mt-2 border border-dark"
                                                name="descriptionProduct"
                                                component={CKEditorComponent}
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
            <Footer/>
        </>
    )

}

export default CreateProduct;