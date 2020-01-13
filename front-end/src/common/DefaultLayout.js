import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Content from "./Content";

export default props => {
  return (
    <Layout>
      <Header {...props} />
      <Content>{props.children}</Content>
    </Layout>
  );
};
