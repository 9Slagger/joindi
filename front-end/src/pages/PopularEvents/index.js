import React, { Component } from 'react'
import DefaultLayout from "../../common/DefaultLayout"
import CarouselEvents from "../../common/CarouselEvents"
import CategoriesPopularEvents from "./components/CategoriesPopularEvents"
import {Row} from "antd"

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>

        <Row>
          <CarouselEvents/>
        </Row>

        <Row style={{margin:"50px 10%"}}>
          <CategoriesPopularEvents/>
        </Row>

      </DefaultLayout>
    )
  }
}
