import ReactToPdf from "react-to-pdf";
import React, { useRef, useState } from "react";

function PrintPDF() {
    const pdfRef = useRef();
    const [pdfGenerated, setPdfGenerated] = useState(false);

    const generatePdf = () => {
        setPdfGenerated(true);
        // Tạo PDF và thực hiện các xử lý khác nếu cần
    };

    return (
        <div>
            <ReactToPdf targetRef={pdfRef} filename="example.pdf">
                {({ toPdf }) => (
                    <button onClick={generatePdf} disabled={pdfGenerated}>
                        {pdfGenerated ? "PDF Đã Được Tạo" : "Tạo và In PDF"}
                    </button>
                )}
            </ReactToPdf>
            <div>
                <div ref={pdfRef}>
                    {/* Nội dung mà bạn muốn in ra PDF */}
                    <h1>Đây là nội dung PDF</h1>
                    <p>Chào mừng bạn đến với ứng dụng React-to-PDF.</p>
                </div>
            </div>
        </div>
    );
}

export default PrintPDF;
