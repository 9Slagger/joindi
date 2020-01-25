import React, { Component } from  "react";
import DefaultLayout from  "../../common/DefaultLayout";
import { serviceTag } from  "../../_service";
import "./components/SearchTag.css";
import CarouselEvents from  "../../common/CarouselEvents";
import CardEvents from  "../../common/CardEvents";
import { Row, Col, Divider } from  "antd";

export default class index extends Component {
  state = {
    tagEvent: {
      id: 0,
      tag_name_en: "",
      tag_name_th: "",
      tag_active: "",
      createdAt: "",
      updatedAt: "",
      events: []
    }
  };

  componentDidMount = () => {
    this.getTagAndEvent();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.tagId !== this.props.match.params.tagId) {
      this.getTagAndEvent();
    }
  }

  getTagAndEvent = async () => {
    try {
      const res = await serviceTag.getTagAndEvent(
        this.props.match.params.tagId
      );
      const tagEvent = res.result;
      console.log(res);
      this.setState({ tagEvent });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { tagEvent } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          <CarouselEvents />
        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            <h3 className="textSearchTag">
              Search Tag For "{tagEvent.tag_name_en}"
            </h3>
            <Divider />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          {tagEvent.events &&
            tagEvent.events.map(event => (
              <Col xs={24} sm={12} md={10} lg={8} xl={5} key={event.id} className="colCardEvent">
                <CardEvents event={event} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    );
  }
}
