import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import FooterAdmin from "../../../src/Script/FooterAdmin";
import LeftMenu from "../../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../../src/Script/HeaderAdmin";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import authService from "../../../src/services/authService/auth.service";
import { useRouter } from "next/router";
import Loading from "../../../src/Loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// Common editors usually work on client-side, so we use Next.js's dynamic import with mode ssr=false to load them on client-side
const Editor = dynamic(() => import("../../../src/ckeditor"), {
    ssr: false,
});

export default function Index({ props }) {

    const [error, setError] = useState<any>(null)
    const router = useRouter();
    const [isLoadingAbout, setIsLoadingAbout] = useState(false)
    const [news, setNews] = useState<any>(null)

    let dataCkeditor = news?.content ?? "";
    const handleDataAbout = (dataTemplate) => {
        dataCkeditor = dataTemplate;
        console.log(dataTemplate)
    };

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }
    }, [])

    const postFormDataNews = async (event) => {
        event.preventDefault();
        try {
            var err = []
            setError(err)

            var formdata = new FormData();
            formdata.append(
                "image",
                event.target.img.files[0]
            );

            formdata.append("name", event.target.name.value);
            formdata.append("title", event.target.name.value);

            var linkImage = ""
            setIsLoadingAbout(true)
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

            var data = {
                title: event.target.title.value,
                description: event.target.description.value,
                createdBy: event.target.createdBy.value,
                detail: dataCkeditor,
                avatar: linkImage
            }
            console.log(data)
            fetch("/api/news/upsert", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(response => response.json()).then(res => {
                console.log(res)
                setIsLoadingAbout(false)
                router.push("/admin/news");

            })
        } catch (error) {
            setError(error)
        }
    };

    const renderContentGioithieu = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form basic-vertical-layouts">
                    <div className="row match-height">
                        <div className="col-md-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Nội dung</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form form-vertical" onSubmit={postFormDataNews}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <h3>Tiêu đề bài viết</h3>
                                                            <div className="position-relative has-icon-left">
                                                                <input type="text" className="form-control" name="title" id="title" placeholder="Tiêu đề bài viết" />
                                                                <div className="form-control-position">
                                                                    <i className="feather icon-user"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <h3>
                                                                Chọn hình ảnh từ máy tính
                                                            </h3>
                                                            {/* {currentRequire?.image ?
                                                                    <img src={`${currentRequire?.image}`} alt="users avatar" className="users-avatar-shadow rounded" height="90" width="90"></img>
                                                                    : <></>} */}
                                                            <div className="input-group">
                                                                <input
                                                                    type="file"
                                                                    className="img"
                                                                    id="img"
                                                                    accept="image/*"
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <h3>Mô tả bài viết</h3>
                                                            <div className="position-relative has-icon-left">
                                                                <input type="text" className="form-control" name="description" id="description" placeholder="Mô tả bài viết" />
                                                                <div className="form-control-position">
                                                                    <i className="feather icon-user"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <h3>Người viết bài</h3>
                                                            <div className="position-relative has-icon-left">
                                                                <input type="text" className="form-control" name="createdBy" id="createdBy" placeholder="Người viết bài" />
                                                                <div className="form-control-position">
                                                                    <i className="feather icon-user"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <h3>Chi tiết bài viết</h3>
                                                        <div className="form-label-group">
                                                            <Editor data={dataCkeditor} onchangeData={handleDataAbout} id="dataCkeditor" />
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
                               </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >

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