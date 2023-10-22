import React, {useEffect, useState} from 'react';
import {Html5QrcodeScanner} from 'html5-qrcode';
import {useNavigate} from 'react-router-dom';
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import * as customerService from "../../service/customer/CustomerService";

function ScannerOderQR({result}) {
    const [showScanResult, setShowScanResult] = useState(false);
    const [idProduct, setIdProduct] = useState()
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    const handleDecodedText = async (decodedText) => {
        const productObj = JSON.parse(decodedText);
        setIdProduct(parseInt(productObj.id));
        if (userId) {
            const result = await customerService.createCart(userId, parseInt(productObj.id));
            navigate('/admin/order');
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

export default ScannerOderQR;
