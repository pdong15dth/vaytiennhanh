import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import prisma from "../../lib/prisma";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useRouter } from "next/router";
import authService from "../../src/services/authService/auth.service";
import ReactHtmlParser from "react-html-parser";
import dynamic from "next/dynamic";
import Loading from "../../src/Loading";
const Editor = dynamic(() => import("../../src/ckeditor"), {
    ssr: false,
});
Index.getInitialProps = async (ctx) => {
    const about = await prisma.about.findFirst({
        where: {
            id: 1
        }
    });
    return { props: { about } };
}

export default function Index({ props }) {

    const [error, setError] = useState<any>(null)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [gioithieu, setGioiThieu] = useState<any>(null)
    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

        async function fetchMyAPI() {
            fetch("/api/post/getAbout").then(response => response.json()).then(result => {
                setGioiThieu(result)
            }).catch(error => console.log('error', error));
        }

        fetchMyAPI()
    }, [])

    let dataCkeditor = gioithieu?.content ?? "";
    const handleData = (dataTemplate) => {
        dataCkeditor = dataTemplate;
        console.log(dataTemplate)
    };

    const postFormData = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)
            console.log("Dongne:", dataCkeditor);
            var data = new FormData();
            data.append("content", dataCkeditor)
            console.log(dataCkeditor)
            
            setIsLoading(true)
            await fetch("/api/post/updateAbout", {
                method: "POST",
                body: data
            }).then(res => {
                alert("Đăng ký thông tin thành công");
                fetch("/api/post/getAbout").then(response => response.json()).then(result => {
                    setGioiThieu(result)
                    setIsLoading(false)
                }).catch(error => {
                    console.log("error")
                    console.log(error)
                    setIsLoading(false)
                });
            }).catch(error => {
                console.log("error updateAbout")
                console.log(error)
                setIsLoading(false)
            });

        } catch (error) {
            setError(error)
            console.log("error ngoai")
            console.log(error)
            setIsLoading(false)
        }
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
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">
                                                            <Editor data={dataCkeditor} onchangeData={handleData} />
                                                            <label htmlFor="city-column">Nội Dung</label>
                                                        </div>
                                                    </div>
                                                    {isLoading ? Loading() : <></>}
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
                        {renderContentRequire()}
                    </div>
                </div>

                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>

                {FooterAdmin()}
            </body>
        </>
    )
}