import axios from "axios";
export const getAppRoleList = async () =>{
    const respon = await axios.get(`http://localhost:8080/admin/admin/appRole/list`);
    return respon.data;

}