import axios from "axios";
export const getAllCustomerModal = async (page, name,phone,gender) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/customer/modal?_limit=5&_page=${page}&name_like=${name}&gender=${gender}&phone=${phone}`);
        // console.log("1");
        // console.log(result);
        return result;
    } catch (e) {
        console.log(e);
    }
}
export const addCustomer = async (customer) => {
    const result = await axios.post(`http://localhost:8080/api/admin/customer/create`,customer);
    console.log(result);
    return result;

}
const apiURL = "http://localhost:8080/api/admin/customer/list";
const apiURLHistory = "http://localhost:8080/api/admin/customer/history";

export const getAllPage = async (limit, page, nameSearch, age, gender, sortName, sortCount) => {
    try {
        const result = await axios.get(apiURL + `?_limit=${limit}&_page=${page}&name_like=${nameSearch}&age=${age}&gender=${gender}&sortName=${sortName}&sortCount=${sortCount}`);
        console.log(result)
        return result;
    } catch (e) {

    }
}

export const getAllHistory = async (id,limit, page, nameSearch) => {
    try {
        const result = await axios.get(apiURLHistory + `/${id}?_limit=${limit}&_page=${page}&name_like=${nameSearch}`);
        return result;
    }catch (e) {

    }
}

export const findById = async (id) => {

    try {
        const result = await axios.get(apiURL + `/${id}`);
        return result;
    } catch (e) {
        alert("Data not find");
    }
}
