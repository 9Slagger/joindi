import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import { serviceEvent } from "../../_service";
import Notification from "../../common/Notification";
import selectLang from "../../_helper/selectLang";
import { Row, Col } from "antd";
import TagEvents from "../../common/TagEvents";
import CarouselEvents from "../../common/CarouselEvents";
import ScrolEvents from "./components/ScrolEvents";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCatagorieList: [],
      freeEventList: [],
      eventList: [],
      loadEventCatagorieList: false,
      loadEventListStatus: false,
      getDataFail: false
    };
  }

  componentDidMount() {
    this.getEvents();
    this.getEventCatagorieList();
  }

  async getEventCatagorieList() {
    this.setState({ loadEventCatagorieList: true });
    try {
      const res = await serviceEvent.getEventCatagorieList();
      const eventCatagorieList = res.result;
      this.setState({ eventCatagorieList, loadEventCatagorieList: false });
    } catch (error) {
      this.setState({ loadEventCatagorieList: false, getDataFail: true });
      Notification(
        selectLang(error.messages.title_en, error.messages.title_th)
      );
    }
  }

  async getEvents() {
    this.setState({ loadEventListStatus: true });
    try {
      const res = await serviceEvent.getEventApprove();
      const eventList = res.result.events;
      const freeEventList = res.result.events.filter(
        event =>
          event.tickets.filter(ticket => ticket.ticket_price === 0).length !== 0
      );
      this.setState({ eventList, freeEventList, loadEventListStatus: false });
    } catch (error) {
      this.setState({ loadEventListStatus: false, getDataFail: true });
      Notification();
      // selectLang(error.messages.title_en, error.messages.title_th)
    }
  }

  render() {
    const {
      getDataFail,
      eventCatagorieList,
      eventList,
      freeEventList
    } = this.state;
    return (
      <DefaultLayout {...this.props}>
        {!getDataFail ? (
          <Row>
            <Col>
              <CarouselEvents />
            </Col>
            <Col>
              {eventCatagorieList.map(catagorie => (
                <ScrolEvents
                  key={catagorie.id}
                  eventList={catagorie.events}
                  title={{
                    titleEn: catagorie.category_name_en,
                    titleTh: catagorie.category_name_th
                  }}
                />
              ))}
            </Col>
            <ScrolEvents
              eventList={eventList}
              title={{
                titleEn: "New Events",
                titleTh: "กิจกรรม ที่เพิ่งสร้าง"
              }}
            />
            <ScrolEvents
              eventList={freeEventList}
              title={{
                titleEn: "Free Events",
                titleTh: "กิจกรรม ที่ไม่เสียค่าใช้จ่าย"
              }}
            />
            <Col style={{ paddingTop: "2rem", paddingBottom: "1rem" }}>
              <TagEvents />
            </Col>
          </Row>
        ) : (
          <h1>Load Data Fail</h1>
        )}
      </DefaultLayout>
    );
  }
}
