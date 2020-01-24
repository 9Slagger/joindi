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
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.categorieId !== this.props.match.params.categorieId
    ) {
      this.getCategorie();
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
            <h3 className="textCategoryEvent">
              {categoryEvent.category_name_en}
            </h3>
            <Divider />
          </Col>

          {categoryEvent.events &&
            categoryEvent.events.map(event => (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={5}
                key={event.id}
                className="colCategoryEvent"
              >
                <CategoriesEvents event={event} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    );
  }
}
