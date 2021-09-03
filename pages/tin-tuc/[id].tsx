import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Script from 'next/script'
import prisma from "../../lib/prisma";
import HeaderClient from "../../src/Script/HeaderClient";
import SEOTag from "../../src/Script/seoTag";
import utils from "../../src/utils/constant";
import Loading from "../../src/Loading";
import ReactHtmlParser from "react-html-parser";
import localStorageService from "../../src/services/localStorage.service/localStorage.service";
import { CountRequest } from "../../src/models/CountRequestData";
import { DocumentContext } from "next/document";
import { useRouter } from "next/router";

Index.getInitialProps = async (ctx: DocumentContext) => {
    const contact = await prisma.contact.findFirst()
    const metaSEO = await prisma.seoWeb.findFirst()
    const gioithieu = await prisma.news.findFirst({
        where: {
            id: parseInt(`${ctx.query.vttc}`)
        }
    })
    const menu = await prisma.menuHeader.findFirst({
        where: {
            id: 1
        }
    })
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
    const social = await prisma.social.findFirst({
        where: {
            id: 1
        }
    })
    const option = await prisma.option.findMany()
    return { props: { social, contact, metaSEO, menu, option, gioithieu, count, titleHeader, query: ctx.query, headers: ctx.req.headers } };
}

export default function Index({ props }) {
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const count = props?.count
    const router = useRouter()
    const domain = props?.headers.host + router.asPath
    useEffect(() => {
        var timeSpace = Date.now() - (localStorageService.countRequest.get()?.time as any) ?? 0
        if (timeSpace > 20000 || isNaN(timeSpace)) {
            fetch("/api/count", {
                method: "POST"
            }).then(result => result.json().then(res => {
                console.log("cap nhat count thanh cong")
                localStorageService.countRequest.set(new CountRequest({
                    ipAddress: props?.ip,
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

            if (utils.checkEmptyString(event.target.amount.value) != "") {
                err.push(utils.checkEmptyStringForm(event.target.amount.value))
            }
            if (utils.checkEmptyString(event.target.type_amount.value) != "") {
                err.push(utils.checkEmptyStringForm(event.target.type_amount.value))
            }


            const newErr = []
            for (let index = 0; index < err.length; index++) {
                if (err[index]) {
                    console.log(err)
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
            setError(error)
            setIsLoading(false)
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

    const renderOption = (options) => {
        return options?.map((item, index) => {
            return (
                <option key={index} defaultValue={item.title}>{item.title}</option>
            )
        })
    }
    const renderOptionAmout = () => {
        return (
            utils.amoutList.map((item, index) => {
                return (
                    <option key={index} defaultValue={item.stringAmount}>{item.stringAmount}</option>
                )
            })
        )
    }
    const renderFormThongTin = () => {
        return (
            <>
                <h3 className="text-white">{props?.titleHeader?.voucher}</h3>
                <p className="text-white">{props?.titleHeader?.subTitleVoucher}</p>
                <form onSubmit={submitData}>
                    <div className="form-group">
                        <input type="text" name="name" id="name" className="form-control"
                            placeholder="Họ và Tên" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="address" id="address" className="form-control"
                            placeholder="Số Chứng Minh Nhân Dân / CCCD" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="phone" id="phone" className="form-control"
                            placeholder="Số Điện Thoại" required />
                    </div>
                    <div className="form-group">
                        <select className="form-control" name="amount" id="amount">
                            <option value="">Khoản Vay Mong Muốn</option>
                            {renderOptionAmout()}
                        </select>
                        {/* <input type="number" name="amount" id="amount" onChange={(event) => onChangeAmout(event)} className="form-control"
                            placeholder="Khoản vay mong muốn" /> */}
                    </div>
                    <div className="form-group">
                        <select className="form-control" name="type_amount" id="type_amount">
                            <option value="">Chọn Hình Thức Vay</option>
                            {renderOption(props?.option)}
                        </select>
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
                {/* {props?.gioithieu?.createdBy} */}
                <title>{props?.gioithieu?.title}</title>
                <meta
                    name="description"
                    content={props?.gioithieu?.description}
                />
                <meta
                    property="og:image"
                    content={props?.gioithieu?.avatar}
                />
                <meta property="og:url" content={domain} />
                <meta
                    property="og:title"
                    content={props?.gioithieu?.title}
                />
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
                                        <a href={`/tin-tuc`} className="btn btn-primary btn-header">{props.menu?.menu4}</a>
                                        {/* <a href={`tel:${props.contact?.phone}`} className="btn btn-primary btn-header">{props.menu?.menu4}</a> */}
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
            <div className="buttonZalo">
                <div className="avatar mr-50">
                    <a href={`https://chat.zalo.me/?phone=${props.social?.value}`} target="_blank" rel="noopener noreferrer">
                        <img src="../../../img/iconZalo1839_700.png" id="zalo" alt="avtar img holder" height="60" width="60" />
                    </a>
                </div>
            </div>
            <div className="buttonCall">
                <div className="avatar mr-50">
                    <a href={`tel:${props.contact?.phone}`} target="_blank" rel="noopener noreferrer">
                        <img src="../../../img/icon-call.png" id="zalo" alt="avtar img holder" height="60" width="60" />
                    </a>
                </div>
            </div>
            <section className="about-area ptb-110" style={{ backgroundColor: "#fff" }}>
                <div className="container">
                    <div className="section-title">
                        {/* <h2>Giới Thiệu</h2> */}
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua.</p> */}
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-8 blog-details">
                            <div className="page-title-content">
                                <h2 style={{ color: "black" }}>{props?.gioithieu?.title}</h2>
                            </div>
                            <div className="article-image">
                                <img src={props?.gioithieu?.avatar} alt="image" />
                            </div>
                            <div className="article-content">
                                <div className="entry-meta">
                                    <ul>
                                        <li><span>Ngày đăng:</span> <a href="#">{`${utils.formatDate(`${props?.gioithieu?.createdAt}`)}`}</a></li>
                                        <li><span>Người viết:</span> <a href="#">{props?.gioithieu?.createdBy}</a></li>
                                    </ul>
                                </div>
                                <p>{props?.gioithieu?.description}</p>
                                {ReactHtmlParser(props?.gioithieu?.detail)}
                            </div>
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
                            <div className="single-footer-widget">
                                <div className="question-form text-center form-vay-1">
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
            <div id="fb-root"></div>

            {/* <!-- Your Plugin chat code --> */}
            <div id="fb-customer-chat" className="fb-customerchat">
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "1583344378657934");
  chatbox.setAttribute("attribution", "biz_inbox");
  
  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v11.0'
    });
  };
  
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
`}}></script>
            <div className="go-top"><i className="fas fa-arrow-up"></i><i className="fas fa-arrow-up"></i></div>
            <script src="/messageFacebook.js"></script>
            {/* <!-- footer  --> */}
            <Script src="/js/jquery.min.js"></Script>
            <Script src="/js/popper.min.js"></Script>
            <Script src="/js/bootstrap.min.js"></Script>
            {/* <Script src="/js/owl.carousel.min.js"></Script> */}
            <Script src="/js/parallax.min.js"></Script>
            <Script src="/js/jquery.magnific-popup.min.js"></Script>
            <Script src="/js/jquery.nice-select.min.js"></Script>
            <Script src="/js/jquery.meanmenu.js"></Script>
            <Script src="/js/progresscircle.min.js"></Script>
            <Script src="/js/wow.min.js"></Script>
            <Script src="/js/form-validator.min.js"></Script>
            <Script src="/js/contact-form-script.js"></Script>
            <Script src="/js/main.js"></Script>
            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script>
            <Script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></Script>

        </>
    )
}