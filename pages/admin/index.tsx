import Head from "next/head";
import { useEffect, useState } from "react";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import authService from "../../src/services/authService/auth.service";
import { useRouter } from "next/router";
import utils from "../../src/utils/constant";

export default function Index({ props }) {

    const [users, setUsers] = useState<any>(null)
    const router = useRouter();
    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }
        async function fetchMyAPI() {
            fetch("/api/post/listUser").then(response => response.json()).then(result => {
                setUsers(result)
            }).catch(error => console.log('error', error));
        }

        fetchMyAPI()
    }, [])

    const onclickContact = (id) => {
        confirmAlert({
            title: "Xác nhận đã liên lạc",
            message: `Bạn có chắc muốn xác nhận user có ID: ${id}`,
            buttons: [
                {
                    label: "Đồng ý",
                    onClick: () => {
                        var body = { id }
                        fetch("/api/post/confirmUser", {
                            method: "POST",
                            body: JSON.stringify(body)
                        }).then(() => {
                            fetch("/api/post/listUser").then(response => response.json()).then(result => {
                                setUsers(result)
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
    const renderRowUser = (users) => {
        if (users == null) {
            console.log("user null roi dmm")
            return
        }
        console.log("user dang co du lieu roi dmm", users)
        return users?.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.amount}</td>
                    <td>{item.type_amount}</td>
                    <td>{utils.formatDate(item.createdAt)}</td>
                    {item.isActive ?
                        <td><button type="button" className="btn btn-outline-success square mr-1 mb-1 waves-effect waves-light">Đã liên lạc</button></td>
                        :
                        <button type="button" className="btn btn-outline-danger square mr-1 mb-1 waves-effect waves-light" onClick={() => onclickContact(item.id)}>Chưa liên lạc</button>
                    }
                </tr>
            )
        })
    }
    const renderTableView = () => {
        return (
            <div className="table-responsive">
                {users != null ?
                    <table className="table zero-configuration">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ & Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>CMND/CCCD</th>
                                <th>Khoản Vay</th>
                                <th>Nhận Lương</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users != null ? renderRowUser(users) : <></>}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Họ & Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>CMND/CCCD</th>
                                <th>Khoản Vay</th>
                                <th>Nhận Lương</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                            </tr>
                        </tfoot>
                    </table> : <></>}
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
                                        <h2 className="content-header-title float-left mb-0">Vay Tiền</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item active">Danh sách người vay
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
                        <div className="content-body">
                            <section id="basic-datatable">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">Danh sách liên hệ vay tiền nhanh</h4>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body card-dashboard">
                                                    {users != null ? renderTableView() : <></>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>

                {FooterAdmin()}
            </body>
        </>
    )
}