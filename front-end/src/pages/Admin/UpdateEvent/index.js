import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import DefaultLayout from "../../../common/DefaultLayout";
import InfoEvents from "./components/InfoEvents";
import Ticket from "./components/Ticket";
import OrganizedBy from "./components/OrganizedBy";
import RichText from "./components/RichText";
import { serviceTag } from "../../../_service/tagServices";
import { serviceEvent } from "../../../_service/eventServices";
import moment from "moment";
// import Axios from "axios";
import "./CreateEventsStyle.css";
import { ENDPOINT } from "../../../_constants/index";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      // eventId: "",
      eventName: "",
      address: "",
      date: "",
      latitudeLocation: "",
      longitudeLocation: "",
      addTag: [],
      richText: "",
      ticketList: [],
      // Set state
      dateStart: "",
      dateEnd: "",
      ticket: [],
      organizedList: [],
      organizeContact: [],
      imgUrl: ""
    };
  }

  componentDidMount() {
    // console.log("eventId", this.props.match.params.eventId);
    this.getTagAdmin();
    this.getEventDetail();
    // console.log("😂😂😂", this.state.imgUrl);
  }

  async getTagAdmin() {
    try {
      let tagList = await serviceTag.getTag();
      tagList = tagList.result;
      // console.log("tagList", tagList);
      this.setState({ tagList });
    } catch (error) {
      console.log("error", error);
    }
  }

  async getEventDetail() {
    try {
      const dateFormat = "DD-MM-YYYY";
      let eventList = await serviceEvent.getEventDetail(
        this.props.match.params.eventId
      );
      eventList = eventList.result;
      console.log("eventList", eventList);
      // console.log("props😊😊😊", this.props.match.params.eventId);
      this.setState({ eventList });
      // this.setState({ event_id: this.props.match.params.eventId });
      this.setState({ eventName: eventList.event_name });
      this.setState({ address: eventList.event_address });
      this.setState({ latitudeLocation: eventList.event_latitude_map });
      this.setState({ longitudeLocation: eventList.event_longitude_map });
      this.setState({ dateStart: eventList.event_date_start });
      this.setState({ dateEnd: eventList.event_date_end });
      // console.log("date", moment(eventList.event_date_start).format("DD-MM-YYYY"), moment(eventList.event_date_end));
      // let tag_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let tag_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      this.setState({ addTag: eventList.event_tags });
      // this.setState({ getEventContent: eventList.event_content });
      // let ticket_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let ticket_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      // this.setState({ ticket: ticket_EN });
      this.setState({ richText: eventList.event_content });
      this.setState({ ticket: eventList.tickets });
      let ticketList = this.state.ticket.map(obj => ({
        ...obj,
        ticketToShowStart: moment(
          parseInt(obj.ticket_manufacturing_date)
        ).format(dateFormat),
        ticketToShowEnd: moment(parseInt(obj.ticket_expiry_date)).format(
          dateFormat
        )
      }));
      let imgUrl = `${ENDPOINT}/${eventList.event_has_image.image_id}.${eventList.event_has_image.image.filename_extension}`;
      // console.log("😒😒😒 ", imgUrl);
      this.setState({ ticketList: ticketList });
      this.setState({ organizeContact: eventList.organized_contacts });
      this.setState({ organizedList: this.state.organizeContact });
      this.setState({ imgUrl: imgUrl });
      // console.log("this.state", this.props);
    } catch (error) {
      console.log("error", error);
    }
  }

  handleGetImageInfo = value => {
    this.setState({ imageInfo: value });
  };

  handleGetEventName = value => {
    this.setState({ eventName: value });
  };
  handleGetAddress = value => {
    this.setState({ address: value });
  };
  handleGetDate = value => {
    console.log("Date", value);
    this.setState({ date: value });
  };
  handleGetLatitude = value => {
    this.setState({ latitudeLocation: value });
  };
  handleGetLongitude = value => {
    this.setState({ longitudeLocation: value });
  };
  handleGetAddTag = value => {
    this.setState({ addTag: value });
  };
  handleGetRichText = value => {
    this.setState({ richText: value });
  };
  handleGetTicket = value => {
    this.setState({ ticketList: value });
  };
  handleGetOrganized = value => {
    this.setState({ organizedList: value });
  };

  handleCreateEvent = async () => {
    let data = {
      // id: this.state.eventId,
      event_name: this.state.eventName,
      event_address: this.state.address,
      event_latitude_map: this.state.latitudeLocation,
      event_longitude_map: this.state.longitudeLocation,
      event_date_start: this.state.date[0],
      event_date_end: this.state.date[1],
      event_content: this.state.richText,
      tickets: this.state.ticketList,
      organizeds: this.state.organizedList,
      event_tags: this.state.addTag,
      imgUrl: this.state.imgUrl
    };
    console.log("data", data);
    try {
      await serviceEvent.updateEvent(this.props.match.params.eventId, data);
      alert("update event success");
    } catch (error) {
      console.log("handleCreateEvent error", error);
      alert("update event fail");
    }
    // let dataImageInfo = new FormData();
    // console.log("IMAGE 😒", this.state.imageInfo.file);

    // dataImageInfo.append("image", this.state.imageInfo.file);
    // Axios.post("/image", dataImageInfo, {
    //   headers: { "content-type": "multipart/form-data" }
    // })
    //   .then(result => {
    //     console.log(result.data);
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
  };

  render() {
    // console.log("❗️❗️❗️", this.state.date[0]);
    // console.log("✅", this.state);
    // console.log("♨️", this.state.imageInfo.file);

    const {
      eventName,
      address,
      latitudeLocation,
      longitudeLocation,
      addTag,
      richText,
      ticketList,
      dateStart,
      dateEnd,
      organizedList,
      tagList,
      imgUrl
    } = this.state;
    // console.log("this.state", this.state);

    return (
      <DefaultLayout>
        <div className="outerBox">
          <Row className="infoEvents">
            <InfoEvents
              handleGetImageInfo={this.handleGetImageInfo}
              handleGetEventName={this.handleGetEventName}
              eventName={eventName}
              handleGetAddress={this.handleGetAddress}
              address={address}
              handleGetDate={this.handleGetDate}
              dateStart={dateStart}
              dateEnd={dateEnd}
              handleGetLatitude={this.handleGetLatitude}
              latitudeLocation={latitudeLocation}
              handleGetLongitude={this.handleGetLongitude}
              longitudeLocation={longitudeLocation}
              handleGetAddTag={this.handleGetAddTag}
              addTag={addTag}
              tagList={tagList}
              imgUrl={imgUrl}
            />
          </Row>
          <Row>
            <RichText
              handleGetRichText={this.handleGetRichText}
              richText={richText}
            />
          </Row>
          <Row>
            <Ticket
              handleGetTicket={this.handleGetTicket}
              ticketList={ticketList}
            />
          </Row>
          <Row>
            <OrganizedBy
              handleGetOrganized={this.handleGetOrganized}
              organizedList={organizedList}
            />
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              {/* <Button style={{ margin: "10px 10px" }}>Back</Button> */}
              <Button
                onClick={this.handleCreateEvent}
                style={{ margin: "10px 10px" }}
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </div>
      </DefaultLayout>
    );
  }
}
