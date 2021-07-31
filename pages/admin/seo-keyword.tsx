import { useCallback, useEffect, useState } from "react";
import FooterAdmin from "../../src/Script/FooterAdmin";
import LeftMenu from "../../src/MenuAdmin/LeftMenu";
import TopMenu from "../../src/MenuAdmin/TopMenu";
import HeaderAdmin from "../../src/Script/HeaderAdmin";
import utils from "../../src/utils/constant";
import { toast, ToastContainer } from "react-nextjs-toast";
import authService from "../../src/services/authService/auth.service";
import { useRouter } from "next/router";
import Loading from "../../src/Loading";

export default function Index({ props }) {
    const [seo, setSeo] = useState<any>(null)
    const router = useRouter();
    const [currentLogo, setCurrentLogo] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingLogo, setIsLoadingLogo] = useState(false)

    useEffect(() => {
        const isAdmin = authService.checkAuthAdmin();
        if (!isAdmin) {
            router.push("/admin/login");
        }

        fetch("/api/post/getKeywordSEO").then(response => response.json()).then(result => {
            setSeo(result)
        }).catch(error => console.log('error', error));
    }, [])
    const postForm = async (event) => {
        event.preventDefault();
        var formdata = new FormData();
        formdata.append(
            "image",
            event.target.img.files[0]
        );

        var linkImage = seo?.og_image ?? ""
        var linkImageIcon = seo?.icon_website ?? ""
        setIsLoading(true)

        if (event.target.img.files[0]?.name) {
            setIsLoadingLogo(true)
            console.log("post image")
            await fetch("https://api.imgur.com/3/image", {
                method: "post",
                headers: {
                    Authorization: "Client-ID cb0adfde641e643"
                },
                body: formdata
            }).then(data => data.json()).then(data => {
                setIsLoadingLogo(false)
                console.log(data.data.link)
                linkImage = data.data.link
            })
            setIsLoadingLogo(false)
        } else {
            linkImage = seo?.og_image
        }
        console.log("icon", event.target.icon_website.files)

        var formdata2 = new FormData();
        formdata2.append(
            "image",
            event.target.icon_website.files[0]
        );

        if (event.target.icon_website.files[0]?.name) {
            setIsLoadingLogo(true)
            console.log("post image")

            await fetch("https://api.imgur.com/3/image", {
                method: "post",
                headers: {
                    Authorization: "Client-ID cb0adfde641e643"
                },
                body: formdata2
            }).then(data => data.json()).then(data => {
                setIsLoadingLogo(false)
                console.log(data.data.link)
                linkImageIcon = data.data.link
            })
            setIsLoadingLogo(false)
        } else {
            linkImageIcon = seo?.icon_website
        }

        var data = JSON.stringify({
            description: event.target.description.value,
            keywords: event.target.keywords.value,
            fb_app_id: event.target.fb_app_id.value,
            og_title: event.target.og_title.value,
            og_url: event.target.og_url.value,
            og_image: linkImage,
            icon_website: linkImageIcon,
            og_description: event.target.og_description.value,
            og_site_name: event.target.og_site_name.value,
            og_see_also: event.target.og_see_also.value,
            og_locale: event.target.og_locale.value,
            article_author: event.target.article_author.value,
            twitter_card: event.target.twitter_card.value,
            twitter_url: event.target.twitter_url.value,
            twitter_title: event.target.twitter_title.value,
            twitter_description: event.target.twitter_description.value,
            twitter_image: event.target.twitter_image.value,
            author: event.target.author.value,
            generator: event.target.generator.value,
            copyright: event.target.copyright.value,
        });
        console.log(data);
        fetch("/api/post/updateKeywordSEO", {
            method: "POST",
            body: data
        }).then((res) => {
            fetch("/api/post/getKeywordSEO").then(response => response.json()).then(result => {
                setSeo(result)
                setIsLoading(false)
            }).catch(error => console.log('error', error));
            setIsLoading(false)
            toast.notify(`Chỉnh sửa thành công`, {
                title: "Thành công",
                duration: 3,
                type: "success",
            });
        }).catch((error) => {
            setIsLoading(false)
            console.log(error);
            toast.notify(`${error.message}`, {
                title: "Lỗi",
                duration: 5,
                type: "error",
            });
        });
    };

    const renderCardInfoseo = (seo) => {
        console.log("seo ne", seo)
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Keyword SEO</h4>
                </div>
                <div className="card-body">
                    <table>
                        <tr>
                            <td className="font-weight-bold">Mô tả</td>
                            <td>{seo?.description}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Keywords</td>
                            <td>{seo?.keywords}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Facebook App ID</td>
                            <td>{seo?.fb_app_id}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_title</td>
                            <td>{seo?.og_title}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_url</td>
                            <td>{seo?.og_url}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_image</td>
                            <td>{seo?.og_image}
                                {seo?.og_image ?
                                    <img className="img-fluid bg-cover rounded-0 w-100" src={`${seo?.og_image}`} alt="User Profile Image" />
                                    : <></>}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Icon Website</td>
                            <td>{seo?.icon_website}
                                {seo?.icon_website ?
                                    <img className="img-fluid bg-cover rounded-0 w-100" src={`${seo?.icon_website}`} alt="User Profile Image" />
                                    : <></>}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_description</td>
                            <td>{seo?.og_description}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_site_name</td>
                            <td>{seo?.og_site_name}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_see_also</td>
                            <td>{seo?.og_see_also}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">og_locale</td>
                            <td>{seo?.og_locale}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">article_author</td>
                            <td>{seo?.article_author}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">twitter_card</td>
                            <td>{seo?.twitter_card}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">twitter_url</td>
                            <td>{seo?.twitter_url}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">twitter_title</td>
                            <td>{seo?.twitter_title}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">twitter_description</td>
                            <td>{seo?.twitter_description}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">twitter_image</td>
                            <td>{seo?.twitter_image}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">author</td>
                            <td>{seo?.author}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">generator</td>
                            <td>{seo?.generator}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">copyright</td>
                            <td>{seo?.copyright}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        )
    }
    const renderContent = () => {
        return (
            <div className="content-body">
                <section id="multiple-column-form">
                    <div className="row match-height">
                        <div className="col-md-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Keyword SEO</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form form-vertical" onSubmit={postForm}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="description">Mô tả website</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="description" className="form-control" defaultValue={seo?.description} name="description" placeholder="Mô tả website" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="keywords">Keywords</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="keywords" className="form-control" defaultValue={seo?.keywords} name="keywords" placeholder="Keywords" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-mail"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="fb_app_id">Facebook App ID</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="fb_app_id" className="form-control" defaultValue={seo?.fb_app_id} name="fb_app_id" placeholder="Facebook App ID" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_title">og_title</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_title" className="form-control" defaultValue={seo?.og_title} name="og_title" placeholder="og_title" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_url">og_url</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_url" className="form-control" defaultValue={seo?.og_url} name="og_url" placeholder="og_url" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-12">
                                                            <label htmlFor="og_image">og_image</label>
                                                            <div className="position-relative has-icon-left">
                                                                <input type="text" id="og_image" className="form-control" defaultValue={seo?.og_image} name="og_image" disabled placeholder="og_image" />
                                                                <div className="form-control-position">
                                                                    <i className="feather icon-smartphone"></i>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <div className="form-group col-12">
                                                            <label htmlFor="icon">Icon Website</label>
                                                            <div className="position-relative has-icon-left">
                                                                <input type="text" id="icon" className="form-control" defaultValue={seo?.icon_website} name="icon" disabled placeholder="Icon Website" />
                                                                <div className="form-control-position">
                                                                    <i className="feather icon-smartphone"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-label-group col-md-12 col-12">
                                                            <label className="form-label" htmlFor="icon_website">
                                                                Chọn hình ảnh từ máy tính
                                                            </label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="file"
                                                                    className="img"
                                                                    id="icon_website"
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            {isLoadingLogo ? Loading() : <></>}
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_description">og_description</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_description" className="form-control" defaultValue={seo?.og_description} name="og_description" placeholder="og_description" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_site_name">og_site_name</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_site_name" className="form-control" defaultValue={seo?.og_site_name} name="og_site_name" placeholder="og_site_name" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_see_also">og_see_also</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_see_also" className="form-control" defaultValue={seo?.og_see_also} name="og_see_also" placeholder="og_see_also" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="og_locale">og_locale</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="og_locale" className="form-control" defaultValue={seo?.og_locale} name="og_locale" placeholder="og_locale" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="article_author">article_author</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="article_author" className="form-control" defaultValue={seo?.article_author} name="article_author" placeholder="article_author" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="twitter_card">twitter_card</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="twitter_card" className="form-control" defaultValue={seo?.twitter_card} name="twitter_card" placeholder="twitter_card" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="twitter_url">twitter_url</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="twitter_url" className="form-control" defaultValue={seo?.twitter_url} name="twitter_url" placeholder="twitter_url" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="twitter_title">twitter_title</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="twitter_title" className="form-control" defaultValue={seo?.twitter_title} name="twitter_title" placeholder="twitter_title" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="twitter_description">twitter_description</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="twitter_description" className="form-control" defaultValue={seo?.twitter_description} name="twitter_description" placeholder="twitter_description" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="twitter_image">twitter_image</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="twitter_image" className="form-control" defaultValue={seo?.twitter_image} name="twitter_image" placeholder="twitter_image" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="author">author</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="author" className="form-control" defaultValue={seo?.author} name="author" placeholder="author" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="generator">generator</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="generator" className="form-control" defaultValue={seo?.generator} name="generator" placeholder="generator" />
                                                                    <div className="form-control-position">
                                                                        <i className="feather icon-smartphone"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="copyright">copyright</label>
                                                                <div className="position-relative has-icon-left">
                                                                    <input type="text" id="copyright" className="form-control" defaultValue={seo?.copyright} name="copyright" placeholder="copyright" />
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
                                                <div className="col-12">
                                                    {isLoading ? Loading() : <></>}
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- information start --> */}
                        <div className="col-md-6 col-12 ">
                            {seo != null ? renderCardInfoseo(seo) : renderCardInfoseo(null)}
                        </div>
                        {/* <!-- information start --> */}

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
                        {renderContent()}
                    </div>
                </div>

                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>
                <ToastContainer align={"right"} />
                {FooterAdmin()}
            </body>
        </>
    )
}