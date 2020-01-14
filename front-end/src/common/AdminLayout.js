import React from "react";
import { Layout } from "antd";
import HeaderAdmin from "./HeaderAdmin";
import Content from "./Content";
import Footer from "./Footer";
import SiderAdmin from "./SiderAdmin";
import ContentAdmin from "./ContentAdmin";

export default props => {
  return (
    <Layout>
      <HeaderAdmin {...props} />
      <Layout>
        <SiderAdmin/>
        <ContentAdmin/>
      </Layout>
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};
