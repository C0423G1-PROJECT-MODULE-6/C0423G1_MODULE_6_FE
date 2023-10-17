import axios from "axios";

export const deleteChosenProduct =async (idProduct,idUser) => {
    try{
        const res = await axios.post(`http://localhost:8080/api/admin/order/cart/deleteChosenProduct/${idUser},${idProduct}`)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const updateQuantity = async (newQuantity, idProduct, idUser) => {
    try{
        const res = await axios.post(`http://localhost:8080/api/admin/order/cart/${idUser}/${idProduct}?_quantity=${newQuantity}`)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const getAllCart =async (idUser) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/order/cart/${idUser}`)
        return res;
    } catch (e){
        alert("Access Denied 1");
    }
}