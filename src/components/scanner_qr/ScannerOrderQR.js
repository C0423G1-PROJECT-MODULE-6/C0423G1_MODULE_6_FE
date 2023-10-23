import React, {useEffect, useState} from 'react';
import {Html5QrcodeScanner} from 'html5-qrcode';
import {useNavigate} from 'react-router-dom';
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import * as customerService from "../../service/customer/CustomerService";
import {useParams} from "react-router";

function ScannerOrderQR() {
    const [showScanResult, setShowScanResult] = useState(false);
    const [idProduct, setIdProduct] = useState()
    const param = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    const handleDecodedText = async (decodedText) => {
        const productObj = JSON.parse(decodedText);
        setIdProduct(parseInt(productObj.id));
        console.log(parseInt(productObj.id))
        if (userId) {
            await customerService.createCart(param.idCustomer, parseInt(productObj.id));
            console.log("------------------")
            console.log(param.idCustomer)
            navigate(`/admin/sale/order/${param.idCustomer}`);
        }
    };

    const getUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
        }
    };
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        function success(decodedText, result) {
            handleDecodedText(decodedText);
            scanner.clear();
        }

        function error(err) {
            console.warn(err);
        }

        getUserId();
    }, [idProduct]);

    return (
        <>
            <p style={{marginLeft: '30%', marginRight: '30%', marginTop: '2%', minHeight: '560px'}}>
                {showScanResult === false && (
                    <div style={{minHeight: '560px', textAlign: 'center', border: 'none'}} id="reader"></div>
                )}
            </p>
        </>
    );
}


export default ScannerOrderQR;