import React from "react";
import * as appUserService from '../../service/user/AuthService';
import { Navigate, Outlet } from 'react-router-dom';



// COMPONENT AUTHORIZATION
const AuthorOfAdmin = ({ allowedRoles }) => {
    const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
    // const roleSale = appUserService.checkRoleAppUser("ROLE_SALE");
    // const roleBusiness = appUserService.checkRoleAppUser("ROLE_BUSINESS");
    // const roleWarehouse = appUserService.checkRoleAppUser("ROLE_WAREHOUSE");

    const infoUser = appUserService.infoAppUserByJwtToken();


    let roles;
    if (infoUser) {
        roles = infoUser.roleList;
    }

    return roles && roleAdmin  ? (
        <Outlet />
    ) : <Navigate to={`/403`} />

}

export default AuthorOfAdmin;