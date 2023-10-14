const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Số đơn bán',
            data: [50, 60, 70, 80, 90],
            borderColor: 'pink',
            fill: false,
        },
        {
            label: 'Doanh thu',
            data: [200, 250, 300, 350, 400],
            borderColor: '#3ea4ed',
            fill: false,
        },
    ],
};

// Data for pie chart
const pieChartData = {
    labels: ['Doanh thu đã đạt được', 'Chưa đạt chỉ tiêu'],
    datasets: [
        {
            data: [800, 200],
            backgroundColor: ['#3ea4ed', 'pink'],
        },
    ],
};

// Create line chart
const lineChartCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineChartCtx, {
    type: 'line',
    data: lineChartData,
});

// Create pie chart
const pieChartCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieChartCtx, {
    type: 'pie',
    data: pieChartData,
});