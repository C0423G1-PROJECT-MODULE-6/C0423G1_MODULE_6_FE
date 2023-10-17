import axios from "axios";


const apiAccount = "http://localhost:8080/api/user";


export const edit = async (data) => {
    try {
        return await axios.put(apiAccount + `/information/edit`, data);
    } catch (e) {
        alert("Không có dữ liệu");
    }
}

export const changePass = async (data) => {
    return await axios.put(apiAccount + `/register`, data);
}

export const findById = async (id) => {
    try {
        return await axios.get(apiAccount + `/information/${id}`);
    } catch (e) {
        alert("Không có dữ liệu");
    }
}