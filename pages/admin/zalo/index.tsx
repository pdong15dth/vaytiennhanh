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
import { toast, ToastContainer } from "react-nextjs-toast";

// Common editors usually work on client-side, so we use Next.js's dynamic import with mode ssr=false to load them on client-side
const Editor = dynamic(() => import("../../../src/ckeditor"), {
    ssr: false,
});

export default function Index({ props }) {

    const [error, setError] = useState<any>(null)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [social, setSocial] = useState<any>(null)

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

        async function fetchMyAPI() {
            fetch("/api/social/getSocial").then(response => response.json()).then(result => {
                setSocial(result)
            }).catch(error => console.log('error', error));
        }

        fetchMyAPI()
    }, [])

    const postFormData = (event) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            var data = {
                value: event.target.value.value
            }
            fetch("/api/social/upsertSocial", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                fetch("/api/social/getSocial").then(response => response.json()).then(result => {
                    console.log("setSocial", result)
                    setSocial(result)
                    setIsLoading(false)
                    toast.notify(`Chỉnh sửa thành công`, {
                        title: "Thành công",
                        duration: 3,
                        type: "success",
                    });
                }).catch(error => {
                    setIsLoading(false)
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
                                    <h4 className="card-title">Zalo</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form" onSubmit={postFormData}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-label-group">
                                                            <label htmlFor="value">Số điện thoại Zalo</label>
                                                            <input type="text" id="value" className="form-control" defaultValue={social?.value} placeholder="Số điện thoại Zalo" name="name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-12">
                                                        <div className="form-label-group">

                                                            <h3>Nhấn vào Icon Zalo bên dưới để kiểm tra</h3>
                                                            <div className="avatar mr-50">
                                                                <a href={`https://chat.zalo.me/?phone=${social?.value}`} target="_blank" rel="noopener noreferrer">
                                                                    <img src="../../../img/zalo-icon57x57.png" id="zalo" alt="avtar img holder" height="35" width="35" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {isLoading ? Loading() : <></>}
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Đồng ý</button>
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
                <ToastContainer align={"right"} />
            </body>
        </>
    )
}