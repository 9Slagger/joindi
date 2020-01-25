import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import SiderUser from "./SiderUser";
import Footer from "./Footer";
import Content from "./Content";

export default props => {
  return (
    <Layout>
      <Header {...props} />
      <Layout>
        <SiderUser />
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
