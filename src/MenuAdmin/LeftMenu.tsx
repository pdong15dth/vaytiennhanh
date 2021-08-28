

export default function LeftMenu() {
    return (
        <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
            <div className="navbar-header">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto"><a className="navbar-brand" href="../../../html/ltr/vertical-menu-template/index.html">
                        <div className="brand-logo"></div>
                        <h2 className="brand-text mb-0">Vuexy</h2>
                    </a></li>
                    <li className="nav-item nav-toggle"><a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i className="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i className="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="icon-disc"></i></a></li>
                </ul>
            </div>
            <div className="shadow-bottom"></div>
            <div className="main-menu-content">
                <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li className="nav-item">
                        <a href="/admin">
                            <i className="feather icon-mail"></i>
                            <span className="menu-title" data-i18n="lh">Danh sách liên hệ</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/trang-chu">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">Trang chủ</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/vay-tin-chap">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">Vay tín Chấp</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/seo-keyword">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">SEO Web Keyword</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/tuyen-dung">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">Tuyển dụng</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/zalo">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">Zalo</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/news">
                            <i className="feather icon-home"></i>
                            <span className="menu-title" data-i18n="tt">Tin Tức</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}