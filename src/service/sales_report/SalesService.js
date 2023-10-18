import axios from "axios";

export const getAllSreach = async (startDate, endDate, searchTerm) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log(formattedStartDate);
    console.log(formattedEndDate);
    console.log(searchTerm);
    const sreachString = "'" + searchTerm + "'"
    console.log(sreachString)
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/sales-report/sreach?startDate=${formattedStartDate}&searchTerm=${sreachString}&endDate=${formattedEndDate}`);
        console.log(res)
        return res.data;
    } catch (e) {
        alert("Không có dữ liệu");
        return [];
    }
};


export const getAllProduct = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/sales-report/product`);
        return res.data;
    } catch (e) {
        alert("Không có dữ liệu");
        return [];
    }
};


export const getAll = async (startDate, endDate, searchTerm) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/sales-report?startDate=${startDate}&searchTerm=${searchTerm}&endDate=${endDate}`);
        return res.data;
    } catch (e) {
        alert("Không có dữ liệu");
        return [];
    }
};