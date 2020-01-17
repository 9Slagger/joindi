import React, { Component } from 'react'
import DefaultLayout from "../../common/DefaultLayout"
import CardEvents from "../../common/CardEvents"


export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <h1>this is homepage</h1>
    <CardEvents/>
      </DefaultLayout>
    )
  }
}
