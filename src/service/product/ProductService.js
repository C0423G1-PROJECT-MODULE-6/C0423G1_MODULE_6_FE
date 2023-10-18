import axios from "axios";

export const createProduct = async (product) => {
    try {
        const result = await axios.post(`http://localhost:8080/api/admin/product/add`, product)
        return result.data.content;
    } catch (error) {
        console.log(error);
    }
}

export const getImageProduct = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/product/create`)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/admin/product/${id}`, product)
        return result.data.content;
    } catch (error) {
        console.log(error);
    }
}

export const getProductId = async (id) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/admin/product/${id}`)
        return result.data.content;
    } catch (error) {
        console.log(error)
    }
}

export const getAllCapacity = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/capacity/list`)
    return result.data;
}

export const getAllColor = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/color/list`)
    return result.data;
}

export const getAllCpu = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/cpu/list`)
    return result.data;
}

export const getAllRam = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/ram/list`)
    return result.data;
}

export const getAllSeries = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/series/list`)
    return result.data;
}

export const getAllType = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/type/list`)
    return result.data;
}
/**
 * method get page product
 * Create TinDT
 * Date 17-10-2023
 * param Long id
 * return HttpStatus
 */
export const getPageProductModal = async (choose,page,value) => {
    const result = await axios.get(`http://localhost:8080/api/admin/product/list?choose=${choose}&page=${page}&value=${value}`)
    return result;
}