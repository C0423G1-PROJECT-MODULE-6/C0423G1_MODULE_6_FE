import axios from "axios";

export const getInfoPDF =async () => {
    const res = await axios.get(`http://localhost:8080/api/admin/sale/order/printPDF`);
    return res.data;
};


export const findCustomerByIdScan =async (idCustomer) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/admin/sale/order/customerScan/${idCustomer}`);
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const getSaleHistory = async (limit, page, searchName,sort,other) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/business/order/saleHistory?_limit=${limit}&_page=${page}&name_like=${searchName}&sort=${sort}&other=${other}`);
        return res;
    }catch (e) {
        console.log(e);
    }
};


export const acceptToPay = async (print, orderBill) => {
    try{
        const res = await axios
            .post(`http://localhost:8080/api/admin/sale/order/payment/acceptPay?_printStatus=${print}`,orderBill)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const findOrderBillNewest = async (idCustomer) => {
    try{
        const res = await axios
            .get(`http://localhost:8080/api/admin/sale/order/payment/showBillNewest/${idCustomer}`)

        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const getBillNotPay = async (value) => {
    try{
        const res = await axios
            .post(`http://localhost:8080/api/admin/sale/order/payment/showBill`,value)
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
                .get(`http://localhost:8080/api/admin/sale/order/customer/getCartByChoose/${idCustomer}?_choose=${choose}&_object=${object}`)
        }else if (object === 2){
            res = await axios
                .get(`http://localhost:8080/api/admin/sale/order/customer/getOrderNotPay/${idCustomer}/${idUser}?_choose=${choose}`)
        }
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const findCustomerById = async (data) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/admin/sale/order/customer/${data}`)
        return res.data;
    }catch (e){
        alert("Access Denied");
    }
};


export const deleteChosenProduct =async (idProduct,idCustomer) => {
    try{
        const res = await axios.post(`http://localhost:8080/api/admin/sale/order/cart/deleteChosenProduct/${idProduct}/${idCustomer}`)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const updateQuantity = async (newQuantity, idProduct, idCustomer) => {
    try{
        const res = await axios.post(`http://localhost:8080/api/admin/sale/order/cart/${idCustomer}/${idProduct}?_quantity=${newQuantity}`)
        return res;
    }catch (e){
        alert("Access Denied");
    }
};


export const getAllCart =async (idUser) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/sale/order/cart/${idUser}`)
        return res;
    } catch (e){
        alert("Access Denied 1");
    }
}

