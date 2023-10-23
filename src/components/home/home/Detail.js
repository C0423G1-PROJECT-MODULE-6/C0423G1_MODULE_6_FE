import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules

import { getCapacitiesByNameAndColor, getColorsByNameAndCapacity, getImageLinksByProductId, getProductById, getProductByNameAndCapacityAndColor } from '../../../service/home/HomeService';
import Header from '../common/Header';
import Footer from '../common/Footer';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { RingLoader } from 'react-spinners';

const Detail = () => {

    const param = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [product, setProduct] = useState({});
    const [images, setImages] = useState();
    const [capacities, setCapacities] = useState();
    const [colors, setColors] = useState();
    const [colorIsActive, setColorIsActive] = useState();
    const [capaIsActive, setCapaIsActive] = useState();
    const [id, setId] = useState(param.id);
    const [isLoading, setIsLoading] = useState(true);

    const colorCode = {
        1: 'black-titan',
        2: 'blue-titan',
        3: 'purple',
        4: 'black',
        5: 'gold',
        6: 'white',
        7: 'green',
        8: 'blue',
        9: 'gray',
        10: 'silver',
        11: 'deep-dark-blue',
        12: 'starlight-white',
        13: 'dark-blue',
        14: 'natural-titan',
        15: 'white-titan'
    }



    useEffect(() => {
        getProduct();
        getImages();
    }, [id])

    // useEffect(() => {
    //     getProductBySelection();
    // }, [colorIsActive, capaIsActive])


    useEffect(() => {
        if (product.name && capaIsActive && colorIsActive) {
            getProductBySelection(product.name, capaIsActive, colorIsActive);
        }
    }, [colorIsActive, capaIsActive])

    const getProductBySelection = async (paramName, paramCapa, paramColor) => {
        const data = await getProductByNameAndCapacityAndColor(paramName, paramCapa, paramColor);
        setId(data.id);
    }

    const getProduct = async () => {
        const data = await getProductById(id);
        setProduct(data);
        getCapacities(data.name, data.color);
        getColors(data.name, data.capacity);
        setCapaIsActive(data.capacity);
        setColorIsActive(data.color);
    }

    const getImages = async () => {
        const data = await getImageLinksByProductId(id);
        setImages(data);
    }

    const getCapacities = async (name, color) => {
        const data = await getCapacitiesByNameAndColor(name, color);
        setCapacities(data);
    }

    const getColors = async (name, capa) => {
        const data = await getColorsByNameAndCapacity(name, capa);
        setColors(data);
    }
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => {
            clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
        };
    }, []);


    return (
        <>
            {/* {isLoading &&
                <div div className='spinner-container'>
                    <RingLoader
                        className='spinner-item' color="#fff" />
                </div >
            } */}
            <div className='home-body'>
                <Header />
                <div className="detail-container">
                    <div className="main-detail-swiper">
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#888",
                                "--swiper-pagination-color": "#888",
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 mainSwiper"
                        >

                            {images && images.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img className="image-on-detail-slide" src={item} alt="" />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>

                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={5}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper bottomSwiper"
                        >
                            {images && images.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img className="image-on-detail-slide" src={item} alt="" />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>



                    </div>
                    <div className="detail-content-container">
                        <p className="title">{product.name}</p>
                        <p className="price-label">Giá khuyến mãi:</p>
                        <div className="price-line">
                            <span className="price-on-detail">{new Intl.NumberFormat("de-DE").format(product.price * 1.2)}đ</span>
                            <span className="line-through-price-on-detail">{new Intl.NumberFormat("de-DE").format(product.price * 1.25)}đ</span>
                            <span className="discount-rate"> -10% </span>
                        </div>
                        <p className="capacity-label">Dung lượng:</p>
                        <div className="capacity-types">
                            {capacities && capacities.map((item, index) => {
                                return (
                                    <button key={index} onClick={() => { setCapaIsActive(item) }} className={capaIsActive == item ? "capa-on-detail-default capacity-option-button" : "capacity-option-button"}>{item}</button>
                                )
                            })}
                        </div>
                        <p className="color-label">Màu sắc: {product.color}</p>
                        <div className="color-types">
                            {colors && colors.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { setColorIsActive(item.name) }} className={colorIsActive == item.name ? `color-option-button-default color-option-button ${colorCode[item.id]}` : ` color-option-button ${colorCode[item.id]}`} ></div>
                                )
                            })}


                        </div>

                    </div>
                </div >

                <div className="product-specifications">
                    <div className="product-specifications-title">
                        <h1 className="title">Thông số kỹ thuật</h1>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Màn hình:</div>
                        <div className="product-attribute-value">{product.screen}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Camera Trước:</div>
                        <div className="product-attribute-value">{product.selfie}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Camera sau:</div>
                        <div className="product-attribute-value">{product.camera}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Chip xử lý (CPU):</div>
                        <div className="product-attribute-value">{product.cpu}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Dung lượng lưu trữ:</div>
                        <div className="product-attribute-value">{product.capacity}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Dung lượng pin:</div>
                        <div className="product-attribute-value">{product.battery}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">RAM:</div>
                        <div className="product-attribute-value">{product.ram}</div>
                    </div>
                    <div className="specification-detail-row">
                        <div className="product-attribute">Khối lượng:</div>
                        <div className="product-attribute-value">{product.weight}</div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Detail;