import React, { Component } from 'react'
import DefaultLayout from "../../common/DefaultLayout"
import CarouselPopularEvents from "./components/CarouselPopularEvents"
import CategoriesPopularEvents from "./components/CategoriesPopularEvents"
import {Row} from "antd"

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>

        <Row>
          <CarouselPopularEvents/>
        </Row>

        <Row style={{margin:"50px 10%"}}>
          <CategoriesPopularEvents/>
        </Row>

      </DefaultLayout>
    )
  }
}
