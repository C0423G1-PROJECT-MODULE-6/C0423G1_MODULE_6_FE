import axios from "axios"
export const getAllWarehouse = async () => {
    try{
        const res = await axios.get("http://localhost:8080/api/admin/warehouse")
        console.log(res);
        return res.data.content
    }catch(e){
        console.log(e);
    }
}