import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

function ScanQr({ result }) {
    const [showScanResult, setShowScanResult] = useState(false);
    const [cameraActive, setCameraActive] = useState(true);
    const navigate = useNavigate();

    const handleDecodedText = (decodedText) => {
        console.log(decodedText);
        navigate('/admin/ware/warehouse/import/' + decodedText);
        setCameraActive(false);
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

        // Cleanup the scanner when the component unmounts
        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <>
            <p style={{ marginLeft: '30%', marginRight: '30%', marginTop: '2%', minHeight: '560px' }}>
                {showScanResult === false && cameraActive && (
                    <div style={{ minHeight: '560px', textAlign: 'center', border: 'none' }} id="reader"></div>
                )}
            </p>
        </>
    );
}

export default ScanQr;












