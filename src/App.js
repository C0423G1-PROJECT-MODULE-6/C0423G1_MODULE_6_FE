import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Order from "./components/order/Order";
import Information from "./components/user/Information";
import HomeAdmin from "./components/user/HomeAdmin";
import {axiosClient} from "./service/user/AxiosClient";
import Authentication from "./components/user/Authentication";
import Error403 from "./components/user/Error403";
import Error401 from "./components/user/Error401";
import {EnumAppUserRole} from "./components/user/EnumAppUserRole";
import EmployeeList from './components/user/EmployeeList';
import EditEmployee from './components/user/EditEmployee';
import React from "react";
import {ToastContainer} from "react-toastify";
import {ShoppingHistoryList} from "./components/customer/ShoppingHistoryList";
import {CustomerList} from "./components/customer/CustomerList";
import LoginForm from "./components/user/LoginForm";
import CreateEmployee from './components/user/CreateEmployee';
import ShowBill from "./components/order/ShowBill";
import PrintPDF from "./components/order/PrintPDF";
import ProductList from "./components/product/ProductList";
import {Warehouse} from './components/warehouse/Warehouse';
import {ImportProduct} from './components/warehouse/ImportProduct';
import Supplier from "./components/supplier/Supplier";
import SalesReport from "./components/sales_report/SalesReport";
import CreateProduct from "./components/product/CreateProduct";
import UpdateProduct from "./components/product/UpdateProduct";


import Home from './components/home/home/Home';
import List from './components/home/home/List';
import Detail from './components/home/home/Detail';
import CreateSupplier from "./components/supplier/CreateSupplier";
import {SaleHistory} from "./components/order/SaleHistory";


function App() {
    axiosClient();
    return (
        <>
            <ToastContainer></ToastContainer>

            <Routes>

                <Route path="*" element={<Home/>}></Route>
                <Route path="/401" element={<Error401/>}/>
                <Route path="/403" element={<Error403/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path="/list/:type" element={<List/>}/>
                <Route path="/admin/product/update/:id" element={<UpdateProduct/>}/>
                <Route path="/admin/product/list" element={<ProductList/>}/>
                <Route path="/detail/:type/:id" element={<Detail/>}/>


                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_ADMIN,
                                EnumAppUserRole.ROLE_SALE,
                                EnumAppUserRole.ROLE_BUSINESS,
                                EnumAppUserRole.ROLE_WAREHOUSE,
                            ]}
                        />
                    }
                >
                    <Route path="/admin/information/:id" element={<Information/>}></Route>
                    <Route path="/admin/*" element={<HomeAdmin/>}></Route>
                    <Route path='/admin/employee' element={<EmployeeList></EmployeeList>}></Route>
                    <Route path='/admin/employee/edit' element={<EditEmployee></EditEmployee>}></Route>
                    <Route path='/admin/employee/create' element={<CreateEmployee/>}></Route>
                    <Route path="/admin/order" element={<Order/>}/>
                    <Route path="/admin/business/customer" element={<CustomerList/>}/>
                    <Route path="/admin/business/customer/history/:id" element={<ShoppingHistoryList/>}/>
                    <Route path="/admin/warehouse" element={<Warehouse/>}/>
                    <Route path="/admin/warehouse/import" element={<ImportProduct/>}/>
                    <Route path="/admin/supplier" element={<Supplier/>}/>

                    <Route path="/admin/supplier/create" element={<CreateSupplier/>}/>
                    <Route path="/admin/product/list" element={<ProductList/>}/>
                    <Route path="/admin/product/create" element={<CreateProduct/>}/>

                    <Route path="/admin/salesreport" element={<SalesReport/>}/>
                    <Route path="/admin/order" element={<Order/>}/>
                    <Route path="/admin/order/showBill" element={<ShowBill/>}/>
                    <Route path="/admin/order/showBill/print" element={<PrintPDF/>}/>
                    <Route path="/admin/order/saleHistory" element={<SaleHistory/>}/>


                </Route>
            </Routes>
        </>
    );
}

export default App;



