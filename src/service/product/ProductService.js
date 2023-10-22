import axios from "axios";

export const createProduct = async (product) => {
    console.log(product)
    try {
        const result = await axios.post(`http://localhost:8080/api/admin/business/product/add`,product)
        // return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getImageProduct = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/business/product/create`)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/admin/business/product/${id}`, product)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductId = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/business/product/${id}`)
        return result.data;
    } catch (error) {
        console.log(error)
    }
}
export const getListProduct = async (sort,otherSort,choose,value,page) => {
    try {
        const result = (await axios.get(`http://localhost:8080/api/admin/business/product/list?sort=${sort}&choose=${choose}&value=${value}&page=${page}&otherSort=${otherSort}`)).data
        console.log(result)
        return result;
    }catch (error){
        console.log(error)
    }
}

export const getAllCapacity = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/capacity/list`)
    return result.data;
}

export const getAllColor = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/color/list`)
    return result.data;
}

export const getAllCpu = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/cpu/list`)
    return result.data;
}

export const getAllRam = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/ram/list`)
    return result.data;
}

export const getAllSeries = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/series/list`)
    return result.data;
}

export const getAllType = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/type/list`)
    // console.log(result)
    return result.data;
}
export const removeProduct = async (id) => {
    const result = await axios.patch(`http://localhost:8080/api/admin/business/product/remove?id=${id}`)
    return result
}
/**
 * method get page product
 * Create TinDT
 * Date 17-10-2023
 * param Long id
 * return HttpStatus
 */
export const getPageProductModal = async (choose,page,value) => {
    const result = await axios.get(`http://localhost:8080/api/admin/business/product/list?choose=${choose}&page=${page}&value=${value}`)
    return result;
}