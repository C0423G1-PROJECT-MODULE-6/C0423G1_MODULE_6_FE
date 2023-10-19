import axios from "axios";

export const getSaleHistory = async (limit, page, searchName) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/order/saleHistory?_limit=${limit}&_page=${page}&name_like=${searchName}`);
        return res;
    }catch (e) {
        console.log(e);
    }
};


export const acceptToPay = async (print, orderBill) => {
    try{
        const res = await axios
            .post(`http://localhost:8080/api/admin/order/payment/acceptPay?_printStatus=${print}`,orderBill)
        console.log("serv " + res)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const findOrderBillNewest = async () => {
    try{
        const res = await axios
            .get(`http://localhost:8080/api/admin/order/payment/showBillNewest`)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const getBillNotPay = async (value) => {
    try{
        const res = await axios
            .post(`http://localhost:8080/api/admin/order/payment/showBill`,value)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const getOrderNotPayByChoose =async (idCustomer, idUser, choose) => {
    try{
        const res = await axios
            .get(`http://localhost:8080/api/admin/order/customer/getOrderNotPay/${idCustomer}/${idUser}?_choose=${choose}`)
        console.log("1service"+ JSON.stringify(res.data))
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const findCustomerById = async (data) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/admin/order/customer/${data}`)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


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
        console.log(idUser)
        const res = await axios.get(`http://localhost:8080/api/admin/order/cart/${idUser}`)
        console.log(res)
        return res;
    } catch (e){
        alert("Access Denied 1");
    }
}

