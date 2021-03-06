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
        //ti??u ????? tuy???n d???ng
        const data = {
            //ti??u ????? tuy???n d???ng
            content: dataCkeditorRequire,
        }
        console.log(data)
        setIsLoading2(true)
        fetch("/api/tuyendung/postTuyendung", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res)
            toast.notify(`Ch???nh s???a th??nh c??ng`, {
                title: "Th??nh c??ng",
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
    //     //ti??u ????? tuy???n d???ng
    //     const data = {
    //         //ti??u ????? tuy???n d???ng
    //         titleJob: event.target.titleJob.value,
    //         //Li??n h??? v???i ch??ng t??i
    //         titleForm: event.target.titleForm.value,
    //         //N??i l??m vi???c
    //         address: event.target.address.value,
    //         //C???p B??tj
    //         rank: event.target.rank.value,
    //         //H??nh th???c
    //         form: event.target.form.value,
    //         //B???ng C???p
    //         certificate: event.target.certificate.value,
    //         //Kinh nghi???m
    //         experience: event.target.experience.value,
    //         //M???c l????ng Int?
    //         rangeSalary: parseInt(event.target.rangeSalary.value),
    //         // Ng??nh ngh???
    //         career: event.target.career.value,
    //         //H???n ch??t
    //         deadline: utils.formatDate(event.target.deadline.value),
    //         //Ph??c l???i
    //         welfare: welfareSelected,
    //         //M?? t??? job
    //         descriptionJob: dataCkeditor,
    //         requirementJob: dataCkeditorRequire,
    //     }
    //     setIsLoading2(true)
    //     fetch("/api/tuyendung/postRecruitment", {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     }).then((res) => {
    //         toast.notify(`Ch???nh s???a th??nh c??ng`, {
    //             title: "Th??nh c??ng",
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
    //                         <input type="text" className="form-control" id="title" name="title" placeholder="T??n ph??c l???i" aria-describedby="button-addon2" required />
    //                         <input type="text" className="form-control" id="id" name="id" hidden />
    //                         <div className="input-group-append" id="button-addon2">
    //                             <button className="btn btn-primary" disabled={isLoading1} type="submit">Th??m</button>
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
                                        <h2 className="content-header-title float-left mb-0">Vay Ti???n</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item active">Danh s??ch ng?????i vay
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
                                            Ch???nh s???a th??ng tin tuy???n d???ng
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
                                                <h4 className="card-title">Ch???nh s???a th??ng tin tuy???n d???ng</h4>
                                            </div>
                                            <div className="card-content">
                                                {/* <div className="table-responsive border rounded px-1">
                                                    <h6 className=" py-1 mx-1 mb-0 font-medium-2">
                                                        <i className="feather icon-lock mr-50 "></i>
                                                        Ph??c L???i
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
                                                                        <label>Ti???u ????? Form</label>
                                                                        <input type="text" defaultValue={currentData?.titleForm} id="titleForm" name="titleForm" className="form-control" placeholder="Ti???u ????? Form" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Ti???u ????? Tuy???n D???ng</label>
                                                                        <input type="text" defaultValue={currentData?.titleJob} id="titleJob" name="titleJob" className="form-control" placeholder="Ti???u ????? Tuy???n D???ng" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>N??i L??m Vi???c</label>
                                                                        <input type="text" defaultValue={currentData?.address} id="address" name="address" className="form-control" placeholder="N??i L??m Vi???c" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>B???ng C???p</label>
                                                                        <input type="text" defaultValue={currentData?.certificate} id="certificate" name="certificate" className="form-control" placeholder="B???ng C???p" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>H??nh Th???c</label>
                                                                        <input type="text" defaultValue={currentData?.form} id="form" name="form" className="form-control" placeholder="H??nh Th???c" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Ng??y H???t H???n</label>
                                                                        <input type="date" data-date-format="DD-MM-YYYY" defaultValue={utils.formatDateRevert(currentData?.deadline)} id="deadline" name="deadline" className="form-control pickadate" placeholder="Ng??y H???t H???n" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>C???p B???t</label>
                                                                        <input type="text" defaultValue={currentData?.rank} id="rank" name="rank" className="form-control" placeholder="C???p B???t" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Kinh Nghi???m</label>
                                                                        <input type="text" defaultValue={currentData?.experience} id="experience" name="experience" className="form-control" placeholder="Kinh Nghi???m" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>M???c l????ng</label>
                                                                        <input type="number" defaultValue={currentData?.rangeSalary} id="rangeSalary" name="rangeSalary" className="form-control" placeholder="M???c L????ng" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="controls">
                                                                        <label>Ng??nh Ngh???</label>
                                                                        <input type="text" defaultValue={currentData?.career} id="career" name="career" className="form-control" placeholder="Ng??nh Ngh???" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="table-responsive border rounded px-1">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2">
                                                                        <i className="feather icon-lock mr-50 "></i>
                                                                        <input type="text" defaultValue="Ph??c L???i" id="titlePhucLoi" name="titlePhucLoi" className="custom-form-control" placeholder="Ng??nh Ngh???" />
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
                                                                        <input type="text" defaultValue="M?? T??? C??ng Vi???c" id="titleMotaCV" name="titleMotaCV" className="custom-form-control" placeholder="Ng??nh Ngh???" />
                                                                    </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="descriptionJob">M?? T??? C??ng Vi???c</label>
                                                                            <Editor data={currentData?.descriptionJob} onchangeData={handleData} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                             <div className="col-12">
                                                                <div className="table-responsive border rounded px-1 ">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2"><i className="feather icon-lock mr-50 "></i>
                                                                        <input type="text" defaultValue="Y??u C???u C??ng Vi???c" id="titleYeucauCV" name="titleYeucauCV" className="custom-form-control" placeholder="Ng??nh Ngh???" />
                                                                    </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="requirementJob">Y??u C???u C??ng Vi???c</label>
                                                                            <Editor data={currentData?.requirementJob} onchangeData={handleDataRequire} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <div className="col-12">
                                                                <div className="table-responsive border rounded px-1 ">
                                                                    <h6 className="border-bottom py-1 mx-1 mb-0 font-medium-2"><i className="feather icon-lock mr-50 "></i>
                                                                        Th??ng Tin Tuy???n D???ng   </h6>
                                                                    <div className="form-group">
                                                                        <fieldset className="form-label-group">
                                                                            <label htmlFor="requirementJob">Th??ng Tin Tuy???n D???ng</label>
                                                                            <Editor data={currentData?.content} onchangeData={handleDataRequire} />
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                                <button type="submit" disabled={isLoading2} className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">L??u Thay ?????i</button>
                                                                <button type="reset" className="btn btn-outline-warning">H???y B???</button>
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