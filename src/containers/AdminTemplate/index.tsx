import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import authService from "../../services/authService/auth.service";
import AdminSidebar from "../../components/adminSidebar";
import AdminTopBar from "../../components/adminTopBar";
import AdminFooter from "../../components/adminFooter";
import { toast, ToastContainer } from "react-nextjs-toast";

type T_AdminTemplateProps = {
  head?: HTMLHeadElement;
  title: string;
  className?: string;
};

const AdminTemplate: React.FC<T_AdminTemplateProps> = ({
  head,
  title,
  className,
  ...props
}) => {
  const router = useRouter();
  useEffect(() => {
    const isAdmin = authService.checkAuthAdmin();
    if (!isAdmin) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>

        {head}
      </Head>
      <main id="wrapper">
        <AdminSidebar />
        <section className="main_content dashboard_part large_header_bg">
          <AdminTopBar />

          <div className="main_content_iner">
            <div className="container-fluid p-0">
              <div className="row justify-content-center">{props.children}</div>
            </div>
          </div>
          <AdminFooter />
          <ToastContainer align={"right"} />
        </section>
      </main>
    </>
  );
};

export default AdminTemplate;
