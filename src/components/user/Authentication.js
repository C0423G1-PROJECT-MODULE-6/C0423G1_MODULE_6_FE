import React from "react";
import * as appUserService from '../../service/user/AuthService';
import { Navigate, Outlet } from 'react-router-dom'


const hasValueInAuthorProperty = (allowedRoles, currentRoles) => {
    for (let i = 0; i < allowedRoles.length; i++) {
        const valueToCheck = allowedRoles[i];
        for (let j = 0; j < currentRoles.length; j++) {
            const obj = currentRoles[j];
            if (obj.authority === valueToCheck) {
                return true;
            }
        }
    }
    return false;
}


// COMPONENT AUTHORIZATION
const Authentication = ({ allowedRoles }) => {


    const infoUser = appUserService.infoAppUserByJwtToken();


    let roles;
    if (infoUser) {
        roles = infoUser.roleList;
    }

    return roles && hasValueInAuthorProperty(allowedRoles, roles) ? (
        <Outlet />
    ) : <Navigate to={`/401`} />

}

export default Authentication;