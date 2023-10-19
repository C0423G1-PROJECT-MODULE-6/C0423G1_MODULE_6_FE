import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { getListByName } from '../../../service/home/HomeService';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Home = () => {

    const [iphones, setIphones] = useState();
    const [macbooks, setMacbooks] = useState();
    const [ipads, setIpads] = useState();
    const [watches, setWatches] = useState();


    useEffect(() => {
        getIphones();
        getMacbooks();
        getIpads();
        getWatchs();
    }, [])



    const getIphones = async () => {
        const data = await getListByName('iphone', 'id', 'desc');
        setIphones(data);
    }
    const getMacbooks = async () => {
        const data = await getListByName('macbook', 'id', 'desc');
        setMacbooks(data);
    }
    const getIpads = async () => {
        const data = await getListByName('ipad', 'id', 'desc');
        setIpads(data);
    }
    const getWatchs = async () => {
        const data = await getListByName('watch', 'id', 'desc');
        setWatches(data);
    }




    return (
        <>
            <div className='home-body'>
                <Header />
                <div className='home-container'>
                    <div className='carousel-container'>
                        <Swiper
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}

                            pagination={{
                                dynamicBullets: true,
                                clickable: true,
                            }}
                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper"
                            loop={true}
                        >
                            <SwiperSlide>
                                <img className="carousel-image" src="./images/carousel-ip.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="carousel-image" src="./images/carousel-watch.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="carousel-image" src="./images/carousel-sale.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="carousel-image" src="./images/carousel-affordable-price.webp" alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='bestseller-carousel'>
                        <div>
                            <img className='bestsellers-title' src='./images/bestsellers-title.png'></img>
                        </div>
                        <div className='bestseller-swiper'>
                            <div className="bs-swiper-button-prev">
                                <div className="temp-tag">
                                    <i className='bx bxs-chevron-left'></i>
                                </div>
                            </div>
                            <div className="bs-swiper-button-next">
                                <div className="temp-tag">
                                    <i className='bx bxs-chevron-right'></i>
                                </div>
                            </div>
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={30}
                                loop={false}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                grabCursor={true}
                                navigation={{
                                    nextEl: ".bs-swiper-button-next",
                                    prevEl: ".bs-swiper-button-prev"
                                }}

                                modules={[Pagination, Autoplay, Navigation]}
                                className="mySwiper product-list"
                            >

                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-1.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">IPhone 15 Pro Max Sieu Ben Bi</h3>
                                        <h2 className="bestseller-price">19.000.000đ</h2>
                                        <h4 className="line-through-price">21.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-2.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">IPhone 15 Pro Max </h3>
                                        <h2 className="bestseller-price">29.000.000</h2>
                                        <h4 className="line-through-price">30.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-3.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">Air Pod Pro </h3>
                                        <h2 className="bestseller-price">19.000.000đ</h2>
                                        <h4 className="line-through-price">20.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-4.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">Apple Watch Series 8 </h3>
                                        <h2 className="bestseller-price">19.000.000đ</h2>
                                        <h4 className="line-through-price">20.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-5.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">IPhone 15 Pro Max </h3>
                                        <h2 className="bestseller-price">39.000.000đ</h2>
                                        <h4 className="line-through-price">40.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-2.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">IPhone 14 Pro Max </h3>
                                        <h2 className="bestseller-price">29.000.000đ</h2>
                                        <h4 className="line-through-price">31.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <a className="bestseller-card" href=''>
                                        <div className="bestseller-image">
                                            <img src='./images/slider-4.webp' alt="" />
                                        </div>
                                        <h3 className="bestseller-name">Apple Watch Series 8 </h3>
                                        <h2 className="bestseller-price">19.000.000đ</h2>
                                        <h4 className="line-through-price">20.000.000đ</h4>
                                    </a>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                    </div>



                    {/* Categories */}
                    <div className="container-block">
                        <div className="categories">
                            <a className="category-item" href="/list/iphone">
                                <img src="./images/IP_Desktop.png" className="category-image" alt="" />
                                <span className="category-name">iPhone</span>
                            </a>

                            <a className="category-item" href="/list/macbook">
                                <img src="./images/Mac_Desktop.png" className="category-image" alt="" />
                                <span className="category-name">Macbook</span>
                            </a>

                            <a className="category-item" href="/list/ipad">
                                <img src="./images/IPad_Desktop.png" className="category-image" alt="" />
                                <span className="category-name">IPad</span>
                            </a>

                            <a className="category-item" href="/list/watch">
                                <img src="./images/Watch_Desktop.png" className="category-image" alt="" />
                                <span className="category-name">Watch</span>
                            </a>
                        </div>
                    </div>

                    {/* Iphone List Swiper */}
                    <div className="list-title"><img src="./images/iphone-logo.png" alt="" /></div>
                    <div className='home-list-container '>
                        <div className="iphone-swiper-button-prev">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-left'></i>
                            </div>
                        </div>
                        <div className="iphone-swiper-button-next">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-right'></i>
                            </div>
                        </div>

                        <Swiper
                            slidesPerView={4}
                            spaceBetween={40}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                            navigation={{
                                nextEl: ".iphone-swiper-button-next",
                                prevEl: ".iphone-swiper-button-prev"
                            }}
                            // breakpoints={{
                            //     640: {
                            //         slidesPerView: 2,
                            //         spaceBetween: 20,
                            //     },
                            //     768: {
                            //         slidesPerView: 3,
                            //         spaceBetween: 30,
                            //     },
                            //     1024: {
                            //         slidesPerView: 4,
                            //         spaceBetween: 40,
                            //     },
                            // }}

                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper product-list"
                        >
                            {iphones && iphones.map((item) => {
                                return (
                                    <SwiperSlide >
                                        <a className="product-link" href={'/detail/' + item.type + '/' + item.id}>
                                            <div className="slide-image">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <h3 className="product-name">{item.name + " " + item.capacity}</h3>
                                            <h2 className="product-price">{new Intl.NumberFormat("de-DE").format(item.price)}đ</h2>
                                            <h4 className="line-through-price">{new Intl.NumberFormat("de-DE").format(item.price * 1.05)}đ</h4>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>

                    {/* Macbook List Swiper */}

                    <div className="list-title"><img src="./images/macbook-logo.png" alt="" /></div>
                    <div className='home-list-container '>
                        <div className="macbook-swiper-button-prev">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-left'></i>
                            </div>
                        </div>
                        <div className="macbook-swiper-button-next">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-right'></i>
                            </div>
                        </div>

                        <Swiper
                            slidesPerView={4}
                            spaceBetween={-20}
                            // loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                            navigation={{
                                nextEl: ".macbook-swiper-button-next",
                                prevEl: ".macbook-swiper-button-prev"
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}

                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper product-list"
                        >
                            {macbooks && macbooks.map((item) => {
                                return (
                                    <SwiperSlide >
                                        <a className="product-link" href={'/detail/' + item.type + '/' + item.id}>
                                            <div className="slide-image">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <h3 className="product-name">{item.name + " " + item.capacity}</h3>
                                            <h2 className="product-price">{new Intl.NumberFormat("de-DE").format(item.price)}đ</h2>
                                            <h4 className="line-through-price">{new Intl.NumberFormat("de-DE").format(item.price * 1.05)}đ</h4>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>



                    {/* Ipad List Swiper */}

                    <div className="list-title"><img src="./images/ipad-logo.png" alt="" /></div>
                    <div className='home-list-container '>
                        <div className="ipad-swiper-button-prev">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-left'></i>
                            </div>
                        </div>
                        <div className="ipad-swiper-button-next">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-right'></i>
                            </div>
                        </div>

                        <Swiper
                            slidesPerView={4}
                            spaceBetween={-20}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                            navigation={{
                                nextEl: ".ipad-swiper-button-next",
                                prevEl: ".ipad-swiper-button-prev"
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}

                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper product-list"
                        >
                            {ipads && ipads.map((item) => {
                                return (
                                    <SwiperSlide >
                                        <a className="product-link" href={'/detail/' + item.type + '/' + item.id}>
                                            <div className="slide-image">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <h3 className="product-name">{item.name + " " + item.capacity}</h3>
                                            <h2 className="product-price">{new Intl.NumberFormat("de-DE").format(item.price)}đ</h2>
                                            <h4 className="line-through-price">{new Intl.NumberFormat("de-DE").format(item.price * 1.05)}đ</h4>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>


                    {/* Watch List Swiper */}

                    <div className="list-title"><img src="./images/watch-logo.png" alt="" /></div>
                    <div className='home-list-container '>
                        <div className="watch-swiper-button-prev">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-left'></i>
                            </div>
                        </div>
                        <div className="watch-swiper-button-next">
                            <div className="temp-tag">
                                <i className='bx bxs-chevron-right'></i>
                            </div>
                        </div>

                        <Swiper
                            slidesPerView={4}
                            spaceBetween={-20}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                            navigation={{
                                nextEl: ".watch-swiper-button-next",
                                prevEl: ".watch-swiper-button-prev"
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}

                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper product-list"
                        >
                            {watches && watches.map((item) => {
                                return (
                                    <SwiperSlide >
                                        <a className="product-link" href={'/detail/' + item.type + '/' + item.id}>
                                            <div className="slide-image">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <h3 className="product-name">{item.name + " " + item.capacity}</h3>
                                            <h2 className="product-price">{new Intl.NumberFormat("de-DE").format(item.price)}đ</h2>
                                            <h4 className="line-through-price">{new Intl.NumberFormat("de-DE").format(item.price * 1.05)}đ</h4>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;