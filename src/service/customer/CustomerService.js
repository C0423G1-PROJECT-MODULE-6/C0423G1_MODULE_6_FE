import axios from "axios";

const apiURL = "http://localhost:8080/api/admin/customer/list";

export const getAllPage = async (limit, page, nameSearch, age, gender, sortName, sortCount) => {
    console.log("check" + nameSearch)
    try {
        const result = await axios.get(apiURL + `?_limit=${limit}&_page=${page}&name_like=${nameSearch}&age=${age}&gender=${gender}&sortName=${sortName}&sortCount=${sortCount}`);
        console.log(result)
        return result;
    } catch (e) {

    }
}
