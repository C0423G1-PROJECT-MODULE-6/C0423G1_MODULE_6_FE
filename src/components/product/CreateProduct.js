import {useEffect, useRef, useState} from "react";
import * as productService from "../../service/product/ProductService";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {createProduct} from "../../service/product/ProductService";
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function CreateProduct() {
    const [capacitys, setCapacity] = useState([]);
    const [colors, setColor] = useState([]);
    const [cpus, setCpu] = useState([]);
    const [rams, setRam] = useState([]);
    const [series, setSeries] = useState([]);
    const [types, setType] = useState([]);
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getImage = async () => {
        const result = await productService.getImageProduct();
        setImageUpload(result.imageDto.name)
    };

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

    useEffect(() => {
        getImage();
    }, [])

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
        if (!isSubmitting) {
            setIsSubmitting(true)
            const fileName = `product/${imageUpload.name + v4()}`;
            const imageRef = ref(storage, fileName);
            await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log(url);
                    try {
                        const product1 = {
                            ...product,
                            capacity: JSON.parse(product?.capacity),
                            color: JSON.parse(product?.color),
                            cpu: JSON.parse(product?.cpu),
                            ram: JSON.parse(product?.ram),
                            series: JSON.parse(product?.series),
                            type: JSON.parse(product?.type),
                        }
                        if (url != null) {
                            product1.imageDto.name = url;
                            console.log(url);
                        } else {
                            product1.imageDto.name = imageUpload;
                        }
                        await createProduct(product1);
                        // code toast
                    } catch (error) {
                        console.log(error);
                        if (error.response.data) {
                            setErrors(error.response.data);
                        }
                    }
                });
            });
        }
    }

    // const handleInputChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file.size > 3000000) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Dung lượng ảnh tối đa 3MB",
    //             showConfirmButton: false,
    //             timer: 1500,
    //             customClass: {
    //                 icon: "icon-post",
    //             },
    //         });
    //         return;
    //     }
    //     setImageUpload(file);
    //     const reader = new FileReader();
    //     reader.addEventListener("load", function () {
    //         imgPreviewRef.current.src = reader.result;
    //         imgPreviewRef.current.style.display = "block";
    //     });
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <>
            <div id="anhdao">
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
                            .required("Không được để trống tên sản phẩm!")
                            .max(70, "Tên sản phẩm quá dài, nhập tên không quá 70 ký tự!")
                            .min(5, "Vui lòng nhập tên hơn 5 ký tự!")
                            .matches(/^[a-zA-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/, "Tên sản phẩm không chứa ký tự đặc biệt!"),
                        screenProduct: Yup.string()
                            .required("Không được để trống màn hình sản phẩm!")
                            .max(50, "Thông tin màn hình quá dài, vui lòng nhập ít hơn 50 ký tự!")
                            .min(5, "Thông tin màn hình phải hơn 5 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin màn hình khng chứa ký tự đặc biệt!"),
                        cameraProduct: Yup.string()
                            .required("Không để trống camera sảm phẩm!")
                            .max(100, "Thông tin camera quá dài, vui lòng nhập không quá 100 ký tự!")
                            .min(5, "Thông tin camera sản phẩm dài hơn 5 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin camera không chứa ký tự đặc biệt!"),
                        descriptionProduct: Yup.string()
                            .min(0)
                            .max(1000000, "Thông tin chi tiết sản phẩm quá dài, vui lòng nhập dưới 1.000.000 ký tự!"),
                        selfieProduct: Yup.string()
                            .required("Vui lòng bổ sung thông tin selfie!")
                            .min(5, "Thông tin selfie quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin selfie quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin selfie không chứa ký tự đặc biệt!"),
                        batteryProduct: Yup.string()
                            .required("Không được để trống thông tin pin!")
                            .min(5, "Thông tin pin quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin pin quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin pin không chứa ký tự đặc biệt!"),
                        weightProduct: Yup.string()
                            .required("Không được để trống thông tin trọng lượng!")
                            .min(5, "Thông tin trọng lượng quá ngắn, vui lòng nhập hơn 5 ký tự!")
                            .max(100, "Thông tin trọng lượng quá dài, vui lòng nhập ít hơn 100 ký tự!")
                            .matches(/^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$/, "Thông tin trọng lượng không đúng định dạng!"),
                        priceProduct: Yup.number()
                            .typeError("Thông tin giá không đúng định dạng!")
                            .required("Vui lòng bổ sung thông tin giá!")
                            .min(0, "Giá không được là số âm!")
                            .max(300000000, "Giá không quá 300.000.000")
                    })}
                    onSubmit={(values, {setErrors}) => {
                        console.log(values);
                        add(values, setErrors);
                    }}>

                    <div className="row p-2 mt-3 container" style={{marginLeft: 110}}>
                        <div className="col-6 justify-content-center" style={{marginTop: "9%"}}>
                            <form action="">
                                <fieldset
                                    className="form-input-1 shadow"
                                    style={{width: 600, height: 480}}
                                >
                                    <legend className="float-none w-auto px-3">
                                        <h2>Ảnh hàng hóa đã chọn</h2>
                                    </legend>
                                    <div id="upload-img" className="mt-2">
                                        <img
                                            src={imageUpload}
                                            ref={imgPreviewRef}
                                            style={{
                                                padding: "0",
                                                width: "400px",
                                                height: "300px",
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                                border: "1px solid black"
                                            }} />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="d-flex justify-content-center col-6  float-end">
                            <form>
                                <fieldset className="form-input-1 shadow">
                                    <legend className="float-none w-auto px-3">
                                        <h2>Thêm mới thông tin hàng hóa</h2>
                                    </legend>
                                    <div className="row p-2">
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Tên điện thoại<span>*</span>{" "}
                                                </label>
                                                <Field
                                                    name="nameProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="nameProduct"
                                                              component="small">Error </ErrorMessage>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Giá điện thoại<span>*</span>{" "}
                                                </label>
                                                <Field
                                                    className="form-control-1 mt-2 border border-dark"
                                                    name="priceProduct"
                                                    type="number"
                                                    style={{width: 270}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="priceProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Kích thước màn hình <span>*</span>
                                                </label>
                                                <Field
                                                    name="screenProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="screenProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Pin điện thoại<span>*</span>
                                                </label>
                                                <Field
                                                    name="batteryProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="batteryProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>Camera điện thoại</label>
                                                <Field
                                                    name="cameraProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="cameraProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Selfie <span>*</span>
                                                </label>
                                                <Field
                                                    name="selfieProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="selfieProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Trọng lượng điện thoại<span>*</span>
                                                </label>
                                                <Field
                                                    name="weightProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 250}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="weightProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Số lượng <span>*</span>
                                                </label>
                                                <Field
                                                    name="quantityProduct"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    type="text"
                                                    style={{width: 270}}
                                                />
                                                <ErrorMessage className="p-3 mb-2 text-danger" name="quantityProduct"
                                                              component="small">Error</ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Dung lượng điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="capacityDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn dung lượng điện thoại</option>
                                                    {
                                                        capacitys.map((capacity) => (
                                                            <option key={capacity.id} value={JSON.stringify(capacity)}>{capacity.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Màu sắc điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="colorDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn màu sắc điện thoại</option>
                                                    {
                                                        colors.map((color) => (
                                                            <option key={color.id} value={JSON.stringify(color)}>{color.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Cpu điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="cpuDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn cpu điện thoại</option>
                                                    {
                                                        cpus.map((cpu) => (
                                                            <option key={cpu.id} value={JSON.stringify(cpu)}>{cpu.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Ram điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="ramDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn Ram điện thoại</option>
                                                    {
                                                        rams.map((ram) => (
                                                            <option key={ram.id} value={JSON.stringify(ram)}>{ram.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>
                                                    Series điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="seriesDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn Series điện thoại</option>
                                                    {
                                                        series.map((seriess) => (
                                                            <option key={seriess.id} value={JSON.stringify(seriess)}>{seriess.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-6">
                                                <label>
                                                    Loại điện thoại<span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="typeDto"
                                                    className="form-control-1 mt-2 border border-dark"
                                                    as="select"
                                                    style={{width: 250}}>
                                                    <option value="" disabled>Chọn loại điện thoại</option>
                                                    {
                                                        types.map((type) => (
                                                            <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
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
                                                multiple=""/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Mô tả thêm </label>
                                        </div>
                                        <div>
                                            <textarea
                                                className="form-control-1 mt-2 border border-dark"
                                                type="text"
                                                style={{width: 540, height: 90}}
                                                defaultValue={""}/>
                                        </div>
                                        <div className="col-4 p-2 mt-3">
                                            <NavLink
                                                href="QuanND_Product_List.html"
                                                className="btn btn-outline-secondary float-end mx-2 mt-2 shadow"
                                            >
                                                Trở về
                                            </NavLink>
                                            <button className="btn btn-outline-primary float-end mx-3 mt-2 shadow">
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
                            </form>
                        </div>
                    </div>

                </Formik>
            </div>
        </>
    )

}

export default CreateProduct;