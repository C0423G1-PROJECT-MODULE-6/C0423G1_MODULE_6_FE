import HeaderAdmin from "./HeaderAdmin";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import * as SalesService from "../../service/sales_report/SalesService";
import React, {useEffect, useState} from "react";
import {Chart, registerables} from "chart.js";
import {getQuantityToday} from "../../service/sales_report/SalesService";
import Footer from "../home/common/Footer";

Chart.register(...registerables);


function formatDateString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
}

function HomeAdmin() {
    const [salesReportProduct, setSalesReportProduct] = useState([]);
    const [quantityToDay, setQuantityToDay] = useState(0)
    const [dailyToDay, setDailyToDay] = useState(0)
    const [dailyMonth, setDailyMonth] = useState(0)
    const [typeReport, setTypeReport] = useState([])

    const getSearchSalesReport = async () => {
        setSalesReportProduct(await SalesService.getAll());
        setDailyToDay((await (SalesService.getDailyToday())).toLocaleString())
        setQuantityToDay(await SalesService.getQuantityToday())
        setDailyMonth(await (SalesService.getDailyMonth()))
        setTypeReport(await (SalesService.getTypeReport()))
    };

    const labels = salesReportProduct.map((salesReport) => formatDateString(new Date(salesReport.date)));
    const dataQuantity = salesReportProduct.map((salesReport) => salesReport.quantity);
    const dataDaily = salesReportProduct.map((salesReport) => salesReport.daily);
    const nameTypeReports = typeReport.map((data) => data.typename)
    const revenueTypeReports = typeReport.map((data) => data.revenue)
    const barChartData = {
        labels: labels,
        datasets: [
            {
                type: "bar",
                label: "Số Sản Phẩm ",
                backgroundColor: "rgba(211,11,59,0.2)",
                data: dataQuantity,
                yAxisID: "y1",
            },
            {
                type: "line",
                label: "Lợi Nhuận (VND)",
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
                position: "left",
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
                    labelString: "Lợi Nhuận (VND)",
                },
            },
        },
    };

    // const percentageAchieved = Math.min((dailyMonth / 100000000) * 100, 100);
    const total = dailyMonth;
    const macbook = revenueTypeReports[1] / total * 100;
    const iphone = revenueTypeReports[0] / total * 100;
    const watch = revenueTypeReports[3] / total * 100;
    const ipad = revenueTypeReports[2] / total * 100;

    const donutChartData = {
        labels: [
            `Macbook (${macbook.toFixed(0)}%)`,
            `Iphone (${iphone.toFixed(0)}%)`,
            `Apple Watch (${watch.toFixed(0)}%)`,
            `Ipad (${ipad.toFixed(0)}%)`,
        ],
        datasets: [
            {
                data: [macbook,iphone,watch,ipad],
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)", "rgb(255, 0, 221, 0.2)", "rgb(1, 250, 9, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgb(255, 0, 221, 1)", "rgb(1, 250, 9,1)"],
                borderWidth: 1,
            },
        ],
    };


    const cardBodyStyle = {
        // flex: '1 1 auto',
        // padding: 'var(--bs-card-spacer-y) var(--bs-card-spacer-x)',
        color: 'white',
        minHeight: '100px',
        fontSize: '35px',
    };

    useEffect(() => {
        getSearchSalesReport();
    }, []);

    return (
        <>
            <HeaderAdmin/>
            <div className="container my-5 pt-4">
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#02b9a8'}}>
                            <div className="card-header">
                                Số sản phẩm bán trong ngày
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {quantityToDay}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: 'rgba(0,11,231,0.91)'}}>
                            <div className="card-header">
                                Doanh thu trong ngày
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {dailyToDay} VND
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#ff7a81'}}>
                            <div className="card-header">
                                Doanh thu tháng
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {dailyMonth.toLocaleString()} VND
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <Bar data={barChartData} options={options}/>
                        <p className="mt-4" style={{textAlign: "center"}}>Lợi Nhuận Theo Ngày Trong Tháng</p>
                    </div>
                    <div className="col-md-4">
                        <Doughnut data={donutChartData}/>
                        <p className="mt-4" style={{textAlign: "center"}}>Doanh Thu Theo Loại Sản Phẩm</p>

                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );
}

export default HomeAdmin;