import axios from "axios";

export const getEmployeeList = async (page,searchJob, searchName,searchPhone) =>{
    try{
        
        const respon = await axios.get(`http://localhost:8080/api/admin/employee/list?page=${page}&searchJob=${searchJob}&searchName=${searchName}&searchPhone=${searchPhone}`);
        return respon.data;
    } catch(e){
        console.log(e);
    }
}
export const deleteEmployee = async (id) => {
    try{
        await axios.delete(`http://localhost:8080/api/admin/employee/delete/${id}`);
    }catch(e){
        console.log(e);
    }
}