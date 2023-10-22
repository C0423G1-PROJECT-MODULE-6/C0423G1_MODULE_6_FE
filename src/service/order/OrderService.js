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


export const findOrderBillNewest = async (idCustomer) => {
    try{
        const res = await axios
            .get(`http://localhost:8080/api/admin/order/payment/showBillNewest/${idCustomer}`)
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


export const getOrderNotPayByChoose =async (idCustomer,idUser, choose, object) => {
    try{
        let res;
        if (object === 1){
            res = await axios
                .get(`http://localhost:8080/api/admin/order/customer/getCartByChoose/${idCustomer}?_choose=${choose}&_object=${object}`)
        }else if (object === 2){
            res = await axios
                .get(`http://localhost:8080/api/admin/order/customer/getOrderNotPay/${idCustomer}/${idUser}?_choose=${choose}`)
            console.log(res)
        }
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const findCustomerById = async (data) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/admin/order/customer/${data}`)
        console.log(res.data)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const deleteChosenProduct =async (idProduct,idCustomer) => {
    try{
        console.log(idCustomer)
        console.log(idProduct)
        const res = await axios.post(`http://localhost:8080/api/admin/order/cart/deleteChosenProduct/${idProduct}/${idCustomer}`)
        console.log(res.status)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const updateQuantity = async (newQuantity, idProduct, idCustomer) => {
    try{
        const res = await axios.post(`http://localhost:8080/api/admin/order/cart/${idCustomer}/${idProduct}?_quantity=${newQuantity}`)
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

