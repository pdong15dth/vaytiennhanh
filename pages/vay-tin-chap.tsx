import { GetStaticProps } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import prisma from '../lib/prisma';
import utils from '../src/utils/constant';
import ReactHtmlParser from "react-html-parser";
import HeaderClient from '../src/Script/HeaderClient';
import SEOTag from '../src/Script/seoTag';
import Image from 'next/image'
import Script from 'next/script';
import Loading from '../src/Loading'
import localStorageService from "../src/services/localStorage.service/localStorage.service";
import { CountRequest } from '../src/models/CountRequestData';

Home.getInitialProps = async ({ req, res }: any) => {
  const require = await prisma.require.findMany();
  const faq = await prisma.faq.findFirst()
  const benefit = await prisma.benefit.findFirst()
  const ques = await prisma.question.findFirst()
  const contact = await prisma.contact.findFirst()
  const metaSEO = await prisma.seoWeb.findFirst()
  const menu = await prisma.menuHeader.findFirst({
    where: {
      id: 1
    }
  })
  const banner = await prisma.banner.findFirst({
    where: {
      id: 1
    }
  })
  const titleHeader = await prisma.titleHeader.findFirst({
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
  const social = await prisma.social.findFirst({
    where: {
      id: 1
    }
  })

  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /) : req.connection.remoteAddress
  return { props: { social, ip, count, require, faq, benefit, ques, contact, metaSEO, menu, option, banner, titleHeader } };
}

export default function Home({ props }) {
  const router = useRouter()
  const [error, setError] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(null)
  const count = props?.count
  //localStorageService.userInfor.set(new LoginDataModel(userInfor));

  useEffect(() => {
    var timeSpace = Date.now() - (localStorageService.countRequest.get()?.time as any) ?? 0
    if (timeSpace > 20000 || isNaN(timeSpace)) {
      fetch("/api/count", {
        method: "POST"
      }).then(result => result.json().then(res => {
        console.log("cap nhat count thanh cong")
        localStorageService.countRequest.set(new CountRequest({
          ipAddress: props.ip,
          time: `${Date.now()}`
        }))

      }))
    }
  }, [])
  const renderCardRequire = (require) => {
    console.log(props.ip, props.forwarded)

    return require?.map((item, index) => {
      return (
        <div className="col-lg-4 col-md-12" key={index}>
          <div className="single-services-box">
            <div className="icon bg-cefffe">
              <img src={`${item.image}`} alt={`img`} />
            </div>
            <h3> <a href="#">{item.name}</a> </h3>
            <p className="text-float-left">
              {ReactHtmlParser(item.content)}
            </p>
          </div>
        </div>
      )
    })
  }
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
            alert("????ng k?? th??nh c??ng, ch??ng t??i s??? li??n h??? v???i b???n trong th???i gian s???m nh???t");
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

  const onChangeAmout = (event) => {
    console.log(event)
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
              placeholder="H??? v?? T??n" required />
          </div>
          <div className="form-group">
            <input type="text" name="address" id="address" className="form-control"
              placeholder="S??? Ch???ng Minh Nh??n D??n / CCCD" required />
          </div>
          <div className="form-group">
            <input type="text" name="phone" id="phone" className="form-control"
              placeholder="S??? ??i???n Tho???i" required />
          </div>
          <div className="form-group">
            <select className="form-control" name="amount" id="amount">
              <option value="">Kho???n Vay Mong Mu???n</option>
              {renderOptionAmout()}
            </select>
            {/* <input type="number" name="amount" id="amount" onChange={(event) => onChangeAmout(event)} className="form-control"
                        placeholder="Kho???n vay mong mu???n" /> */}
          </div>
          <div className="form-group">
            <select className="form-control" name="type_amount" id="type_amount">
              <option value="">Ch???n H??nh Th???c Vay</option>
              {renderOption(props?.option)}
            </select>
          </div>
          {isLoading ? Loading() : <Fragment></Fragment>}
          <button type="submit"
            className="btn btn-light text-black col-lg-6 btn-register-center">????ng k??
            ngay</button>
          {error.length == 0 ? <></> : showErrorForm(error)}
        </form>
      </>
    )
  }
  return (
    <>
      {HeaderClient()}
      <Head>
        {SEOTag(props?.metaSEO)}
      </Head>

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

      {/* background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: contain; */}
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
      <section className="backgroundHeader features-area ptb-110 bg-f1f3f6 section-custom-1 " style={{
        backgroundImage: `url(${props?.banner?.image})`,
        backgroundPosition: 'center',
        backgroundOrigin: 'content-box',
        backgroundSize: 'contain',
        backgroundPositionX: 'left',
        backgroundRepeat: 'no-repeat',
        height: '950px'
      }}>
        {/* <img src={props?.banner?.className} class="img-fluid" alt="Responsive image" /> */}

        <div className="container-fluid padding-40">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 text-center">
              {props?.titleHeader?.title ? <h1 className="title-vay-tinh-chap">{props?.titleHeader?.title}</h1> : <></>}
              <br />
              {props?.titleHeader?.description ? <p className="p-vay-tinh-chap">{props?.titleHeader?.description}</p> : <></>}
            </div>
            <div className="col-lg-6 col-md-12 align-items-center">

              <div className="row">
                <div className="question-form text-center form-vay-1">
                  {renderFormThongTin()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-details-area ptb-30 background-white">
        <div className="container">
          <h1 className="font-bold">{props.benefit?.title}</h1>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-details">
                {ReactHtmlParser(props.benefit?.content)}
                <a type="submit" href="#" className="btn btn-light text-black col-lg-6 btn-register-center custom-button-register custom-button-register">????ng k??
                  ngay</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="why-choose-us-area ptb-110 call-support">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="section-title">
                <h2>B???n c???n ch??ng t??i gi??p ??????</h2>
                <p>?????i ng?? nh??n vi??n ch??ng t??i s??? gi??p c??c b???n.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="section-title">
                <h3 className="text-white">H??? tr??? kh??ch h??ng 24/7</h3>
                <h2><i className="fa fa-phone fa-flip-horizontal"></i> {props.contact?.phone}</h2>
                <a type="submit" href="#" className="btn btn-light text-black col-lg-6 btn-register-center custom-button-register">????ng k?? ngay</a>
              </div>
            </div>
          </div>
        </div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>
      <section className="blog-details-area ptb-30 background-white">
        <div className="container">
          <div className="section-title">
            <h1 className="font-bold">{props.faq?.title}</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="blog-details">
                {ReactHtmlParser(props.faq?.content)}
                <a type="submit" href="#" className="btn btn-light text-black col-lg-6 btn-register-center">????ng k??
                  ngay</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="resources-area ptb-110 main-color">
        <div className="container">
          <div className="row">
            {require != null ? renderCardRequire(props.require) : <></>}
          </div>
        </div>
      </section>
      <section className="blog-details-area ptb-30 background-white">
        <div className="container">
          <div className="section-title">
            <h1 className="font-bold">{props.ques?.title}</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="blog-details">
                {ReactHtmlParser(props.ques?.content)}

                <a type="submit" href="#" className="btn btn-light text-black col-lg-6 btn-register-center custom-button-register">????ng k??
                  ngay</a>
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
                <h3>Li??n h???</h3>
                <div className="single-footer-widget">
                  <div className="logo">
                    <ul className="footer-contact-list">
                      <li><span>?????a ch???:</span> {props.contact?.address}</li>
                      <li><span>Email:</span> <a href="#"><span className="__cf_email__"
                        data-cfemail={props.contact?.email}>{props.contact?.email}</span></a>
                      </li>
                      <li><span>S??? ??i???n Tho???i:</span> <a href={`tel:${props.contact?.phone}`}>{props.contact?.phone}</a></li>
                      <li><span>L?????t Truy C???p:</span>{" "}<strong>{count?.count}</strong></li>
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
`}}></script>
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
      <Script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></Script>

    </>
  )
}

