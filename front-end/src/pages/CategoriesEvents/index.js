import React, { Component } from "react";
import "../CategoriesEvents/components/CategoriesEvents.css";
import DefaultLayout from "../../common/DefaultLayout";
import CarouselEvents from "../../common/CarouselEvents";
import CategoriesEvents from "./components/CategoriesEvents";
import { serviceEvent } from "../../_service";
import { Row, Divider, Col } from "antd";

export default class index extends Component {
  state = {
    categoryEvent: {
      id: 0,
      category_name_en: "",
      category_name_th: "",
      createdAt: "",
      updatedAt: "",
      events: []
    }
  };

  componentDidMount = () => {
    this.getCategorie();
    console.log("----------------didmount");
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.categorieId !== this.props.match.params.categorieId
    ) {
      this.getCategorie();
      console.log("pokemons state has changed.");
    }
  }

  getCategorie = async () => {
    try {
      const res = await serviceEvent.getCategorieAndEvents(
        this.props.match.params.categorieId
      );
      const categoryEvent = res.result;
      this.setState({ categoryEvent });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { categoryEvent } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          <CarouselEvents />
        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            <h3>{categoryEvent.category_name_en}</h3>
          </Col>
          <Col span={22}>
            <Divider />
            {categoryEvent.events &&
              categoryEvent.events.map(event => (
                <CategoriesEvents event={event} key={event.id} />
              ))}
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
