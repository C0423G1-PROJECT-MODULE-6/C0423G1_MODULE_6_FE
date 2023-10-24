import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../../css/order/invoicePDF.css";
import * as orderService from "../../service/order/OrderService";
import moment from "moment";
import {Link} from "react-router-dom";

function PrintPDF() {
    const contentRef = useRef();
    const [customer, setCustomer] = useState(null);
    const [products, setProducts] = useState([]);
    const [orderBill, setOrderBill] = useState(null);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [totalMoney, setTotalMoney] = useState(0);
    const [vatAmount, setVatAmount] = useState(0);
    const [totalAmountWithVat, setTotalAmountWithVat] = useState(0);
    const initialInvoiceNumber = useRef(1);
    const [invoiceNumber, setInvoiceNumber] = useState(initialInvoiceNumber.current);

    const getInfoPDF = async () => {
        const res = await orderService.getInfoPDF();
        console.log(res);

        setCustomer(res.customer);
        setProducts(res.orderDetails);
        setOrderBill(res.orderBill);
        const date = res.orderBill.dateOfOrder;
        const day = moment(date).format("DD");
        const month = moment(date).format("MM");
        const year = moment(date).format("YYYY");
        setDay(day);
        setMonth(month);
        setYear(year);
    };
    useEffect(() => {
        calculateMoney();
    }, [products]);
    const calculateMoney = () => {
        let total = 0;

            products.forEach((product) => {
                total += product.priceOrder * product.quantityOrder;
            });
            setTotalMoney(total);

            const vat = total * 0.1;
            setVatAmount(vat);

            const totalWithVat = total + vat;
            setTotalAmountWithVat(totalWithVat);

    };

    useEffect(() => {
        getInfoPDF();
    }, []);

    const handleConvertToPDF = () => {
        const content = contentRef.current;

        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [2000, 2426],
            });
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('document.pdf');
            setInvoiceNumber(invoiceNumber + 1);
        });
    };

    return (
        <div>
            <Link className="btn btn-primary m-2" to="/admin/sale/order/0">Quay về</Link>
            <button className='btn btn-warning m-2' onClick={handleConvertToPDF}>Chuyển đổi thành PDF</button>

            <div ref={contentRef}>
                <div className="inv-container">
                    <header className="inv-header">
                        <div className="inv-logo">
                            <img className="logo-on-top" src="/images/favicon.png" alt="" />
                        </div>
                        <div className="inv-title">
                            <h1 className="inv-main-title">HOÁ ĐƠN GIÁ TRỊ GIA TĂNG</h1>
                            <p style={{ color: "red" }}>Bản thể hiện hoá đơn điện tử</p>
                            <p>
                                Ngày  {day} Tháng {month} Năm {year}
                            </p>
                        </div>
                        <div className="inv-right-part">
                            <p>
                                Mẫu số: <b>01THK34</b>
                            </p>
                            <p>
                                Ký hiệu: <b>AA/23</b>
                            </p>
                            <p>
                                Số: <b style={{ color: "red" }}>0000000{invoiceNumber}</b>
                            </p>
                        </div>
                    </header>
                    <div className="company-info">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <p>Đơn vị bán hàng</p>
                                </td>
                                <td>
                                    <p>
                                        : <b style={{ color: "red", fontSize:"18px" }}>
                                             CÔNG TY TRÁCH NHIỆM HỮU HẠN C04 ZONE
                                         </b>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Mã số thuế</p>
                                </td>
                                <td>
                                    <p>
                                        :<b style={{ color: "red" ,fontSize:"18px"}}> 5702145439</b>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Địa chỉ</p>
                                </td>
                                <td>
                                    <p>: 258 Trần Hưng Đạo, Sơn Trà, Đà Nẵng, Việt Nam</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Điện thoại</p>
                                </td>
                                <td>
                                    <p>: 0964 510 859</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Số tài khoản</p>
                                </td>
                                <td>
                                    <p>
                                        : 288 68 68 68 - Ngân hàng Việt Nam Thịnh Vượng - Chi Nhánh Sơn
                                        Trà
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="buyer-info">
                        <p className="buyer-first">
                            <span>Họ và tên người mua hàng </span>:
                            <span style={{marginLeft:'5px'}}>
                                 {customer ? customer.nameCustomer : ("..............................................................................................................................................................................................................................................")
                                }
                            </span>
                        </p>
                        <p className="buyer-first">
                            <span>Tên đơn vị</span>:
                            <span style={{marginLeft:'5px'}}>CÔNG TY CỔ PHầN CÔNG NGHỆ LỘC PHÁT</span>
                        </p>
                        <p className="buyer-first">
                            <span>Mã số thuế</span>:
                            <span style={{marginLeft:'5px'}}>2902177030</span>
                        </p>
                        <p className="buyer-first">
                            <span>Địa chỉ</span>:
                            <span style={{marginLeft:'5px'}}>
                                 {customer && customer.addressCustomer}
                            </span>
                        </p>
                    </div>
                    <div className="description-info" >
                        <table>
                            <tr>
                                <th>
                                    <p>STT</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(1)</p>
                                </th>
                                <th>
                                    <p>Tên hàng hoá, dịch vụ</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(2)</p>

                                </th>
                                <th>
                                    <p>Đơn vị tính</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(3)</p>

                                </th>
                                <th>
                                    <p>Số lượng</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(4)</p>

                                </th>
                                <th>
                                    <p>Đơn giá</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(5)</p>

                                </th>
                                <th>
                                    <p>Thành tiền</p>
                                    <p style={{lineHeight:'0',fontSize:'14px', fontWeight:'normal'}}>(6 = 4 x 5)</p>

                                </th>
                            </tr>
                            {products.map((product,index) => (
                                <tr key={index}>
                                    <td>
                                        <p>{index + 1}</p>
                                    </td>
                                    <td>
                                        <p>{product.nameProduct}</p>
                                    </td>
                                    <td>
                                        <p>Chiếc</p>
                                    </td>
                                    <td>
                                        <p>{product.quantityOrder}</p>
                                    </td>
                                    <td>
                                        <p>{(product.priceOrder).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </td>
                                    <td>
                                       <p> {(product.priceOrder * product.quantityOrder).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                                <td>
                                    <p />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="total-money-part">
                        <div className="vat-rate">
                            <p>
                                Thuế suất GTGT(VAT): 10%

                            </p>
                        </div>
                        <div className="money-stuff">
                            <p>
                                Cộng tiền hàng:
                                {orderBill ? ' ' + totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) :
                                    (
                                       <span>   Loading...</span>
                                    )}

                            </p>
                            <p>
                                Tiền thuế giá trị gia tăng (10%):
                                {orderBill ? ' ' + vatAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) :
                                    (
                                        <span>   Loading...</span>
                                    )}
                            </p>
                            <p>
                                Tổng cộng tiền thanh toán:
                                {orderBill ? ' ' + totalAmountWithVat.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) :
                                    (
                                        <span>   Loading...</span>
                                    )}
                            </p>
                        </div>
                    </div>

                    <div className="signature-info">
                        <div className="buyer-sig">
                            <p>
                                <span style={{fontWeight:'bold'}}>Người mua hàng</span>
                            </p>
                        </div>
                        <div className="seller-sig">
                            <p>
                                <span style={{fontWeight:'bold'}}>Người bán hàng</span>
                            </p>
                            <p style={{marginTop: "150px"}}>Đã được ký điện tử</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PrintPDF;
