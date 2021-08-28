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
import { DocumentContext } from "next/document";

Index.getInitialProps = async (ctx: DocumentContext) => {
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

    const social = await prisma.social.findFirst({
        where: {
            id: 1
        }
    })

    const news = await prisma.news.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return {
        props: {
            social,
            count,
            contact,
            metaSEO,
            menu,
            option,
            titleHeader,
            news
        }
    };
}

export default function Index({ props }) {
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const count = props?.count
    const [currentData, setCurrentData] = useState(props?.news)
    useEffect(() => {
        var timeSpace = Date.now() - (localStorageService.countRequest.get()?.time as any) ?? 0
        if (timeSpace > 20000 || isNaN(timeSpace)) {
            fetch("/api/count", {
                method: "POST"
            }).then(result => result.json().then(res => {
                console.log("cap nhat count thanh cong")
                console.log(res)
                localStorageService.countRequest.set(new CountRequest({
                    ipAddress: props?.ip,
                    time: `${Date.now()}`
                }))
            }))
        }
    }, [])

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
                                        <a href={`/tin-tuc`} className="btn btn-primary btn-header">Tin Tức</a>
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
            <section className="blog-details-area background-white page-title-area"
                style={{
                    paddingTop: '150px',
                    paddingBottom: '0px'
                }}>
                <div className="container">
                    <div className="section-title">
                        <h1 className="font-bold">TIN TỨC MỚI NHẤT</h1>
                    </div>
                </div>
            </section>
            <section className="blog-area ptb-110">
                <div className="container">
                    <div className="row">
                        {
                            currentData?.map((item, index) => {
                                return (
                                    <div className="col-lg-4 col-md-6" key={index}>
                                        <div className="single-blog-post">
                                            <div className="entry-thumbnail">
                                                <a href={`/tin-tuc/${item?.slug}?vttc=${item?.id}`}><img src={item?.avatar} alt="image" /></a>
                                            </div>
                                            <div className="entry-post-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>{`${utils.formatDate(`${item?.createdAt}`)}`}</li>
                                                    </ul>
                                                </div>
                                                <h3><a href={`/tin-tuc/${item?.slug}?vttc=${item?.id}`}>{item?.title}</a></h3>
                                                <p>{item?.description}</p>
                                                <a href={`/tin-tuc/${item?.slug}?vttc=${item?.id}`} className="learn-more-btn">Xem thêm <i className="flaticon-add-1"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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
`}}></script>            <Script src="/js/jquery.min.js"></Script>
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