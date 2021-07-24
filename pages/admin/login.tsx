import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { LoginDataModel } from "../../src/models/AdminDataResult";
import authService from "../../src/services/authService/auth.service";
import localStorageService from "../../src/services/localStorage.service/localStorage.service";
import utils from "../../src/utils/constant";

export default function Index() {
    const router = useRouter();
    const [error, setError] = useState("")

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

    }, [])
    const login = async (event) => {
        event.preventDefault();
        console.log(utils.checkEmptyString(event.target.username.value) == "", event.target.password.value)

        if (event.target.username.value == "" || event.target.username.value == "") {
            setError("Vui lòng không bỏ trống Tài khoản hoặc Mật khẩu")
            console.log(error)
            console.log("lòng không bỏ trống Tài khoản hoặc ")

            return
        } else {

            var data = JSON.stringify({
                "username": "dong123",
                "password": "dong123"
            });
            console.log(data)
            await fetch("/api/user/login", {
                method: 'POST',
                body: data,
                redirect: 'follow'
            }).then(response => {
                response.json()
                    .then(result => {
                        console.log("result", result)
                        const userInfor: any = result;
                        localStorageService.userInfor.set(new LoginDataModel(userInfor));
                    })
            }).catch(error => console.log('error', error));
            window.location.href = "/admin"
        }

    }
    const showErrorForm = (error) => {
        console.log("showErrorForm", error)
        return (
            <p style={{ color: "red" }}>{error}</p>
        )
    }
    return (
        <Fragment>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
            <meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities." />
            <meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app" />
            <meta name="author" content="PIXINVENT" />
            <title>Đăng nhập</title>
            <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png" />
            <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet" />

            <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css" />

            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css" />

            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/colors/palette-gradient.css" />
            <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/authentication.css" />

            <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css" />

            <body className="vertical-layout vertical-menu-modern 1-column  navbar-floating footer-static bg-full-screen-image  blank-page blank-page" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <section className="row flexbox-container">
                                <div className="col-xl-8 col-11 d-flex justify-content-center">
                                    <div className="card bg-authentication rounded-0 mb-0">
                                        <div className="row m-0">
                                            <div className="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                                                <img src="../../../app-assets/images/pages/login.png" alt="branding logo" />
                                            </div>
                                            <div className="col-lg-6 col-12 p-0">
                                                <div className="card rounded-0 mb-0 px-2">
                                                    <div className="card-header pb-1">
                                                        <div className="card-title">
                                                            <h4 className="mb-0">Đăng Nhập</h4>
                                                        </div>
                                                    </div>
                                                    <p className="px-2">Chào mừng trở lại, vui lòng đăng nhập vào tài khoản của bạn.</p>
                                                    <div className="card-content">
                                                        <div className="card-body pt-1">
                                                            <form onSubmit={login}>
                                                                <fieldset className="form-label-group form-group position-relative has-icon-left">
                                                                    <input type="text" className="form-control" id="username" name="username" placeholder="Tài khoản" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                    <label htmlFor="username">Tài khoản</label>
                                                                </fieldset>

                                                                <fieldset className="form-label-group position-relative has-icon-left">
                                                                    <input type="password" className="form-control" id="password" name="password" placeholder="Mật khẩu" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-lock"></i>
                                                                    </div>
                                                                    <label htmlFor="password">Mật khẩu</label>
                                                                </fieldset>
                                                                {error != "" ? showErrorForm(error) : <></>}
                                                                {/* <a href="auth-register.html" className="btn btn-outline-primary float-left btn-inline">Register</a> */}
                                                                <button type="submit" className="btn btn-primary float-right btn-inline">Đăng nhập</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="login-footer">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>


                <script src="../../../app-assets/vendors/js/vendors.min.js"></script>

                <script src="../../../app-assets/js/core/app-menu.js"></script>
                <script src="../../../app-assets/js/core/app.js"></script>
                <script src="../../../app-assets/js/scripts/components.js"></script>
            </body>
        </Fragment>
    )
}