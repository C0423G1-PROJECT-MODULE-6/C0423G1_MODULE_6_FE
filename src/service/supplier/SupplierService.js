import axios from "axios";

export const getList = async (page, limit, searchName, addressSearch, emailSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/supplier?_page=${page}&_limit=${limit}&name_like=${searchName}&addressSearch=${addressSearch}&emailSearch=${emailSearch}`);
        const records = result.data.totalElements;
        const data = result.data.content;
        return [data, records, result];
    } catch (error) {
        return error;
    }
}

export const deleteSupplier = async (idSupplier) => {
    try {
        return (await axios.delete(`http://localhost:8080/api/admin/supplier/${idSupplier}`)).status;
    } catch (error) {
        return error;
    }
}

export const getAllAddress = async () => {
    try {
        const res = await axios.get(`/api/p/`);
        return res.data;
    } catch (e) {
        alert("Yêu cầu địa chỉ thất bại!")
    }
}

export const createNewSupplier = async (supplier) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/admin/supplier/create`, supplier);
        console.log(res)
        return res;
    } catch (e) {
        alert("Yêu cầu thất bại!")
    }
}

export const findSupplierById = async (id) =>{
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/supplier/${id}`);
        console.log(res)
        return res.data;
    } catch (e) {
        alert("Yêu cầu tìm kiếm supplier thất bại!")
    }
}

export const editSupplier = async (data) =>{
    try {
        const res = await axios.patch(`http://localhost:8080/api/admin/supplier/edit/${data.idSupplier}`,data);
        console.log(res)
        return res;
    } catch (e) {
        alert("Yêu cầu chỉnh sửa thất bại!")
    }
}