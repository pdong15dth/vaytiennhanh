import Head from "next/head";
import { useState } from "react";
import Script from 'next/script'
import prisma from "../lib/prisma";
import HeaderClient from "../src/Script/HeaderClient";
import SEOTag from "../src/Script/seoTag";
import utils from "../src/utils/constant";

Index.getInitialProps = async (ctx) => {
    const require = await prisma.require.findMany({
        orderBy: { createdAt: 'desc' }
    });
    const faq = await prisma.faq.findFirst({
        orderBy: { id: 'asc' }
    })
    const benefit = await prisma.benefit.findFirst({
        orderBy: { id: 'asc' }
    })
    const ques = await prisma.question.findFirst({
        orderBy: { id: 'asc' }
    })
    const contact = await prisma.contact.findFirst({
        orderBy: { id: 'asc' }
    })
    const metaSEO = await prisma.seoWeb.findFirst({
        orderBy: { id: 'asc' }
    })
    const mess = prisma.$transaction
    return { props: { require, faq, benefit, ques, contact, metaSEO, mess } };
}

export default function Index({ props }) {
    const [error, setError] = useState([])

    console.log("have connected", props.mess)
    function checkAdult(string) {
        return string != "";
    }

    const submitData = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            err.push(utils.checkEmptyString(event.target.name.value))
            err.push(utils.checkPhoneNumber(event.target.phone.value))
            err.push(utils.checkEmptyString(event.target.address.value))
            err.push(utils.checkStringIsNumber(event.target.amount.value))
            err.push(utils.checkEmptyString(event.target.type_amount.value))

            for (let index = 0; index < err.length; index++) {
                const element = err[index];
                if (element != "") {
                    setError(err.filter(checkAdult))
                    return
                }
            }
            var data = JSON.stringify({
                "name": event.target.name.value,
                "phone": event.target.phone.value,
                "address": event.target.address.value,
                "amount": event.target.amount.value,
                "type_amount": event.target.type_amount.value
            });
            await fetch("/api/post", {
                method: "POST",
                body: data
            }).then(res => {
                console.log("dong ne", res.status)
                if (res.status == 200) {
                    alert("Đăng ký thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất");
                }
            })

            // await router.push('/');
        } catch (error) {
            setError(error)
        }
    };

    const showErrorForm = (error) => {
        if (error.length == 0) {
            return
        }
        console.log("showErrorForm", error)
        return error?.map((item, key) => {
            if (item != "") {
                return (
                    <li key={key} style={{ color: "red" }}>{item}</li>
                )
            }
        })
    }

    const renderFormThongTin = () => {
        return (
            <form onSubmit={submitData}>
                <div className="form-group">
                    <input type="text" name="name" id="name" className="form-control"
                        placeholder="Họ và tên" required />
                </div>
                <div className="form-group">
                    <input type="text" name="phone" id="phone" className="form-control"
                        placeholder="Nhập số điện thoại" required />
                </div>
                <div className="form-group">
                    <input type="text" name="address" id="address" className="form-control"
                        placeholder="Địa chỉ" required />
                </div>
                <div className="form-group">
                    <input type="number" name="amount" id="amount" className="form-control"
                        placeholder="Khoản vay mong muốn" required />
                </div>
                <div className="payment-box padding-bottom-20">
                    <div className="payment-method text-float-left background-white padding-select-register">
                        <p className="text-black">
                            <input type="radio" id="chuyenkhoan" name="type_amount" value="Đi làm hưởng lương chuyển khoản" />
                            <label htmlFor="chuyenkhoan"> Đi làm hưởng lương chuyển khoản</label>
                        </p>
                        <p className="text-black">
                            <input type="radio" id="tienmat" name="type_amount" value="Đi làm hưởng lương tiền mặt" />
                            <label htmlFor="tienmat"> Đi làm hưởng lương tiền mặt</label>
                        </p>
                        <p className="text-black">
                            <input type="radio" id="baobiem" name="type_amount" value="Tham gia bảo hiểm nhân thọ" />
                            <label htmlFor="baobiem"> Tham gia bảo hiểm nhân thọ</label>
                        </p>
                        <p className="text-black">
                            <input type="radio" id="cavet" name="type_amount" value="Có cavet xe máy, hóa đơn điện nước" />
                            <label htmlFor="cavet"> Có cavet xe máy, hóa đơn điện nước</label>
                        </p>
                    </div>
                </div>
                <button type="submit"
                    className="btn btn-light text-black col-lg-6 btn-register-center">Đăng ký
                    ngay</button>
                {error.length == 0 ? <></> : showErrorForm(error)}
            </form>

        )
    }
    return (
        <>
            <Head>
                {SEOTag(props?.metaSEO)}
            </Head>
            {HeaderClient()}
            <div className="preloader">
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>
            <header className="header-area">
                <div className="navbar-area">
                    <div className="evolta-nav">
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <div className="collapse navbar-collapse mean-menu d-flex justify-content-around"
                                    id="navbarSupportedContent">
                                    <div className="row">
                                        <div className="others-options">
                                            <a href="" className="btn btn-primary btn-header">VAY TÍNH CHẤP</a>
                                        </div>
                                        <div className="others-options">
                                            <a href="#" className="btn btn-primary btn-header">ĐĂNG KÝ VAY</a>
                                        </div>
                                        <div className="others-options">
                                            <a href={`tel:${props.contact?.phone}`} className="btn btn-primary btn-header">{props.contact?.phone}</a>
                                        </div>
                                        <div className="others-options">
                                            <a href="tuyen-dung" className="btn btn-primary btn-header">TUYỂN DỤNG</a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <section className="contact-area ptb-110" style={{ backgroundColor: "#fff" }}>
                <div className="container">
                    <div className="section-title">
                        <span>Liên hệ với chúng tôi</span>
                        <h2>Tuyển dụng nhân viên kinh doanh</h2>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua.</p> */}
                    </div>
                    <div className="contact-form">
                        <form id="contactForm">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="fullname" id="fullname" className="form-control" required
                                            data-error="Nhập Họ và Tên" placeholder="Họ & Tên" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="cmnd" id="cmnd" className="form-control" required
                                            data-error="Nhập CMND/CCCD" placeholder="CMND/CCCD" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="phone" id="phone" required
                                            data-error="Nhập số điện thoại" className="form-control" placeholder="Số điện thoại" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="address" id="address" className="form-control" required
                                            data-error="Nhập Địa chỉ" placeholder="Địa chỉ" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <button type="submit" className="btn btn-primary">Ứng tuyển</button>
                                    <div id="msgSubmit" className="h3 text-center hidden"></div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-content">
                            <h3>Liên hệ với chúng tôi qua Số Điện Thoại hoặt Email</h3>
                            <h2>
                                <a href={`tel:${props?.contact?.phone}`}>{props?.contact?.phone}</a>
                                <span>OR</span>
                                <a
                                    href={`mailto:${props?.contact?.email}`}><span
                                        className="__cf_email__"
                                        data-cfemail="fa9f8c95968e9bba9d979b9396d4999597">{props?.contact?.email}</span></a>
                            </h2>
                            <ul className="social">
                                <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-youtube"></i></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h3>Liên hệ</h3>
                                <div className="single-footer-widget">
                                    <div className="logo">
                                        <ul className="footer-contact-list">
                                            <li><span>Địa chỉ:</span> {props?.contact?.address}</li>
                                            <li><span>Email:</span> <a href="#"><span className="__cf_email__"
                                                data-cfemail={props?.contact?.email}>{props?.contact?.email}</span></a>
                                            </li>
                                            <li><span>Số Điện Thoại:</span> <a href={`tel:${props?.contact?.phone}`}>{props?.contact?.phone}</a></li>
                                        </ul>
                                    </div>
                                    <ul className="social">
                                        <li><a href="#" target="_blank"><i className="flaticon-facebook-letter-logo"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="flaticon-twitter-black-shape"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="flaticon-instagram-logo"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="flaticon-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="question-form text-center form-vay-1">
                                    <h3 className="text-black">ƯU ĐÃI 2%</h3>
                                    <p className="text-black">Đăng ký ngay nhận ưu đãi bất ngờ</p>
                                    {renderFormThongTin()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>Copyright 2020. All Rights Reserved.</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <ul>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="circle-map"><img src="/img/circle-map.png" alt="image" /></div>
            </footer>

            <div className="go-top"><i className="fas fa-arrow-up"></i><i className="fas fa-arrow-up"></i></div>
            {/* <!-- footer  --> */}
            <Script src="/js/jquery.min.js"></Script>
            <Script src="/js/popper.min.js"></Script>
            <Script src="/js/bootstrap.min.js"></Script>
            <Script src="/js/owl.carousel.min.js"></Script>
            <Script src="/js/parallax.min.js"></Script>
            <Script src="/js/jquery.magnific-popup.min.js"></Script>
            <Script src="/js/jquery.nice-select.min.js"></Script>
            <Script src="/js/jquery.meanmenu.js"></Script>
            <Script src="/js/progresscircle.min.js"></Script>
            <Script src="/js/wow.min.js"></Script>
            <Script src="/js/form-validator.min.js"></Script>
            <Script src="/js/contact-form-script.js"></Script>
            <Script src="/js/main.js"></Script>

        </>
    )
}