import React, { Component } from  "react";
import DefaultLayout from  "../../common/DefaultLayout";
import Product from  "./components/Product.js";
export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <h1>this is about page</h1>
        <Product />
      </DefaultLayout>
    );
  }
}
