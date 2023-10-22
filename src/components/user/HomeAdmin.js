import HeaderAdmin from "./HeaderAdmin";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import * as SalesService from "../../service/sales_report/SalesService";
import {useEffect, useState} from "react";
import {Chart, registerables} from "chart.js";
import {getQuantityToday} from "../../service/sales_report/SalesService";

Chart.register(...registerables);


function formatDateString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
}

function HomeAdmin() {
    const [salesReportProduct, setSalesReportProduct] = useState([]);
    const [quantityToDay, setQuantityToDay] = useState()
    const [dailyToDay, setDailyToDay] = useState()
    const [dailyMonth, setDailyMonth] = useState()
    const getSearchSalesReport = async () => {
        setSalesReportProduct(await SalesService.getAll());
        setDailyToDay((await (SalesService.getDailyToday())).toLocaleString())
        setQuantityToDay(await SalesService.getQuantityToday())
        setDailyMonth(await SalesService.getDailyMonth())
    };
    const labels = salesReportProduct.map((salesReport) => formatDateString(new Date(salesReport.date)));
    const dataQuantity = salesReportProduct.map((salesReport) => salesReport.quantity);
    const dataDaily = salesReportProduct.map((salesReport) => salesReport.daily);
    const barChartData = {
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
                    labelString: "Doanh thu (VND)",
                },
            },
        },
    };
    const percentageAchieved = Math.min((dailyMonth / 100000000) * 100, 100);

    const donutChartData = {
        labels: [
            `Số doanh thu bán được trong tháng (${percentageAchieved.toFixed(2)}%)`,
            `Chỉ tiêu doanh thu trong tháng`,
        ],
        datasets: [
            {
                data: [percentageAchieved, 100 - percentageAchieved],
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };


    const cardBodyStyle = {
        flex: '1 1 auto',
        padding: 'var(--bs-card-spacer-y) var(--bs-card-spacer-x)',
        color: 'white',
        minHeight: '150px',
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
                        <div className="card">
                            <div style={{...cardBodyStyle, backgroundColor: '#3ea4ed'}} className="card-body">
                                <h5 className="card-title">Số đơn bán trong ngày</h5>
                                <p className="card-text">{quantityToDay}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div style={{...cardBodyStyle, backgroundColor: '#f3d652'}} className="card-body">
                                <h5 className="card-title">Doanh thu trong ngày</h5>
                                <p className="card-text">{dailyToDay} VND</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div style={{...cardBodyStyle, backgroundColor: '#ff7a81'}} className="card-body">
                                <h5 className="card-title">Chỉ tiêu tháng</h5>
                                <p className="card-text">100,000,000 VND</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <Bar data={barChartData} options={options}/>
                    </div>
                    <div className="col-md-4">
                        <Doughnut data={donutChartData}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeAdmin;