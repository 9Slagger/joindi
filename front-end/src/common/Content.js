import React from "react";
import "../css/Content.css"
import { Layout } from "antd";
export default function Content(props) {
  const { style } = props;
  return (
    <Layout.Content className="layoutContent">
      {props.children}
    </Layout.Content>
  );
}
