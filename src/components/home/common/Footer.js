import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="footer ">
                <div className="footer-container">
                    <div className="footer-top">
                        <a href=""
                        ><img
                                src="/images/logoplus.png"
                                alt="topzone-logo"
                                className="logo logo-bottom"
                            /></a>
                    </div>
                    <div className="footer-content">
                        <div className="first-part">
                            <h3 className="title">Tổng đài</h3>
                            <p>Mua hàng: <span>1900 9696 42</span></p>
                            <p>CSKH: <span>1900 9643 43</span></p>
                            <p className="connect-with-us">Kết nối với chúng tôi</p>
                            <div className="facebook-icon">
                                <i className="bx bxl-facebook"></i>
                            </div>
                            <div className="instagram-icon">
                                <i className="bx bxl-instagram"></i>
                            </div>
                            <div className="twitter-icon">
                                <i className="bx bxl-twitter"></i>
                            </div>
                        </div>
                        <div className="second-part">
                            <h3 className="title">Hệ thống cửa hàng</h3>
                            <p>Xem chi nhánh</p>
                            <p>Nội quy cửa hàng</p>
                            <p>Chất lượng phục vụ</p>
                            <p>Chính sách bảo hành</p>
                        </div>

                        <div className="third-part">
                            <h3 className="title">Hỗ trợ khách hàng</h3>
                            <p>Điều kiện giao dịch chung</p>
                            <p>Hướng dẫn mua hàng</p>
                            <p>Chính sách giao hàng</p>
                            <p>Hướng dẫn thanh toán</p>
                        </div>
                        <div className="fourth-part">
                            <h3 className="title">Thương hiệu TopZone</h3>
                            <p>Điều kiện giao dịch chung</p>
                            <p>Giới thiệu TopZone</p>
                            <p>Bán hàng doanh nghiệp</p>
                            <p>Chính sách ưu đãi</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>
                            © 2018. Công ty cổ phần C4 CodeGym. GPDKKD: 0303217354 do sở
                            KH & ĐT TP.HCM cấp ngày 02/01/2007.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;