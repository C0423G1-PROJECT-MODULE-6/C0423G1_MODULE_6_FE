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

    const calculateMoney = () => {
        let total = 0;
        products.forEach((product) => {
            total += product.priceOrder * 1.2 * product.quantityOrder;
        });
        setTotalMoney(total);

        // Calculate VAT amount (10% of totalMoney)
        const vat = total * 0.1;
        setVatAmount(vat);

        // Calculate total amount with VAT
        const totalWithVat = total + vat;
        setTotalAmountWithVat(totalWithVat);
    };

    useEffect(() => {
        getInfoPDF();
        calculateMoney();
    }, []);

    const handleConvertToPDF = () => {
        const content = contentRef.current;

        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [1440, 2426],
            });
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('document.pdf');
        });
    };

    return (
        <div>
            <button onClick={handleConvertToPDF}>Chuyển đổi thành PDF</button>
            <Link className="btn btn-primary" to="/admin/sale/order/0">Quay về</Link>

            <div ref={contentRef}>
                <div className="inv-container">
                    <header className="inv-header">
                        <div className="inv-logo">
                            <img className="logo-on-top" src="../../../public/images/favicon.png" alt="" />
                        </div>
                        <div className="inv-title">
                            <h1 className="inv-main-title">HOÁ ĐƠN GIÁ TRỊ GIA TĂNG</h1>
                            <p style={{ color: "red" }}>Bản thể hiện hoá đơn điện tử</p>
                            <p>
                                Ngày<small> {day} </small> Tháng
                                <small>{month}</small> Năm
                                <small>{year}</small>
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
                                Số: <b style={{ color: "red" }}>00000001</b>
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
                                        : <b style={{ color: "red" }}>
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
                                        :<b style={{ color: "red" }}> 5702145439</b>
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
                            <span>Họ và tên người mua hàng</span>:
                            <small>
                                {customer ? customer.nameCustomer : ("..............................................................................................................................................................................................................................................")
                                }
                            </small>
                        </p>
                        <p className="buyer-first">
                            <span>Tên đơn vị</span>:
                            {/*<small>*/}
                            {/*    ..............................................................................................................................................................................................................................................*/}
                            {/*</small>*/}
                            <p>CÔNG TY CỔ PHầN CÔNG NGHỆ LỘC PHÁT</p>
                        </p>
                        <p className="buyer-first">
                            <span>Mã số thuế</span>:
                            {/*<small>*/}
                            {/*    ..............................................................................................................................................................................................................................................*/}
                            {/*</small>*/}
                            <p>2902177030</p>
                        </p>
                        <p className="buyer-first">
                            <span>Địa chỉ</span>:
                            {/*<small>*/}
                            {/*    ..............................................................................................................................................................................................................................................*/}
                            {/*</small>*/}
                            <p>
                                {customer && customer.addressCustomer}
                            </p>
                        </p>
                    </div>
                    <div className="description-info">
                        <table>
                            <tr>
                                <th>
                                    <p>STT</p>
                                </th>
                                <th>
                                    <p>Tên hàng hoá, dịch vụ</p>
                                </th>
                                <th>
                                    <p>Đơn vị tính</p>
                                </th>
                                <th>
                                    <p>Số lượng</p>
                                </th>
                                <th>
                                    <p>Đơn giá</p>
                                </th>
                                <th>
                                    <p>Thành tiền</p>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <p>1</p>
                                </td>
                                <td>
                                    <p>2</p>
                                </td>
                                <td>
                                    <p>3</p>
                                </td>
                                <td>
                                    <p>4</p>
                                </td>
                                <td>
                                    <p>5</p>
                                </td>
                                <td>
                                    <p>6 = 4 x 5</p>
                                </td>
                            </tr>
                            {products.map((product,index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {product.nameProduct}
                                    </td>
                                    <td>
                                        <p>Chiếc</p>
                                    </td>
                                    <td>
                                        {product.quantityOrder}
                                    </td>
                                    <td>
                                        {product.priceOrder * 1.2}
                                    </td>
                                    <td>
                                        {product.priceOrder * 1.2 * product.quantityOrder}
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
                                {orderBill ? totalMoney :
                                    (
                                        <small>
                                            .....................................................................................
                                        </small>
                                    )}

                            </p>
                            <p>
                                Tiền thuế giá trị gia tăng (10%):
                                {orderBill ? vatAmount :
                                    (
                                        <small>
                                            .....................................................................................
                                        </small>
                                    )}
                            </p>
                            <p>
                                Tổng cộng tiền thanh toán:
                                {orderBill ? totalAmountWithVat :
                                    (
                                        <small>
                                            .....................................................................................
                                        </small>
                                    )}
                            </p>
                        </div>
                    </div>

                    <div className="signature-info">
                        <div className="buyer-sig">
                            <p>
                                <b>Người mua hàng</b>
                            </p>
                        </div>
                        <div className="seller-sig">
                            <p>
                                <b>Người bán hàng</b>
                            </p>
                            <p>Đã được ký điện tử</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PrintPDF;
