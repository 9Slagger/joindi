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
      events: [],
    },
    closeDrawer: false
  };

  componentDidMount = () => {
    this.getCategorie();
    console.log("----------------didmount");
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.categorieId !== this.props.match.params.categorieId) {
      this.setState({ closeDrawer: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.categorieId !== this.props.match.params.categorieId
    ) {
      this.getCategorie();
      this.setState({ closeDrawer: false })
      console.log("pokemons state has changed.");
    }
  }

  getCategorie = async () => {
    try {
      const res = await serviceEvent.getCategorieAndEvents(
        this.props.match.params.categorieId
      );
      console.log("res.result", res.result)
      const categoryEvent = res.result;
      this.setState({ categoryEvent });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { categoryEvent, closeDrawer } = this.state;
    console.log(categoryEvent);
    return (
      <DefaultLayout {...this.props} closeDrawer={closeDrawer}>
        <Row>
          <CarouselEvents />
        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            <h3 className="textCategoryEvent">
             {categoryEvent && categoryEvent.category_name_en}
            </h3>
            <Divider />
          </Col>

          {categoryEvent && categoryEvent.events &&
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
