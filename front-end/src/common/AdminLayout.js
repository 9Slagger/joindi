import React from  "react";
import { Layout } from  "antd";
import HeaderAdmin from  "./HeaderAdmin";
import Content from  "./Content";
import Footer from  "./Footer";
import SiderAdmin from  "./SiderAdmin";

export default props => {
  return (
    <Layout>
      <HeaderAdmin {...props} />
      <Layout>
        <SiderAdmin />
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};
