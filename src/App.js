import Information from "./components/user/Information";
import HomeAdmin from "./components/user/HomeAdmin";
import {axiosClient} from "./service/user/AxiosClient";
import Authentication from "./components/user/Authentication";
import Error403 from "./components/user/Error403";
import Error401 from "./components/user/Error401";
import {EnumAppUserRole} from "./components/user/EnumAppUserRole";
import React from "react";
import {Routes, Route} from "react-router";
import {ToastContainer} from "react-toastify";
import {ShoppingHistoryList} from "./components/customer/ShoppingHistoryList";
import {CustomerList} from "./components/customer/CustomerList";
import LoginForm from "./components/user/LoginForm";


function App() {
    axiosClient();
    return (
        <>
            <ToastContainer></ToastContainer>
            <Routes>
                <Route path="/401" element={<Error401/>}/>
                {/*<Route path="*" element={<Home />}></Route>*/}
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/403" element={<Error403/>}/>

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
