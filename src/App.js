
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Order from "./components/order/Order";
import Information from "./components/user/Information";
import HomeAdmin from "./components/user/HomeAdmin";
import {axiosClient} from "./service/user/AxiosClient";
import Authentication from "./components/user/Authentication";
import Error403 from "./components/user/Error403";
import Error401 from "./components/user/Error401";
import { EnumAppUserRole } from "./components/user/EnumAppUserRole";
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


function App() {
    axiosClient();
    return (
        <>
            <ToastContainer></ToastContainer>
            <Routes>
//              
                <Route path='/employee' element={<EmployeeList></EmployeeList>}></Route>
                <Route path='/employee/edit' element={<EditEmployee></EditEmployee>}></Route>
                <Route path='/employee/create' element={<CreateEmployee/>}></Route>
                <Route path="/admin/order" element={<Order/>}/>
                <Route path="/admin/order/showBill" element={<ShowBill/>}/>
                <Route path="/admin/order/showBill/print" element={<PrintPDF/>}/>

                <Route path="/401" element={<Error401/>}/>
                {/*<Route path="*" element={<Home />}></Route>*/}
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/403" element={<Error403/>}/>
                <Route path="/customer" element={<CustomerList/>}/>
                <Route path="/history/:id" element={<ShoppingHistoryList/>}/>

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
                    <Route path="/admin/home" element={<HomeAdmin/>}></Route>
                    {/*<Route path="/login" element={<LoginForm />}></Route>*/}


                </Route>
            </Routes>
        </>
    );
}

export default App;
