import Head from "next/head";
import { Fragment, useState, useEffect } from "react";
import Script from 'next/script'
import prisma from "../../lib/prisma";
import HeaderClient from "../../src/Script/HeaderClient";
import SEOTag from "../../src/Script/seoTag";
import utils from "../../src/utils/constant";
import Loading from "../../src/Loading";
import localStorageService from "../../src/services/localStorage.service/localStorage.service";
import { CountRequest } from "../../src/models/CountRequestData";
import ReactHtmlParser from "react-html-parser";

Index.getInitialProps = async ({ req, res }: any) => {
    const contact = await prisma.contact.findFirst()
    const metaSEO = await prisma.seoWeb.findFirst()
    const menu = await prisma.menuHeader.findFirst({
        where: {
            id: 1
        }
    })
    const option = await prisma.option.findMany()
    const count = await prisma.countRequest.findFirst({
        where: {
            id: 1
        }
    })
    const titleHeader = await prisma.titleHeader.findFirst({
        where: {
            id: 1
        }
    })

    var currentData = await prisma.tuyenDung.findFirst({
        where: {
            id: 1
        }
    })

    const mess = prisma.$transaction
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(/, /) : req.connection.remoteAddress
    return { props: { ip, count, contact, metaSEO, mess, menu, option, titleHeader, currentData } };
}

export default function Index({ props }) {
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const count = props?.count

    const currentData = props?.currentData
    console.log("have connected", props.mess)
    function checkAdult(string) {
        return string != "";
    }

    useEffect(() => {
        var timeSpace = Date.now() - (localStorageService.countRequest.get()?.time as any) ?? 0
        if (timeSpace > 20000 || isNaN(timeSpace)) {
            fetch("/api/count", {
                method: "POST"
            }).then(result => result.json().then(res => {
                console.log("cap nhat count thanh cong")
                console.log(res)
                localStorageService.countRequest.set(new CountRequest({
                    ipAddress: props.ip,
                    time: `${Date.now()}`
                }))

            }))
        }
    }, [])

    const submitData = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            if (utils.checkEmptyString(event.target.name.value) != "") {
                err.push(utils.checkEmptyString(event.target.name.value))
            }
            if (utils.checkPhoneNumber(event.target.phone.value) != "") {
                err.push(utils.checkPhoneNumber(event.target.phone.value))
            }
            if (utils.checkEmptyString(event.target.address.value) != "") {
                err.push(utils.checkEmptyString(event.target.address.value))
            }

            if (utils.checkAmountInput(event.target.amount.value) != "") {
                err.push(utils.checkAmountInput(event.target.amount.value))
            }
            if (utils.checkEmptyString(event.target.type_amount.value) != "") {
                err.push(utils.checkEmptyString(event.target.type_amount.value))
            }


            const newErr = []
            for (let index = 0; index < err.length; index++) {
                if (err[index]) {
                    newErr.push(err[index])
                }
            }
            if (newErr.length > 0) {
                setError(newErr)
                return
            } else {
                setIsLoading(true)
                console.log(newErr)
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
                    console.log("res", res.status)
                    if (res.status == 200) {
                        alert("Đăng ký thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất");
                    }
                    setIsLoading(false)

                })
            }
            // await router.push('/');
        } catch (error) {
            console.log("dong error")
            setError(error)
        }
    };

    const showErrorForm = (error) => {
        if (error.length == 0) {
            return
        }
        console.log("showErrorForm", error)
        return error?.map((item, key) => {
            if (item != "" && item != undefined) {
                return (
                    <li key={key} style={{ color: "red" }}>{item}</li>
                )
            }
        })
    }

    const onChangeAmout = (event) => {
        console.log(event)
    }
    const renderOption = (options) => {
        return options?.map((item, index) => {
            return (
                <p className="text-black" key={index}>
                    <input type="radio" id={item?.id} name="type_amount" value={item?.title} />{"     "}
                    <label htmlFor={item?.id}>{item?.title}</label>
                </p>
            )
        })
    }
    const renderFormThongTin = () => {
        return (
            <>
                <h3 className="text-white">{props?.titleHeader?.voucher}</h3>
                <p className="text-white">{props?.titleHeader?.subTitleVoucher}</p>

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
                        <input type="number" name="amount" id="amount" onChange={(event) => onChangeAmout(event)} className="form-control"
                            placeholder="Khoản vay mong muốn" />
                    </div>
                    <div className="payment-box padding-bottom-20">
                        <div className="payment-method text-float-left background-white padding-select-register">
                            {renderOption(props?.option)}
                        </div>
                    </div>
                    {isLoading ? Loading() : <Fragment></Fragment>}
                    <button type="submit"
                        className="btn btn-light text-black col-lg-6 btn-register-center">Đăng ký
                        ngay</button>
                    {error.length == 0 ? <></> : showErrorForm(error)}
                </form>
            </>
        )
    }
    return (
        <>
            <Head>
                {SEOTag(props?.metaSEO)}
            </Head>
            {HeaderClient()}
            <header className="header-area">
                <div className="navbar-area">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand navbar-light">
                            <div className="collapse navbar-collapse mean-menu d-flex justify-content-around"
                                id="navbarSupportedContent">
                                <div className="row text-center">
                                    <div className="col-lg-3 col-md-6 col-sm-6 main-menu-custom">
                                        <a href="/" className="btn btn-primary btn-header">{props.menu?.menu1}</a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 main-menu-custom">
                                        <a href="/vay-tin-chap" className="btn btn-primary btn-header">{props.menu?.menu2}</a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 main-menu-custom">
                                        <a href={`tel:${props.contact?.phone}`} className="btn btn-primary btn-header">{props.menu?.menu4}</a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 main-menu-custom">
                                        <a href="tuyen-dung" className="btn btn-primary btn-header">{props.menu?.menu3}</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <section className="contact-area ptb-110" style={{ backgroundColor: "#fff" }}>
                <div className="container shadow p-3 mb-5 bg-white rounded">

                    {/* <div className="row">
                        <div className="col-lg-2 float-left">
                        </div>
                        <div className="col-lg-5 float-left ">
                            <h2 style={{ padding: '0.5rem' }}>{currentData?.titleJob}</h2>
                            <table className="table table-borderless">
                                <tr>
                                    <td className="font-weight-bold">Nơi Làm Việc:</td>
                                    <td>{currentData?.address}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Cấp Bật:</td>
                                    <td>{currentData?.rank}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Hình Thức:</td>
                                    <td>{currentData?.form}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Bằng Cấp:</td>
                                    <td>{currentData?.certificate}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Kinh Nghiệm:</td>
                                    <td>{currentData?.experience}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Mức Lương:</td>
                                    <td>{currentData?.rangeSalary}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Ngành Nghề:</td>
                                    <td>{currentData?.career}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Hạn Chót Nhận Hồ Sơ:</td>
                                    <td>{currentData?.deadline}</td>
                                </tr>

                            </table>
                            <div className="btn-box">
                                <a href="#formhead" className="main-color btn btn-primary ">Nộp Đơn</a>
                                <p style={{ display: "inline-block", paddingLeft: 20, color: 'red' }}>Bạn đã sẵn sàng ứng tuyển?</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-lg-10 float-left ">
                            <h2 className="font-weight-bold" style={{ padding: '0.5rem' }}>Phúc lợi</h2>
                            <div className="form-row">
                                {currentData?.welfare?.map((item, index) => {
                                    return (
                                        <div className="col-6" key={index}>
                                            <label className="col-sm-6 col-form-label font-weight-bold"><span><i className="bx bx-check-double"></i></span>{item}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-lg-10 float-left ">
                            <h2 className="font-weight-bold" style={{ padding: '0.5rem' }}>Mô Tả Công Việc</h2>
                            <div className="col-12">
                                {ReactHtmlParser(currentData?.descriptionJob)}
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row" id="formhead">
                        <div className="col-lg-10 float-left ">
                            <h2 className="font-weight-bold" style={{ padding: '0.5rem' }}>Yêu Cầu Công Việc</h2>
                            <div className="col-12">
                                {ReactHtmlParser(currentData?.requirementJob)}
                            </div>
                        </div>
                    </div>*/}
                    <div className="row align-items-center">
                        <div className="col-md-12 main-content">
                            {ReactHtmlParser(currentData?.content)}
                        </div>
                    </div>
                    <hr className="my-4" /> 
                    <div className="section-title" >
                        <span>Form Thông Tin Tuyển Dụng</span>
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
                            <h3>Liên hệ với chúng tôi qua Số Điện Thoại hoặc Email</h3>
                            <h2>
                                <a href={`tel:${props?.contact?.phone}`}>{props?.contact?.phone}</a>
                                <span>HOẶC</span>
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ padding: '0 80px' }}>
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
                                            <li><span>Lượt Truy Cập:</span>{" "}<strong>{count?.count}</strong></li>
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
                            {/* <div className="single-footer-widget">
                                <div className="question-form text-center form-vay-1">
                                    {renderFormThongTin()}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>Copyright 2021. All Rights Reserved.</p>
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