import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getListByName, getSeriesByProductType } from '../../../service/home/HomeService';


import Header from '../common/Header';
import Footer from '../common/Footer';
import { RingLoader } from 'react-spinners';

const List = () => {

    const [products, setProducts] = useState([]);
    const param = useParams();
    const [series, setSeries] = useState([])
    const [sortName, setSortName] = useState('id');
    const [sortType, setSortType] = useState('desc');
    const [searchName, setSearchName] = useState(param.type);
    const [isActive, setIsActive] = useState('all');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setSearchName(param.type);
        setIsActive('all');
    }, [param])

    useEffect(() => {
        getProductList();
        getSeries();
    }, [sortName, sortType, searchName])

    const getProductList = async () => {
        const data = await getListByName(searchName, sortName, sortType);
        setProducts(data);
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

    const getSeries = async () => {
        const data = await getSeriesByProductType(param.type);
        setSeries(data);
    }

    const handleClickOnSeries = (item) => {
        setIsActive(item);
    }

    useEffect(() => {
        setSortName('id');
        setSortType('desc');
    }, [searchName]);

    const handleSort = (value) => {
        if (value == 2) {
            setSortName('price');
            setSortType('desc');
        } else if (value == 3) {
            setSortName('price');
            setSortType('asc');
        } else {
            setSortName('id');
            setSortType('desc');
        }
    }
    const handleUE = () => {
        setTimeout()
    }


    return (
        <>
            <div className='home-body'>
                <Header />
                {/* Title */}
                <div className="list-title" style={{ margin: "20px 0" }}>
                    <img src={'/images/' + param.type + '-logo.png'} alt="" />
                </div>
                {/*Carousel*/}
                <div className='carousel-on-list'>

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
                            <img className="carousel-image" src="/images/carousel-ip.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="carousel-image" src="/images/carousel-watch.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="carousel-image" src="/images/carousel-sale.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="carousel-image" src="/images/carousel-affordable-price.webp" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/*Series*/}
                <div className="series-row">
                    <div className={isActive === 'all' ? "initial-item series-item" : "initial-item"} onClick={() => { setSearchName(param.type); handleClickOnSeries('all') }}>Tất cả</div>
                    {series && series.map((item) => {
                        return (
                            <div className={isActive === item ? 'initial-item series-item' : 'initial-item'} onClick={() => { setSearchName(item); handleClickOnSeries(item) }}>{item}</div>
                        )
                    })}
                </div>

                {/*Sort select-option*/}
                <div className="row-for-sort">
                    <select value={sortName === 'price' ? (sortType === 'desc' ? '2' : '3') : '1'} className="sort-by" onChange={(event) => { handleSort(event.target.value) }} name="" id="sort-by">
                        <option value="1">Mới ra mắt</option>
                        <option value="2">Giá giảm dần</option>
                        <option value="3">Giá tăng dần</option>
                    </select>
                </div >

                {/* Product List  */}
                <div className="product-list-container" >
                    <div className="device-list">
                        {products.length > 0 ? products.map((item) => {
                            return (
                                <a className="device-card" href={'/detail/' + item.type + '/' + item.id}>
                                    {item.quantity == 0 &&
                                        <div className='soldout-part'>
                                            <img className='soldout-word' src='/images/chayhang-2.png' />
                                        </div>
                                    }
                                    <div className="card-image">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <h3 className="product-name-on-list">{item.name + " " + item.capacity}</h3>
                                    <h2 className="product-price-on-list">{new Intl.NumberFormat("de-DE").format(item.price * 1.2)}đ</h2>
                                    <h4 className="line-through-price">{new Intl.NumberFormat("de-DE").format(item.price * 1.25)}đ</h4>
                                </a>
                            )
                        }) : <p className='no-products-found'>Không có sản phẩm</p>}

                    </div>
                </div >
                <Footer />
            </div>
        </>
    );
};

export default List;