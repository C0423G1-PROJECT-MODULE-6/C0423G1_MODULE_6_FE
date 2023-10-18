import axios from "axios";

export const getList = async (page,limit,searchName,addressSearch,emailSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/supplier?_page=${page}&_limit=${limit}&name_like=${searchName}&addressSearch=${addressSearch}&emailSearch=${emailSearch}`);
        const records = result.data.totalElements;
        const data = result.data.content;
        return [data,records,result];
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