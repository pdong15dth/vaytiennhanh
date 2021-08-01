import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import dynamic from "next/dynamic";
import utils from "../../src/utils/constant";
import ReactHtmlParser from "react-html-parser";
import prisma from "../../lib/prisma";
import authService from "../../src/services/authService/auth.service";
import { useRouter } from "next/router";
import Loading from "../../src/Loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// Common editors usually work on client-side, so we use Next.js's dynamic import with mode ssr=false to load them on client-side
const Editor = dynamic(() => import("../../src/ckeditor"), {
    ssr: false,
});

export default function Index({ props }) {
    const router = useRouter();
    const [users, setUsers] = useState<any>(null)
    const [require, setRequire] = useState<any>(null)
    const [benefit, setBenefit] = useState<any>(null)
    const [faq, setFaq] = useState<any>(null)
    const [ques, setQues] = useState<any>(null)
    const [contact, setContact] = useState<any>(null)
    const [menu, setMenu] = useState<any>(null)
    const [option, setOption] = useState<any>(null)
    const [titleHeader, setTitleHeader] = useState<any>(null)
    const [currentOption, setCurrentOption] = useState<any>(null)
    const [currentRequire, setCurrentRequire] = useState<any>(null)
    const [currentBanner, setCurrentBanner] = useState<any>(null)

    const [error, setError] = useState([])
    const [isLoadingRequire, setIsLoadingRequire] = useState(false)
    const [isLoadingbenefit, setIsLoadingbenefit] = useState(false)
    const [isLoadingfaq, setIsLoadingfaq] = useState(false)
    const [isLoadingques, setIsLoadingques] = useState(false)
    const [isLoadingcontact, setIsLoadingcontact] = useState(false)
    const [isLoadinMenu, setIsLoadingMenu] = useState(false)
    const [isLoadinOption, setIsLoadingOption] = useState(false)
    const [isLoadinBanner, setIsLoadingBanner] = useState(false)
    const [isLoadinTitleHeader, setIsLoadingTitleHeader] = useState(false)
    const [isLoadingAbout, setIsLoadingAbout] = useState(false)
    const [gioithieu, setGioiThieu] = useState<any>(null)

    let dataCkeditorAbout = gioithieu?.content ?? "";
    const handleDataAbout = (dataTemplate) => {
        dataCkeditorAbout = dataTemplate;
        console.log(dataTemplate)
    };

    let dataCkeditor = currentRequire?.content ?? "";
    const handleData = (dataTemplate) => {
        dataCkeditor = dataTemplate;
    };

    let dataCkeditorBenefit = benefit?.content ?? "";
    const handleDataBenefit = (dataTemplate) => {
        dataCkeditorBenefit = dataTemplate;
    };

    let dataCkeditorFaq = faq?.content ?? "";
    const handleDataFaq = (dataTemplate) => {
        dataCkeditorFaq = dataTemplate;
    };

    let dataCkeditorQues = ques?.content ?? "";
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

            console.log("data setcont", data)
            //post/postContactInfo
            setIsLoadingcontact(true)
            fetch("/api/post/postContactInfo", {
                method: 'POST',
                body: data,
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getContactInfo").then(response => response.json()).then(result => {
                    setContact(result)
                    console.log("setContact", result)
                    setIsLoadingcontact(false)
                }).catch(error => {
                    setIsLoadingcontact(false)
                });
            })
        } catch (error) {
            setError(error)
            setIsLoadingcontact(false)
        }
    }
    const postFormDataOption = (event) => {
        event.preventDefault();

        try {

            if (currentOption?.id) {
                var tempOption = currentOption
                tempOption.title = event.target.title.value
                editOption(currentOption)
            } else {
                var err = []
                setError(err)
                err.push(utils.checkEmptyString(event.target.title.value))
                for (let index = 0; index < err.length; index++) {
                    const element = err[index];
                    if (element != "") {
                        setError(err.filter(checkAdult))
                        return
                    }
                }
                setIsLoadingOption(true)
                var data = JSON.stringify({
                    "title": event.target.title.value,
                })
                fetch("/api/post/postOption", {
                    method: 'POST',
                    body: data,
                }).then(res => {
                    alert("Đăng ký thông tin thành công");
                    fetch("/api/post/getOption").then(response => response.json()).then(result => {
                        setOption(result)
                        console.log("set Option", result)
                        setIsLoadingOption(false)

                    }).catch(error => {
                        setIsLoadingOption(false)
                    });
                })
            }
        } catch (error) {
            setIsLoadingOption(false)
            setError(error)
        }
    }

    const postFormDataMenu = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            err.push(utils.checkEmptyString(event.target.menu1.value))
            err.push(utils.checkEmptyString(event.target.menu2.value))
            err.push(utils.checkEmptyString(event.target.menu3.value))
            err.push(utils.checkEmptyString(event.target.menu4.value))
            for (let index = 0; index < err.length; index++) {
                const element = err[index];
                if (element != "") {
                    setError(err.filter(checkAdult))
                    return
                }
            }

            var data = JSON.stringify({
                "menu1": event.target.menu1.value,
                "menu2": event.target.menu2.value,
                "menu3": event.target.menu3.value,
                "menu4": event.target.menu4.value
            })

            setIsLoadingMenu(true)
            fetch("/api/post/postMenu", {
                method: 'POST',
                body: data,
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getMenu").then(response => response.json()).then(result => {
                    setMenu(result)
                    console.log("setContact", result)
                    setIsLoadingMenu(false)

                }).catch(error => {
                    setIsLoadingMenu(false)
                });
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
            data.append("title", event.target.title.value)
            setIsLoadingques(true)
            fetch("/api/post/updateQues", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getQues").then(response => response.json()).then(result => {
                    setQues(result)
                    setIsLoadingques(false)
                }).catch(error => {
                    setIsLoadingques(false)
                });
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
            data.append("content", dataCkeditorFaq)
            data.append("title", event.target.title.value)
            setIsLoadingfaq(true)
            fetch("/api/post/updateFaq", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getFaq").then(response => response.json()).then(result => {
                    setFaq(result)
                    setIsLoadingfaq(false)
                }).catch(error => {
                    setIsLoadingfaq(false)
                });
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
            data.append("content", dataCkeditorBenefit)
            console.log(dataCkeditorBenefit)
            data.append("title", event.target.title.value)
            setIsLoadingbenefit(true)
            fetch("/api/post/updateBenefit", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getBenefit").then(response => response.json()).then(result => {
                    setBenefit(result)
                    console.log("setBenefit", result)
                    setIsLoadingbenefit(false)

                }).catch(error => {
                    setIsLoadingbenefit(false)
                });
            })

        } catch (error) {
            setError(error)
        }
    };
    function checkAdult(string) {
        return string != "";
    }

    const postFormData = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            console.log("start")

            err.push(utils.checkEmptyString(event.target.name.value))
            for (let index = 0; index < err.length; index++) {
                const element = err[index];
                if (element != "") {
                    setError(err.filter(checkAdult))
                    console.log("loi")

                    return
                }
            }
            console.log("start 2")

            var formdata = new FormData();
            formdata.append(
                "image",
                event.target.img.files[0]
            );

            formdata.append("name", event.target.name.value);
            formdata.append("title", event.target.name.value);

            var linkImage = currentRequire?.image ?? ""
            setIsLoadingRequire(true)
            console.log("1")

            if (event.target.img.files[0]?.name) {

                console.log("post image")

                await fetch("https://api.imgur.com/3/image", {
                    method: "post",
                    headers: {
                        Authorization: "Client-ID cb0adfde641e643"
                    },
                    body: formdata
                }).then(data => data.json()).then(data => {
                    console.log(data.data.link)
                    linkImage = data.data.link
                })
            } else {

            }

            console.log("2")
            var dataForm = new FormData();
            dataForm.append("id", currentRequire?.id ?? 0);
            dataForm.append("name", event.target.name.value);
            dataForm.append("content", dataCkeditor);

            dataForm.append(
                "image", linkImage);

            fetch("/api/post/updateRequire", {
                method: "POST",
                body: dataForm
            }).then(res => {
                // alert("Đăng ký thông tin thành công");
                fetch("/api/post/getRequire").then(response => response.json()).then(result => {
                    setRequire(result)
                    setIsLoadingRequire(false)
                    router.reload()
                }).catch(error => {
                    setIsLoadingRequire(false)
                });
            })

        } catch (error) {
            setIsLoadingRequire(false)
            setError(error)
        }
    };

    const postFormDataBanner = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            var formdata = new FormData();
            formdata.append(
                "image",
                event.target.img.files[0]
            );

            var linkImage = currentBanner?.image ?? ""
            setIsLoadingBanner(true)
            console.log("1")

            if (event.target.img.files[0]?.name) {

                console.log("post image")

                await fetch("https://api.imgur.com/3/image", {
                    method: "post",
                    headers: {
                        Authorization: "Client-ID cb0adfde641e643"
                    },
                    body: formdata
                }).then(data => data.json()).then(data => {
                    console.log(data.data.link)
                    linkImage = data.data.link
                })
            }

            console.log("2")
            var dataForm = new FormData();
            dataForm.append(
                "image", linkImage);

            fetch("/api/post/updateBanner", {
                method: "POST",
                body: dataForm
            }).then(res => {
                // alert("Đăng ký thông tin thành công");
                fetch("/api/post/getBanner").then(response => response.json()).then(result => {
                    setCurrentBanner(result)
                    event.reset()
                    setIsLoadingBanner(false)
                }).catch(error => {
                    setIsLoadingBanner(false)
                });
            })

        } catch (error) {
            setIsLoadingBanner(false)
            setError(error)
        }
    };

    const postFormDataTitleHeader = async (event) => {
        event.preventDefault();
        console.log("event.target.subTitleVoucher.value");

        console.log(event.target.subTitleVoucher.value);

        try {
            var err = []
            setError(err)
            const data = {
                "title": event.target.title.value,
                "description": event.target.description.value,
                "voucher": event.target.voucher.value,
                "subTitleVoucher": event.target.subTitleVoucher.value
            }
            setIsLoadingTitleHeader(true)
            fetch("/api/post/updateTitleHeader", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                // alert("Đăng ký thông tin thành công");
                fetch("/api/post/getTitleHeader").then(response => response.json()).then(result => {
                    setTitleHeader(result)
                    setIsLoadingTitleHeader(false)
                }).catch(error => {
                    setIsLoadingTitleHeader(false)
                });
            })

        } catch (error) {
            setIsLoadingTitleHeader(false)
            setError(error)
        }
    };

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }
        async function fetchMyAPI() {

            fetch("/api/post/listUser").then(response => response.json()).then(result => {
                setUsers(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getRequire").then(response => response.json()).then(result => {
                setRequire(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getBenefit").then(response => response.json()).then(result => {
                setBenefit(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getFaq").then(response => response.json()).then(result => {
                setFaq(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getQues").then(response => response.json()).then(result => {
                setQues(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getContactInfo").then(response => response.json()).then(result => {
                setContact(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getBanner").then(response => response.json()).then(result => {
                setCurrentBanner(result)
            }).catch(error => console.log('error', error));

            fetch("/api/post/getTitleHeader").then(response => response.json()).then(result => {
                setTitleHeader(result)
            })
            fetch("/api/post/getMenu").then(response => response.json()).then(result => {
                setMenu(result)
                console.log("setContact", result)
                setIsLoadingMenu(false)
                fetch("/api/post/getOption").then(response => response.json()).then(result => {
                    setOption(result)
                    console.log("set Option", result)
                    setIsLoadingOption(false)
                })
            }).catch(error => {
                setIsLoadingMenu(false)
            });
        }

        fetchMyAPI()
    }, [])



    const renderCardRequire = (require) => {

        const editRequire = (item) => {
            console.log("edit", item)
            setCurrentRequire(item)
        }

        const removeRequire = (item) => {
            console.log("xoa", item)
            confirmAlert({
                title: "Xác nhận Xóa",
                message: `Bạn có chắc muốn xóa: ${item?.name}`,
                buttons: [
                    {
                        label: "Đồng ý",
                        onClick: () => {
                            var data = JSON.stringify({
                                "id": item?.id,
                                "name": item?.name,
                                "content": item?.content,
                            })
                            fetch("/api/post/removeRequire", {
                                method: "POST",
                                body: data
                            }).then(() => {
                                fetch("/api/post/getRequire").then(response => response.json()).then(result => {
                                    setRequire(result)
                                }).catch(error => console.log('error', error));
                            })
                        },
                    },
                    {
                        label: "Không",
                        onClick: () => { },
                    },
                ],
            });
        }
        return require?.map((item, index) => {
            return (
                <div className="col-lg-4 col-md-12" key={index}>
                    <div className="single-services-box">
                        <div className="icon bg-cefffe">
                            <img src={`${item.image}`} alt="" />
                        </div>
                        <h3> <a href="#">{item.name}</a> </h3>
                        <p className="text-float-left">
                            {ReactHtmlParser(item.content)}
                        </p>
                    </div>
                    <div className="form-actions text-center">
                        <button
                            type="submit"
                            className="btn btn-primary mr-1 waves-effect waves-light"
                            onClick={() => editRequire(item)}>
                            Chỉnh sửa
                        </button>
                        <button
                            type="reset"
                            className="btn btn-outline-danger waves-effect waves-light"
                            onClick={() => removeRequire(item)}>
                            Xóa
                        </button>
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
                                    <h4 className="card-title">1. Điều kiện / Yêu cầu</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormData}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="name" className="form-control" defaultValue={currentRequire?.name} placeholder="Tiêu đề" name="name" />
                                                            <label htmlFor="name">Tiêu đề</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-label-group col-md-12 col-12">
                                                        <label className="form-label" htmlFor="img">
                                                            Chọn hình ảnh từ máy tính
                                                        </label>
                                                        {currentRequire?.image ?
                                                            <img src={`${currentRequire?.image}`} alt="users avatar" className="users-avatar-shadow rounded" height="90" width="90"></img>
                                                            : <></>}
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
                                                            <Editor data={currentRequire?.content} onchangeData={handleData} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoadingRequire ? Loading() : <></>}
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
                                    <h4 className="card-title">2. Chỉnh sửa - {benefit?.title}</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataBenefit}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="title" defaultValue={benefit?.title} className="form-control" placeholder="Tiêu đề" name="title" />
                                                            <label htmlFor="title">Tiêu đề</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor data={benefit?.content} onchangeData={handleDataBenefit} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoadingbenefit ? Loading() : <></>}

                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1>{benefit?.title}</h1>
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
                                    <h4 className="card-title">3. Chỉnh sửa: {faq?.title}</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataFaq}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="title" defaultValue={faq?.title} className="form-control" placeholder="Tiêu đề" name="title" />
                                                            <label htmlFor="title">Tiêu đề</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor data={faq?.content} onchangeData={handleDataFaq} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoadingfaq ? Loading() : <></>}

                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1>{faq?.title}</h1>
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
                                    <h4 className="card-title">4. Chỉnh sửa: {ques?.title}</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormDataQues}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="title" defaultValue={ques?.title} className="form-control" placeholder="Tiêu đề" name="title" />
                                                            <label htmlFor="title">Tiêu đề</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor data={ques?.content} onchangeData={handleDataQues} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoadingques ? Loading() : <></>}
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1>{ques?.title}</h1>
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
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">6. Thông tin liên hệ (Footer)</h4>
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
                                            <h4 className="card-title">6. Thông tin liên hệ (Footer)</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataContact}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="address">Địa chỉ</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="address" className="form-control" defaultValue={contact?.address} name="address" placeholder="Địa chỉ" required />
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
                                                                    <input type="email" id="email" className="form-control" defaultValue={contact?.email} name="email" placeholder="Email" required />
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
                                                                    <input type="number" id="phone" className="form-control" defaultValue={contact?.phone} name="phone" placeholder="Số điện thoại" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            {isLoadingcontact ? Loading() : <></>}
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

    const renderContentMenu = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">7. Chỉnh sửa nội dung Menu</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataMenu}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="menu1">Menu 1</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="menu1" className="form-control" defaultValue={menu?.menu1} name="menu1" placeholder="Menu 1" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="menu2">Menu 2</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="menu2" className="form-control" defaultValue={menu?.menu2} name="menu2" placeholder="Menu 2" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="menu3">Menu 3</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="menu3" className="form-control" defaultValue={menu?.menu3} name="menu3" placeholder="Menu 3" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="menu4">Menu 4</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="menu4" className="form-control" defaultValue={menu?.menu4} name="menu4" placeholder="Menu 4" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            {isLoadinMenu ? Loading() : <></>}
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
                            {menu != null ? renderCardInfoMenu(menu) : <></>}
                        </div>
                        {/* <!-- information start --> */}

                    </div>
                </section>
            </div>
        )
    }

    const renderCardInfoMenu = (menu) => {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">7. Chỉnh sửa nội dung Menu</h4>
                </div>
                <div className="card-body">
                    <table>
                        <tr>
                            <td className="font-weight-bold">Menu 1</td>
                            <td>{menu.menu1}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Menu 2</td>
                            <td>{menu.menu2}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Menu 3</td>
                            <td>{menu.menu3}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Menu 4</td>
                            <td>{menu.menu4}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        )
    }

    const renderContentOption = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">5. Chỉnh sửa nội dung Option</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataOption}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="title3">Nội dung</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="title" className="form-control" name="title"
                                                                        value={currentOption?.title}
                                                                        onChange={(e) => {
                                                                            let p1 = {
                                                                                ...currentOption
                                                                            };
                                                                            p1.title = e.target.value
                                                                            setCurrentOption(p1)
                                                                        }} placeholder="Nội dung" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            {isLoadinOption ? Loading() : <></>}
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
                            {option != null ? renderCardInfoOption(option) : <></>}
                        </div>
                        {/* <!-- information start --> */}

                    </div>
                </section>
            </div>
        )
    }

    const editOption = (option) => {

        confirmAlert({
            title: "Xác nhận đã cập nhật",
            message: `Bạn có chắc muốn cập nhật option: ${option?.title}`,
            buttons: [
                {
                    label: "Đồng ý",
                    onClick: () => {
                        var data = JSON.stringify({
                            "id": option?.id,
                            "title": option?.title,
                        })
                        setIsLoadingOption(true)
                        fetch("/api/post/postOption", {
                            method: "POST",
                            body: data
                        }).then(() => {
                            fetch("/api/post/getOption").then(response => response.json()).then(result => {
                                setOption(result)
                                setIsLoadingOption(false)
                            }).catch(error => {
                                setIsLoadingOption(false)
                                console.log('error', error)
                            });
                        }).catch(error => {
                            setIsLoadingOption(false)
                            console.log('error', error)
                        });
                    },
                },
                {
                    label: "Không",
                    onClick: () => { },
                },
            ],
        });
    }

    const removeOption = (option) => {
        console.log("removeOption", option);

        confirmAlert({
            title: "Xác nhận xoá",
            message: `Bạn có chắc muốn xoá option: ${option?.title}`,
            buttons: [
                {
                    label: "Đồng ý",
                    onClick: () => {
                        var data = JSON.stringify({
                            "id": option?.id,
                            "title": option?.title,
                        })
                        fetch("/api/post/deleteOption", {
                            method: "POST",
                            body: data
                        }).then(() => {
                            fetch("/api/post/getOption").then(response => response.json()).then(result => {
                                setOption(result)
                            }).catch(error => console.log('error', error));
                        })
                    },
                },
                {
                    label: "Không",
                    onClick: () => { },
                },
            ],
        });
    }
    const renderRowOption = (options) => {
        return options.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="font-weight-bold">Nội dung id: {item?.id}</td>
                    <td>{item?.title} {" "}
                        <button onClick={() => {
                            console.log(item)
                            var tempItem = JSON.parse(JSON.stringify(item))
                            setCurrentOption(tempItem)
                        }}><i className="fa fa-pencil-square-o"></i></button>
                        <button onClick={() => {
                            removeOption(item)
                        }}><i className="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            )
        })
    }
    const renderCardInfoOption = (option) => {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">5. Chỉnh sửa nội dung Option</h4>
                </div>
                <div className="card-body">
                    <table>
                        {renderRowOption(option)}
                    </table>
                </div>
            </div>
        )
    }

    const renderContentBanner = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-12 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">9. Chỉnh sửa Banner</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataBanner}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="form-label-group col-md-12 col-12">
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
                                                        <div className="col-12">
                                                            {isLoadinBanner ? Loading() : <></>}
                                                        </div>
                                                        <div className="col-12">
                                                            <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                            <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                        </div>

                                                        <div className="col-md-12 col-12">
                                                            <div className="profile-header mb-2">
                                                                <div className="relative">
                                                                    <div className="cover-container">
                                                                        {currentBanner?.image ?
                                                                            <img className="img-fluid bg-cover rounded-0 w-100" src={`${currentBanner?.image}`} alt="User Profile Image" />
                                                                            : <></>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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


    const renderRowHeader = (titleHeader) => {
        return (
            <>
                <tr>
                    <td className="font-weight-bold">Tiêu đề lớn:</td>
                    <td>{titleHeader?.title}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">Tiêu Đề Phụ:</td>
                    <td>{titleHeader?.description}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">Ưu đãi:</td>
                    <td>{titleHeader?.voucher}</td>
                </tr>
                <tr>
                    <td className="font-weight-bold">Tiêu đề phụ Ưu Đãi:</td>
                    <td>{titleHeader?.subTitleVoucher}</td>
                </tr>

            </>

        )
    }
    const renderCardInfoHeader = (titleHeader) => {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">8. Chỉnh sửa Title Header</h4>
                </div>
                <div className="card-body">
                    <table>
                        {renderRowHeader(titleHeader)}
                    </table>
                </div>
            </div>
        )
    }

    const renderContentTitleHeader = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">8. Chỉnh sửa Title Header</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postFormDataTitleHeader}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="title2">Tiêu đề lớn</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="title" className="form-control" defaultValue={titleHeader?.title} name="title" placeholder="Địa chỉ" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="description">Tiêu Đề Phụ</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="description" id="description" className="form-control" defaultValue={titleHeader?.description} name="description" placeholder="Tiêu đề phụ" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="voucher">Ưu đãi</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="voucher" id="voucher" className="form-control" defaultValue={titleHeader?.voucher} name="voucher" placeholder="Ưu đãi" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="subTitleVoucher">Tiêu đề phụ Ưu Đãi</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="subTitleVoucher" id="subTitleVoucher" className="form-control" defaultValue={titleHeader?.subTitleVoucher} name="subTitleVoucher" placeholder="Tiêu đề phụ Ưu đãi" required />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            {isLoadinTitleHeader ? Loading() : <></>}
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
                        <div className="col-md-6 col-12 ">
                            {titleHeader != null ? renderCardInfoHeader(titleHeader) : <></>}
                        </div>
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
                                                <li className="breadcrumb-item"><a href="">Trang chủ</a>
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
                            {renderContentOption()}
                        </section>
                        <section className="page-users-view">
                            {renderContentContact()}
                        </section>
                        <section className="page-users-view">
                            {renderContentMenu()}
                        </section>
                        <section className="page-users-view">
                            {renderContentTitleHeader()}
                        </section>
                        <section className="page-users-view">
                            {renderContentBanner()}
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