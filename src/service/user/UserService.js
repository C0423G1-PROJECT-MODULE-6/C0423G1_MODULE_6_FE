import axios from "axios";


const apiAccount = "http://localhost:8080/api/user";


export const edit = async (data) => {
    return await axios.put(apiAccount + `/information/edit`, data);
}

export const changePass = async (data) => {
    return await axios.put(apiAccount + `/register`, data);
}

export const findById = async (id) => {
    return await axios.get(apiAccount + `/information/${id}`);
}