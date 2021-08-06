import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import prisma from "../../../lib/prisma";
import FooterAdmin from "../../../src/Script/FooterAdmin";
import LeftMenu from "../../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../../src/Script/HeaderAdmin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useRouter } from "next/router";
import authService from "../../../src/services/authService/auth.service";
import utils from "../../../src/utils/constant";
import Loading from "../../../src/Loading";
import { toast, ToastContainer } from "react-nextjs-toast";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../src/ckeditor"), {
    ssr: false,
});

Index.getInitialProps = async ({ req, res }: any) => {
    // var welfare = await prisma.welfare.findMany()
    var currentData = await prisma.tuyenDung.findFirst({
        where: {
            id: 1
        }
    })

    return { props: { currentData } };
}
export default function Index({ props }) {


    const router = useRouter();
    // const welfare = props.welfare
    console.log(props)
    //props.currentData.welfare
    // const [welfareSelected, setWelfareSelected] = useState(props.currentData?.welfare)
    // setWelfareSelected[props.currentData?.welfare]
    const currentData = props.currentData
    // const [isLoading1, setIsLoading1] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

    }, [])

    // let dataCkeditor = currentData?.descriptionJob ?? "";
    // const handleData = (dataTemplate) => {
    //     dataCkeditor = dataTemplate;
    // };
    console.log("tao ne", currentData?.content)
    let dataCkeditorRequire = currentData?.content ?? "";
    console.log("tao ne", dataCkeditorRequire)

    const handleDataRequire = (dataTemplate) => {
        dataCkeditorRequire = dataTemplate;
    };

    const postData = (event) => {
        event.preventDefault();
        //tiêu đề tuyển dụng
        const data = {
            //tiêu đề tuyển dụng
            content: dataCkeditorRequire,
        }
        console.log(data)
        setIsLoading2(true)
        fetch("/api/tuyendung/postTuyendung", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res)
            toast.notify(`Chỉnh sửa thành công`, {
                title: "Thành công",
                duration: 3,
                type: "success",
            });
            setIsLoading2(false)
        }).catch(() => {
            setIsLoading2(false)
        })
    }
    // const postData = (event) => {
    //     event.preventDefault();
    //     //tiêu đề tuyển dụng
    //     const data = {
    //         //tiêu đề tuyển dụng
    //         titleJob: event.target.titleJob.value,
    //         //Liên hệ với chúng tôi
    //         titleForm: event.target.titleForm.value,
    //         //Nơi làm việc
    //         address: event.target.address.value,
    //         //Cấp Bâtj
    //         rank: event.target.rank.value,
    //         //Hình thức
    //         form: event.target.form.value,
    //         //Bằng Cấp
    //         certificate: event.target.certificate.value,
    //         //Kinh nghiệm
    //         experience: event.target.experience.value,
    //         //Mức lương Int?
    //         rangeSalary: parseInt(event.target.rangeSalary.value),
    //         // Ngành nghề
    //         career: event.target.career.value,
    //         //Hạn chót
    //         deadline: utils.formatDate(event.target.deadline.value),
    //         //Phúc lợi
    //         welfare: welfareSelected,
    //         //Mô tả job
    //         descriptionJob: dataCkeditor,
    //         requirementJob: dataCkeditorRequire,
    //     }
    //     setIsLoading2(true)
    //     fetch("/api/tuyendung/postRecruitment", {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     }).then((res) => {
    //         toast.notify(`Chỉnh sửa thành công`, {
    //             title: "Thành công",
    //             duration: 3,
    //             type: "success",
    //         });
    //         setIsLoading2(false)
    //     }).catch(() => {
    //         setIsLoading2(false)
    //     })
    // }

    // const addWelfare = (event) => {
    //     event.preventDefault();

    //     const data = {
    //         title: event.target.title.value,
    //     }
    //     setIsLoading1(true)
    //     fetch("/api/tuyendung/postWelfare", {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     }).then(() => {
    //         fetch("/api/tuyendung/getWelfare").then(result => result.json().then(res => {
    //             // setWelfare(res)
    //             setIsLoading1(false)
    //         })).catch(() => {
    //             setIsLoading1(false)
    //         })
    //     }).catch(() => {
    //         setIsLoading1(false)
    //     })

    // }
    // const ModelWelfare = (id = null) => {
    //     return (
    //         <>
    //             <form onSubmit={addWelfare}>
    //                 <fieldset>
    //                     <div className="input-group">
    //                         <input type="text" className="form-control" id="title" name="title" placeholder="Tên phúc lợi" aria-describedby="button-addon2" required />
    //                         <input type="text" className="form-control" id="id" name="id" hidden />
    //                         <div className="input-group-append" id="button-addon2">
    //                             <button className="btn btn-primary" disabled={isLoading1} type="submit">Thêm</button>
    //                         </div>
    //                     </div>
    //                 </fieldset>
    //             </form>
    //             {isLoading1 ? Loading() : <></>}
    //         </>
    //     )
    // }
    // const addItem = (item, status) => {
    //     var items = [...welfareSelected]
    //     if (status.checked) {
    //         items.push(item.title)
    //         setWelfareSelected(items)
    //     } else {
    //         items = items.filter(function (e) { return e !== item.title })
    //         setWelfareSelected(items)
    //     }
    //     console.log(items);

    // }

    // const renderItemWelfare = (items, item2) => {
    //     return items?.map((item, index) => {
    //         const checked = item2?.find(element => element == item.title) ? true : false
    //         return (
    //             <li className="d-inline-block mr-2" key={index}>
    //                 <fieldset>
    //                     <div className="custom-control custom-checkbox">
    //                         <input type="checkbox" className="custom-control-input" defaultChecked={checked} onClick={(event) => addItem(item, event.target)} name={`customCheck${item.id}`} id={`customCheck${item.id}`} />
    //                         <label className="custom-control-label" htmlFor={`customCheck${item.id}`}>{item.title}</label>
    //                     </div>
    //                 </fieldset>
    //             </li>
    //         )
    //     })
    // }
    return (
        <>
            {HeaderAdmin()}
            <Head>
                <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css" />
                <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/colors/palette-gradient.css" />

            </Head>
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
                                        <a className="btn-icon btn btn-primary btn-round btn-sm" href="/admin/tuyen-dung/thongtintuyendung">
                                            Chỉnh sửa thông tin tuyển dụng
                                        </a>
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
                                                <h4 className="card-title">Chỉnh sửa thông tin tuyển dụng</h4>
                                            </div>
                                            <div className="card-content">
                                                {/* <div className="table-responsive border rounded px-1">
                                                    <h6 className=" py-1 mx-1 mb-0 font-medium-2">
                                                        <i className="feather icon-lock mr-50 "></i>
                                                        Phúc Lợi
                                                    </h6>
                                                    <div className="col-6 mb-1">
                                                        <ModelWelfare />

                                                    </div>
                                                </div> */}
                                                <div className="card-body card-dashboard">

                                                    <form onSubmit={postData}>
                                                        <div className="row mt-1">
                                                            {/* <div className="col-12">
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Tiểu Đề Form</label>
                                                                        <input type="text" defaultValue={currentData?.titleForm} id="titleForm" name="titleForm" className="form-control" placeholder="Tiểu Đề Form" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Tiểu Đề Tuyển Dụng</label>
                                                                        <input type="text" defaultValue={currentData?.titleJob} id="titleJob" name="titleJob" className="form-control" placeholder="Tiểu Đề Tuyển Dụng" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Nơi Làm Việc</label>
                                                                        <input type="text" defaultValue={currentData?.address} id="address" name="address" className="form-control" placeholder="Nơi Làm Việc" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Bằng Cấp</label>
                                                                        <input type="text" defaultValue={currentData?.certificate} id="certificate" name="certificate" className="form-control" placeholder="Bằng Cấp" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Hình Thức</label>
                                                                        <input type="text" defaultValue={currentData?.form} id="form" name="form" className="form-control" placeholder="Hình Thức" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Ngày Hết Hạn</label>
                                                                        <input type="date" data-date-format="DD-MM-YYYY" defaultValue={utils.formatDateRevert(currentData?.deadline)} id="deadline" name="deadline" className="form-control pickadate" placeholder="Ngày Hết Hạn" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Cấp Bật</label>
                                                                        <input type="text" defaultValue={currentData?.rank} id="rank" name="rank" className="form-control" placeholder="Cấp Bật" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Kinh Nghiệm</label>
                                                                        <input type="text" defaultValue={currentData?.experience} id="experience" name="experience" className="form-control" placeholder="Kinh Nghiệm" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Mức lương</label>
                                                                        <input type="number" defaultValue={currentData?.rangeSalary} id="rangeSalary" name="rangeSalary" className="form-control" placeholder="Mức Lương" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Ngành Nghề</label>
                                                                        <input type="text" defaultValue={currentData?.career} id="career" name="career" className="form-control" placeholder="Ngành Nghề" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="table-responsive border rounded px-1">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2">
                                                                        <i className="feather icon-lock mr-50 "></i>
                                                                        <input type="text" defaultValue="Phúc Lợi" id="titlePhucLoi" name="titlePhucLoi" className="custom-form-control" placeholder="Ngành Nghề" />
                                                                    </h6>
                                                                    <div className="form-group col-6">
                                                                        <label></label>
                                                                        <ul className="list-unstyled mb-0">
                                                                            {renderItemWelfare(welfare, welfareSelected)}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="table-responsive border rounded px-1 ">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2"><i className="feather icon-lock mr-50 "></i>
                                                                        <input type="text" defaultValue="Mô Tả Công Việc" id="titleMotaCV" name="titleMotaCV" className="custom-form-control" placeholder="Ngành Nghề" />
                                                                    </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="descriptionJob">Mô Tả Công Việc</label>
                                                                            <Editor data={currentData?.descriptionJob} onchangeData={handleData} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                             <div className="col-12">
                                                                <div className="table-responsive border rounded px-1 ">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2"><i className="feather icon-lock mr-50 "></i>
                                                                        <input type="text" defaultValue="Yêu Cầu Công Việc" id="titleYeucauCV" name="titleYeucauCV" className="custom-form-control" placeholder="Ngành Nghề" />
                                                                    </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="requirementJob">Yêu Cầu Công Việc</label>
                                                                            <Editor data={currentData?.requirementJob} onchangeData={handleDataRequire} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <div className="col-12">
                                                                <div className="table-responsive border rounded px-1 ">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2"><i className="feather icon-lock mr-50 "></i>
                                                                        Thông Tin Tuyển Dụng   </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="requirementJob">Thông Tin Tuyển Dụng</label>
                                                                            <Editor data={currentData?.content} onchangeData={handleDataRequire} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                                <button type="submit" disabled={isLoading2} className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Lưu Thay đổi</button>
                                                                <button type="reset" className="btn btn-outline-warning">Hủy Bỏ</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {isLoading2 ? Loading() : <></>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <ToastContainer align={"right"} />
                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>
                {FooterAdmin()}
                <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.js"></script>
                <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.date.js"></script>
                <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.time.js"></script>
                <script src="../../../app-assets/vendors/js/pickers/pickadate/legacy.js"></script>

                <script src="../../../app-assets/js/scripts/pickers/dateTime/pick-a-datetime.js"></script>

            </body>
        </>
    )
}