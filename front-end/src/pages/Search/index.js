import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import "./components/Search.css";
import { serviceEvent } from "../../_service";
import Fuse from "fuse.js";
import CardEvents from "../../common/CardEvents";
import { Row, Col, Divider, Select } from "antd";
import selectLang from "../../_helper/selectLang";
import _ from "lodash";
const { Option } = Select;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventStatusApprove: {}
    };
  }

  componentDidMount() {
    this.getEventApprove();
  }

  async getEventApprove() {
    let eventStatusApprove;
    try {
      const res = await serviceEvent.getEventApprove();
      eventStatusApprove = res.result;
      this.setState({ eventStatusApprove });
      console.log(eventStatusApprove);
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { eventStatusApprove } = this.state;
    console.count("debug");
    console.log(this.state);
    let keyword;
    if (
      decodeURIComponent(window.location.search.split("keyword=").length > 1)
    ) {
      keyword = decodeURIComponent(window.location.search.split("keyword=")[1]);
    }
    let eventFilter = eventStatusApprove && eventStatusApprove.events;
    if (
      eventStatusApprove &&
      eventStatusApprove.events &&
      keyword.length !== 0
    ) {
      const fuse = new Fuse(eventStatusApprove.events, {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "event_name",
          "event_address",
          "event_date_start",
          "tag_name_en",
          "tag_name_th",
          "category_name_en",
          "category_name_th"
        ]
      });
      eventFilter = fuse.search(keyword);
      console.log("eventFilter", eventFilter);
    }

    return (
      <DefaultLayout {...this.props}>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Row type="flex" justify="center">
              <Col
                xs={22}
                sm={22}
                md={22}
                lg={12}
                xl={12}
                className="colTextSearchResult"
              >
                <span className="textSearchResult">
                  Search Results For "{keyword}"
                </span>
              </Col>

              <Col xs={22} sm={22} md={22} lg={12} xl={12}>
                <Row type="flex" justify="center">
                  <Select
                    defaultValue="Sort By"
                    onChange={this.handleChange}
                    className="selectSortBy"
                  >
                    <Option value="sortbyupcomming">Upcomming</Option>
                  </Select>
                </Row>
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row type="flex" justify="center">
          {eventFilter &&
            eventFilter.map(event => (
              <Col xs={24} sm={12} md={10} lg={8} xl={5} key={event.id} className="colCardEvent">
                <CardEvents event={event} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    );
  }
}
