import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
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

    const [error, setError] = useState<any>(null)
    const router = useRouter();
    const [isLoadingAbout, setIsLoadingAbout] = useState(false)
    const [gioithieu, setGioiThieu] = useState<any>(null)

    let dataCkeditor = gioithieu?.content ?? "";
    const handleDataAbout = (dataTemplate) => {
        dataCkeditor = dataTemplate;
        console.log(dataTemplate)
    };

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

        async function fetchMyAPI() {
            fetch("/api/post/getGioithieu").then(response => response.json()).then(result => {
                setGioiThieu(result)
            }).catch(error => console.log('error', error));
        }

        fetchMyAPI()
    }, [])

    const postFormDataGioithieu = (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            var data = new FormData();
            data.append("content", dataCkeditor)
            console.log(dataCkeditor)
            data.append("title", `event.target.title.value`)
            setIsLoadingAbout(true)
            fetch("/api/post/updateGioithieu", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getGioithieu").then(response => response.json()).then(result => {
                    setGioiThieu(result)
                    console.log("setGioithieu", result)
                    setIsLoadingAbout(false)

                }).catch(error => {
                    setIsLoadingAbout(false)
                });
            })

        } catch (error) {
            setError(error)
        }
    };

    const renderContentGioithieu = () => {
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
                                        <form className="form" onSubmit={postFormDataGioithieu}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor data={dataCkeditor} onchangeData={handleDataAbout} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoadingAbout ? Loading() : <></>}
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-outline-warning mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <h1 >Preview</h1>
                                        <div className="row">
                                            <div className="col-lg-8 col-md-12">
                                                <div className="blog-details">
                                                    {gioithieu != null ? ReactHtmlParser(gioithieu?.content) : <></>}
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
                        {renderContentGioithieu()}
                    </div>
                </div>

                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>

                {FooterAdmin()}
            </body>
        </>
    )
}