import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import CardEvents from "../../common/CardEvents";
import { serviceEvent, serviceTag } from "../../_service";
import Notification from "../../common/Notification";
import selectLang from "../../_helper/selectLang";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCatagorieList: [],
      eventList: [],
      TagList: [],
      loadEventCatagorieList: false,
      loadEventListStatus: false,
      loadTagListStatus: false,
      getDataFail: false
    };
  }

  componentDidMount() {
    this.getEvents();
    this.getEventCatagorieList();
    this.getTagList();
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

  async getTagList() {
    this.setState({ loadTagListStatus: true });
    try {
      const res = await serviceTag.getTag();
      const TagList = res.result;
      this.setState({ TagList, loadTagListStatus: false });
    } catch (error) {
      this.setState({ loadTagListStatus: false, getDataFail: true });
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
      this.setState({ eventList, loadEventListStatus: false });
    } catch (error) {
      this.setState({ loadEventListStatus: false, getDataFail: true });
      Notification(
        selectLang(error.messages.title_en, error.messages.title_th)
      );
    }
  }

  render() {
    console.log(this.state);
    const { getDataFail } = this.state;
    console.log(getDataFail ? "load data fail" : "load data success");
    return (
      <DefaultLayout {...this.props}>
        <pre>
          <code>{JSON.stringify(this.state)}</code>
        </pre>
        <CardEvents />
      </DefaultLayout>
    );
  }
}
