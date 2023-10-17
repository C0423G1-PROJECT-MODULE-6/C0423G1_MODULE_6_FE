import {useEffect, useRef, useState} from "react";
import * as productService from "../../service/product/ProductService";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {getDownloadURL, ref} from "firebase/storage";
import {createProduct} from "../../service/product/ProductService";
import {Formik} from "formik";
import * as Yup from "yup";

function CreateProduct() {
    const [capacity, setCapacity] = useState([]);
    const [color, setColor] = useState([]);
    const [cpu, setCpu] = useState([]);
    const [ram, setRam] = useState([]);
    const [series, setSeries] = useState([]);
    const [type, setType] = useState([]);
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

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: "error",
                title: "Dung lượng ảnh tối đa 3MB",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    icon: "icon-post",
                },
            });
            return;
        }
        setImageUpload(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
        }
    };

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
                        batteryProduct:"",
                        weightProduct: "",
                        priceProduct:"",
                        quantityProduct:0,
                        capacityDto: "",
                        colorDto: "",
                        cpuDto: "",
                        ramDto: "",
                        seriesDto: "",
                        typeDto: "",
                        imageDto: {
                            name:"",
                        }
                    }}
                    validationSchema={Yup.object({
                        nameProduct: Yup.string()
                            .required("Không được để trống tên sản phẩm!")
                            .max(70,"Tên sản phẩm quá dài, nhập tên không quá 70 ký tự!")
                            .min(5, "Vui lòng nhập tên hơn 5 ký tự!")
                            .matches(/^[a-zA-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/,"Tên sản phẩm không chứa ký tự đặc biệt!"),
                        screenProduct: Yup.string()
                            .required("Không được để trống màn hình sản phẩm!")
                            .max(50,"Thông tin màn hình quá dài, vui lòng nhập ít hơn 50 ký tự!")
                            .min(5,"Thông tin màn hình phải hơn 5 ký tự!")
                            .matches(/^(?!.*\s{2,})[a-zA-Z0-9\s]*$/,"Thông tin màn hình khng chứa ký tự đặc biệt!")
                    })}
                    onSubmit={}>

                </Formik>
            </div>
        </>
    )

}

export default CreateProduct;