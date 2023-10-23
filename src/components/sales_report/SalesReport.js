import React, {useEffect, useState} from "react";
import {Bar, Line} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as SalesService from "../../service/sales_report/SalesService";
import HeaderAdmin from "../user/HeaderAdmin";

Chart.register(...registerables);

function formatDateString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
}

function SalesReport() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
    const [salesReportProduct, setSalesReportProduct] = useState([]);
    const [product, setProduct] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const getSearchSalesReport = async () => {
        setSalesReportProduct(await SalesService.getAll(startDate, endDate, searchTerm));
        setProduct(await SalesService.getAllProduct());
    };

    const getSearchSalesReportProduct = async () => {
        let isSearchTermFound = false;
        for (let i = 0; i < product.length; i++) {
            if (product[i].nameProduct.toLowerCase() === searchTerm.toLowerCase()) {
                isSearchTermFound = true;
                break;
            }
        }
        if (searchTerm === "") {
            isSearchTermFound = true;
        }

        if (isSearchTermFound) {
            setSalesReportProduct(await SalesService.getAllSreach(startDate, endDate, searchTerm));
        } else {
            getSearchSalesReport();
            toast.error("Không tìm thấy sản phẩm");
        }
    };

    const handleSearch = () => {
        getSearchSalesReportProduct();
    };

    const handleStartDateChange = (date) => {
        if (date <= endDate) {
            setStartDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        if (date >= startDate && date <= new Date()) {
            setEndDate(date);
        }
    };

    const labels = salesReportProduct.map((salesReport) => formatDateString(new Date(salesReport.date)));
    const dataQuantity = salesReportProduct.map((salesReport) => salesReport.quantity);
    const dataDaily = salesReportProduct.map((salesReport) => salesReport.daily);
    const chartData = {
        labels: labels,
        datasets: [
            {
                type: "bar",
                label: "Số đơn bán",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                data: dataQuantity,
                yAxisID: "y1",
            },
            {
                type: "line",
                label: "Doanh thu (VND)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
                data: dataDaily,
                yAxisID: "y2",
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                scaleLabel: {
                    display: true,
                    labelString: "Ngày",
                },
            },
            y1: {
                beginAtZero: true,
                min: 0,
                scaleLabel: {
                    display: true,
                    labelString: "Số đơn bán",
                },
            },
            y2: {
                beginAtZero: true,
                min: 0,
                position: "right",
                scaleLabel: {
                    display: true,
                    labelString: "Doanh thu (VND)",
                },
            },
        },
    };

    useEffect(() => {
        getSearchSalesReport();
    }, []);

    return (
        <>
            <HeaderAdmin/>
            <div className="container pt-5">
                <h1 className="text-center mt-5">Báo Cáo Doanh Thu</h1>
                <div className="row mt-5">
                    <div className="col-md-4"></div>
                    <div className="col-md-2">
                        <label htmlFor="startDate">Ngày Bắt Đầu:</label>
                        <DatePicker
                            className="form-control"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            maxDate={endDate}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="endDate">Ngày Kết Thúc:</label>
                        <DatePicker
                            className="form-control"
                            selected={endDate}
                            onChange={handleEndDateChange}
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="search">Tìm kiếm:</label>
                        <input
                            type="text"
                            id="search"
                            list="search-options"
                            placeholder="Tìm kiếm..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <datalist id="search-options">
                            {product.map((product) => (
                                <option key={product.id} value={product.nameProduct}/>
                            ))}
                        </datalist>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button className="btn btn-outline-primary me-2 text-center" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <Bar data={chartData} options={options} id="myChart" style={{width: "80%", margin: "0 auto"}}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesReport;