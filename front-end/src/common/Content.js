import React from "react";
import { Layout } from "antd";
export default function Content(props) {
  const { style } = props;
  return (
    <Layout.Content style={{ backgroundColor: "#FFFFFF", ...style }}>
      {props.children}
    </Layout.Content>
  );
}
