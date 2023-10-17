import axios from "axios";
import jwt_decode from "jwt-decode";

const apiAuth = "http://localhost:8080/api/user";

export const create = async (data) => {
    try {
        return await axios.post(apiAuth + "/signup", data);
    } catch (e) {
        alert("Không có dữ liệu");
    }
}

export const login = async (data) => {
    return await axios.post(apiAuth + "/login-by-username", data);
}

export const resetOTP = async (data) => {
    return await axios.post(apiAuth + "/resetOTP", data);
}

export const auth = async (data) => {
    return await axios.post(apiAuth + "/confirm", data);
}

export const confirmRegister = async (data) => {
    return await axios.post(apiAuth + "/confirmRegister", data);
}

export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT", jwtToken);
};

export const infoAppUserByJwtToken = () => {
    const jwtToken = localStorage.getItem("JWT");
    if (jwtToken) {
        return jwt_decode(jwtToken);
    }
};

export const checkRoleAppUser = (roleName) => {
    const jwtToken = localStorage.getItem("JWT");
    if (jwtToken) {
        const roleList = jwt_decode(jwtToken).roleList;
        return roleList.some((role) => role.authority === roleName);
    }
};

export const getIdByUserName = async (userName) => {
    return await axios.get(
        `http://localhost:8080/api/user/get-id-app-user/${userName}`
    );
};
