import axios from "axios";

export const getEmployeeList = async (page, searchJob, searchName, searchPhone) => {
    try {

        const respon = await axios.get(`http://localhost:8080/admin/admin/employee/list?page=${page}&searchJob=${searchJob}&searchName=${searchName}&searchPhone=${searchPhone}`);
        return respon.data;
    } catch (e) {
        console.log(e);
    }
}
export const deleteEmployee = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/admin/admin/employee/delete/${id}`);
    } catch (e) {
        console.log(e);
    }

}
// CaoNV
export const crateEmployee = async (employeeDto) => {
    const res = await axios.post('http://localhost:8080/api/admin/employee/create', employeeDto);
    return res
}
export const getNewEmployee = async () => {
    const res = await axios.get('http://localhost:8080/api/admin/employee/create');
    return res
}
export const getEmployee = async (id) => {

    const res = await axios.get(`http://localhost:8080/api/admin/employee/${id}`);

    console.log(res);
    return res.data
}
export const updateEmployee = async (employee) => {
    const res = await axios.patch(`http://localhost:8080/api/admin/employee/update/${employee.id}`, employee);
    return res
}