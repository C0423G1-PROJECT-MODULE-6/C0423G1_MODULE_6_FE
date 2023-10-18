import axios from "axios"
export const getAllWarehouse = async () => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse")
        console.log(res);
        return res.data.content
    }catch(e){
        console.log(e);
    }
}
export const importProduct = async (warehouse) => {
    try{
        await axios.post("http://localhost:8080/api/admin/warehouse/create",warehouse)
    }catch(e){
        console.log(e);
    }
}
export const findProductById = async (id) => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse/product/"+id)
        console.log("Find:", res);
        return res.data;
    }catch(e){
        alert("nôtk")
    }
}
export const findSupplierById = async (id) => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse/supplier/"+id)
        return res.data;
    }catch(e){
        console.log(e);
    }
}