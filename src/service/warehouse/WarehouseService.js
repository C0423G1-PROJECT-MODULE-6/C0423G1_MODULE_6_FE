import axios from "axios"
export const getAllWarehouse = async (sort, choose, value, page) => {
    try{
        const res = (await axios.get(`http://localhost:8080/api/admin/warehouse/warehouse?sort=${sort}&choose=${choose}&value=${value}&page=${page}`)).data
        console.log("Res Service:", res);
        return res
    }catch(e){
        console.log(e);
    }
}
export const importProduct = async (warehouse) => {
    try{
        await axios.post("http://localhost:8080/api/admin/warehouse/warehouse/create",warehouse)
    }catch(error){
        console.log(error);
    }
}
export const findProductById = async (id) => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse/warehouse/product/"+id)
        console.log("Find:", res);
        return res.data;
    }catch(e){
        console.log(e);
    }
}
export const findSupplierById = async (id) => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse/warehouse/supplier/"+id)
        return res.data;
    }catch(e){
        console.log(e);
    }
}
export const getAllSupplierModal = async (page, searchName,addressSearch,emailSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/business/supplier?_page=${page}&_limit=5&name_like=${searchName}&addressSearch=${addressSearch}&emailSearch=${emailSearch}`);
        return result;
    } catch (e) {
        console.log(e);
    }
}