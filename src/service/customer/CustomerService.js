import axios from "axios";
export const getAllCustomerModal = async (page, name,age,gender) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/customer/list?_limit=5&_page=${page}&name_like=${name}&age=${age}&gender=${gender}`);
        // console.log("1");
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
    }
}
export const addCustomer = async (customer) => {
    // try {
        const result = await axios.post(`http://localhost:8080/api/admin/customer/create`,customer);
        console.log(result);
        return result;
    // } catch (e) {
    //     console.log(e);
    // }
}