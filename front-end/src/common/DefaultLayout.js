import React from  "react";
import { Layout } from  "antd";
import Header from  "./Header";
import Content from  "./Content";
import Footer from  "./Footer";

export default props => {
  return (
    <Layout>
      <Header {...props} closeDrawer={props.closeDrawer} />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};
