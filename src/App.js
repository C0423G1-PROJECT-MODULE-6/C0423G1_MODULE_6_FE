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
import {ImportProduct} from './components/warehouse/ImportProduct';
import Supplier from "./components/supplier/Supplier";
import SalesReport from "./components/sales_report/SalesReport";
import CreateProduct from "./components/product/CreateProduct";
import Home from './components/home/home/Home';
import List from './components/home/home/List';
import Detail from './components/home/home/Detail';
import CreateSupplier from "./components/supplier/CreateSupplier";
import {SaleHistory} from "./components/order/SaleHistory";
import ScannerQR from "./components/scanner_qr/ScannerQR";
import ScannerOrderQR from "./components/scanner_qr/ScannerOrderQR";
import EditSupplier from "./components/supplier/EditSupplier";
import { Warehouse } from './components/warehouse/Warehouse';
import UpdateProduct from "./components/product/UpdateProduct";



function App() {
    axiosClient();
    return (
        <>
            <ToastContainer></ToastContainer>
            <Routes>
                <Route path="*" element={<Home/>}/>
                <Route path="/401" element={<Error401/>}/>
                <Route path="/403" element={<Error403/>}/>
                <Route path="/login" element={<LoginForm/>}/>

                <Route path='/home' element={<Home/>}/>
                <Route path="/list/" element={<List/>}/>
                <Route path="/list/:type" element={<List/>}/>
                <Route path="/detail/:type/:id" element={<Detail/>}/>


                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_ADMIN,
                                EnumAppUserRole.ROLE_SALE,
                                EnumAppUserRole.ROLE_BUSINESS,
                                EnumAppUserRole.ROLE_WAREHOUSE
                            ]}
                        />
                    }
                >
                    <Route path="/admin/information/:id" element={<Information/>}/>
                    <Route path="/admin/home" element={<HomeAdmin/>}/>
                    <Route path="/admin/*" element={<HomeAdmin/>}/>
                </Route>

                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_ADMIN
                            ]}
                        />
                    }
                >
                    <Route path="/admin/admin/employee" element={<EmployeeList/>}/>
                    <Route path="/admin/admin/employee/edit" element={<EditEmployee/>}/>
                    <Route path="/admin/admin/employee/create" element={<CreateEmployee/>}/>
                </Route>


                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_SALE,
                                EnumAppUserRole.ROLE_ADMIN
                            ]}
                        />
                    }
                >
                    <Route path="/admin/sale/order" element={<Order/>}/>
                    <Route path="/admin/sale/order/showBill/:id" element={<ShowBill/>}/>
                    <Route path="/admin/sale/order/showBill/print" element={<PrintPDF/>}/>
                    <Route path="/admin/sale/scanner-qr-order/:idCustomer" element={<ScannerOrderQR/>}/>
                </Route>

                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_BUSINESS,
                                EnumAppUserRole.ROLE_ADMIN
                            ]}
                        />
                    }
                >
                    <Route path="/admin/business/supplier" element={<Supplier/>}/>
                    <Route path="/admin/business/supplier/create" element={<CreateSupplier/>}/>
                    <Route path="/admin/business/supplier/edit/:id" element={<EditSupplier/>}/>
                    <Route path="/admin/business/customer" element={<CustomerList/>}/>
                    <Route path="/admin/business/customer/history/:id" element={<ShoppingHistoryList/>}/>
                    <Route path="/admin/business/order/saleHistory" element={<SaleHistory/>}/>
                    <Route path="/admin/business/product/list" element={<SaleHistory/>}/>
                    <Route path="/admin/business/salereport" element={<SalesReport/>}/>
                </Route>

                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_WAREHOUSE,
                                EnumAppUserRole.ROLE_ADMIN
                            ]}
                        />
                    }
                >
                    <Route path="/admin/ware/warehouse/import/:product" element={<ImportProduct/>}/>
                    <Route path="/admin/ware/warehouse" element={<Warehouse/>}/>
                    <Route path="/admin/ware/scanner-qr" element={<ScannerQR/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;



