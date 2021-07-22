import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import userRequestService from "../../src/services/userService/user.service";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import dynamic from "next/dynamic";
import utils from "../../src/utils/constant";
import ReactHtmlParser from "react-html-parser";

// Common editors usually work on client-side, so we use Next.js's dynamic import with mode ssr=false to load them on client-side
const Editor = dynamic(() => import("../../src/ckeditor"), {
    ssr: false,
});

export default function Index({ props }) {

    const [users, setUsers] = useState<any>(null)
    const [require, setRequire] = useState<any>(null)
    const [benefit, setBenefit] = useState<any>(null)
    const [faq, setFaq] = useState<any>(null)
    const [ques, setQues] = useState<any>(null)
    const [contact, setContact] = useState<any>(null)
    const [error, setError] = useState([])

    let dataCkeditor = "";
    const handleData = (dataTemplate) => {
        dataCkeditor = dataTemplate;
    };

    let dataCkeditorBenefit = "";
    const handleDataBenefit = (dataTemplate) => {
        dataCkeditorBenefit = dataTemplate;
    };

    let dataCkeditorFaq = "";
    const handleDataFaq = (dataTemplate) => {
        dataCkeditorFaq = dataTemplate;
    };

    let dataCkeditorQues = "";
    const handleDataQues = (dataTemplate) => {
        dataCkeditorQues = dataTemplate;
    };

    const postFormDataContact = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            err.push(utils.checkEmptyString(event.target.address.value))
            err.push(utils.checkEmailValid(event.target.email.value))
            err.push(utils.checkPhoneNumber(event.target.phone.value))
            for (let index = 0; index < err.length; index++) {
                const element = err[index];
                if (element != "") {
                    setError(err.filter(checkAdult))
                    return
                }
            }

            var data = JSON.stringify({
                "address": event.target.address.value,
                "email": event.target.email.value,
                "phone": event.target.phone.value
            })

            console.log(data)
            userRequestService.postContactInfo(data).then(res => {
                alert("Đăng ký thông tin thành công");
                userRequestService.getContactInfo().then(res => {
                    setContact(res.data)
                })
            })
        } catch (error) {
            setError(error)
        }
    }
    const postFormDataQues = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            console.log("Dongne:", dataCkeditorQues);
            var data = new FormData();
            data.append("content", dataCkeditorQues)

            fetch("/api/post/updateQues", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                userRequestService.getQues().then(res => {
                    setQues(res.data)
                })
            })

        } catch (error) {
            setError(error)
        }
    }
    const postFormDataFaq = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            var data = new FormData();

            fetch("/api/post/updateFaq", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                userRequestService.getFaq().then(res => {
                    setFaq(res.data)
                })
            })

        } catch (error) {
            setError(error)
        }
    }
    const postFormDataBenefit = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            var data = new FormData();
            fetch("/api/post/updateBenefit", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                userRequestService.getBenefit().then(res => {
                    setBenefit(res.data)
                })
            })

        } catch (error) {
            setError(error)
        }
    };
    function checkAdult(string) {
        return string != "";
    }

    const postFormData = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            err.push(utils.checkEmptyString(event.target.name.value))
            for (let index = 0; index < err.length; index++) {
                const element = err[index];
                if (element != "") {
                    setError(err.filter(checkAdult))
                    return
                }
            }

            var data = new FormData();
            data.append("name", event.target.name.value);
            data.append("content", dataCkeditor);

            data.append(
                "img",
                event.target.img.files[0],
                event.target.img.files[0]?.name
            );

            fetch("/api/post/updateRequire", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                userRequestService.getRequire().then(res => {
                    setRequire(res.data)
                })
            })

        } catch (error) {
            setError(error)
        }
    };
    useEffect(() => {
        async function fetchMyAPI() {
            userRequestService.getContact().then(res => {
                setUsers(res.data)
            })

            userRequestService.getRequire().then(res => {
                setRequire(res.data)
            })
            userRequestService.getBenefit().then(res => {
                setBenefit(res.data)
            })
            userRequestService.getFaq().then(res => {
                setFaq(res.data)
            })

            userRequestService.getContactInfo().then(res => {
                setContact(res.data)
            })
        }

        fetchMyAPI()
    }, [])


    const renderCardRequire = (require) => {
        return require?.map((item, index) => {
            return (
                <div className="col-lg-4 col-md-12" key={index}>
                    <div className="single-services-box">
                        <div className="icon bg-cefffe">
                            <img src={`/${item.image}`} alt="" />
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
    const renderContentRequire = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Điều kiện / Yêu cầu</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormData}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="name" className="form-control" placeholder="Tiêu đề" name="name" />
                                                            <label htmlFor="name">Tiêu đề</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="img">
                                                            Chọn hình ảnh từ máy tính
                                                        </label>
                                                        <div className="input-group">
                                                            <input
                                                                type="file"
                                                                className="img"
                                                                id="img"
                                                                accept="image/*"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor onchangeData={handleData} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-deck-wrapper">
                                        <div className="row">
                                            {require != null ? renderCardRequire(require) : <></>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
    const renderContentBenefits = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">LỢI ÍCH KHOẢN VAY</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataBenefit}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor onchangeData={handleDataBenefit} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1 >LỢI ÍCH KHOẢN VAY</h1>
                                        <div className="row">
                                            <div className="col-lg-8 col-md-12">
                                                <div className="blog-details">
                                                    {benefit != null ? ReactHtmlParser(benefit?.content) : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }

    const renderContentFaq = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">NHỮNG LƯU Ý CẦN PHẢI BIẾT</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataFaq}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor onchangeData={handleDataFaq} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1 >NHỮNG LƯU Ý CẦN PHẢI BIẾT</h1>
                                        <div className="row">
                                            <div className="col-lg-8 col-md-12">
                                                <div className="blog-details">
                                                    {benefit != null ? ReactHtmlParser(faq?.content) : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }

    const renderContentQues = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">GIẢI ĐÁP THẮC MẮC CỦA KHÁCH HÀNG</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataQues}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor onchangeData={handleDataQues} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1 >GIẢI ĐÁP THẮC MẮC CỦA KHÁCH HÀNG</h1>
                                        <div className="row">
                                            <div className="col-lg-8 col-md-12">
                                                <div className="blog-details">
                                                    {benefit != null ? ReactHtmlParser(ques?.content) : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }

    const renderCardInfoContact = (contact) => {
        console.log("contact ne", contact)
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Thông tin liên hệ (Footer)</h4>
                </div>
                <div className="card-body">
                    <table>
                        <tr>
                            <td className="font-weight-bold">Địa chỉ</td>
                            <td>{contact.address}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Email</td>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Số điện thoại</td>
                            <td>{contact.phone}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        )
    }
    const renderContentContact = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Thông tin liên hệ (Footer)</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataContact}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="address">Địa chỉ</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="address" className="form-control" name="address" placeholder="Địa chỉ" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="email">Email</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="email" id="email" className="form-control" name="email" placeholder="Email" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="phone">Mobile</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="number" id="phone" className="form-control" name="phone" placeholder="Số điện thoại" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                            <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- information start --> */}
                        <div className="col-md-6 col-12 ">
                            {contact != null ? renderCardInfoContact(contact) : <></>}
                        </div>
                        {/* <!-- information start --> */}

                    </div>
                </section>
            </div>
        )
    }
    return (
        <>
            {HeaderAdmin()}
            <body className="vertical-layout vertical-menu-modern 2-columns  navbar-floating footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">

                {TopMenu()}
                {LeftMenu()}
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12">
                                        <h2 className="content-header-title float-left mb-0">Trang chủ</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Trang chủ</a>
                                                </li>
                                                <li className="breadcrumb-item active">Chỉnh sửa thông tin trang chủ
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
                                <div className="form-group breadcrum-right">
                                    <div className="dropdown">
                                        <button className="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="feather icon-settings"></i></button>
                                        <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" href="#">Chat</a><a className="dropdown-item" href="#">Email</a><a className="dropdown-item" href="#">Calendar</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {renderContentRequire()}
                        {renderContentBenefits()}
                        {renderContentFaq()}
                        {renderContentQues()}
                        <section className="page-users-view">
                            {renderContentContact()}
                        </section>
                    </div>
                </div>

                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>

                {FooterAdmin()}
            </body>
        </>
    )
}