import axios from "axios";

export const createProduct = async (product) => {
    try {
        const result = await axios.post(`http://localhost:8080/api/admin/product/add`, product)
        return result.data.content;
    }catch (error){
        console.log(error);
    }
}

export const getImageProduct = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/product/create`)
        return result.data.content;
    }catch (error){
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/admin/product/${id}`,product)
        return result.data.content;
    }catch (error){
        console.log(error);
    }
}

export const getProductId = async (id) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/admin/product/${id}`)
        return result.data.content;
    }catch (error){
        console.log(error)
    }
}