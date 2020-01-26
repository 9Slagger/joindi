import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import DefaultLayout from "../../../common/DefaultLayout";
import InfoEvents from "./components/InfoEvents";
import Ticket from "./components/Ticket";
import OrganizedBy from "./components/OrganizedBy";
import RichText from "./components/RichText";
import { serviceTag } from "../../../_service/tagServices";
import { serviceEvent } from "../../../_service/eventServices";
// import Axios from "axios"
import moment from "moment";
import "./CreateEventsStyle.css";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
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
      organizeContact: []
    };
  }

  componentDidMount() {
    console.log("eventId", this.props.match.params.eventId);
    this.getTagAdmin();
    this.getEventDetail();
  }

  async getTagAdmin() {
    try {
      let tagList = await serviceTag.getTag();
      tagList = tagList.result;
      console.log("tagList", tagList);
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
      this.setState({ eventList });
      this.setState({ eventName: eventList.event_name });
      this.setState({ address: eventList.event_address });
      this.setState({ latitudeLocation: eventList.event_latitude_map });
      this.setState({ longitudeLocation: eventList.event_longitude_map });
      this.setState({ dateStart: eventList.event_date_start });
      this.setState({ dateEnd: eventList.event_date_end });
      // console.log("date", moment(eventList.event_date_start).format("DD-MM-YYYY"), moment(eventList.event_date_end));
      let tag_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let tag_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      this.setState({ addTag: tag_EN });
      // this.setState({ getEventContent: eventList.event_content });
      // let ticket_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let ticket_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      // this.setState({ ticket: ticket_EN });
      this.setState({ richText: eventList.event_content });
      this.setState({ ticket: eventList.tickets });
      let ticketList = this.state.ticket.map(obj => ({
        ticket_title: obj.ticket_title,
        ticket_detail: obj.ticket_detail,
        ticket_note: obj.ticket_note,
        ticket_total_quantity: obj.ticket_total_quantity,
        ticket_remaining_quantity: obj.ticket_remaining_quantity,
        ticket_price: obj.ticket_price,
        ticket_manufacturing_date: obj.ticket_manufacturing_date,
        ticket_expiry_date: obj.ticket_expiry_date,
        ticketToShowStart: moment(
          parseInt(obj.ticket_manufacturing_date)
        ).format(dateFormat),
        ticketToShowEnd: moment(parseInt(obj.ticket_expiry_date)).format(
          dateFormat
        )
      }));
      this.setState({ ticketList: ticketList });
      this.setState({ organizeContact: eventList.organized_contacts });
      this.setState({ organizedList: this.state.organizeContact });
      console.log("this.state", this.props);
      
    } catch (error) {
      console.log("error", error);
    }
  }

  handleGetEventName = value => {
    this.setState({ eventName: value });
  };
  handleGetAddress = value => {
    this.setState({ address: value });
  };
  handleGetDate = value => {
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

  handleCreateEvent = () => {
    let data = {
      event_name: this.state.eventName,
      event_address: this.state.address,
      event_latitude_map: this.state.latitudeLocation,
      event_longitude_map: this.state.longitudeLocation,
      event_date_start: this.state.date[0],
      event_date_end: this.state.date[1],
      event_content: this.state.richText,
      ticketsList: this.state.ticketList,
      organizedList: this.state.organizedList,
      eventList: this.state.addTag
    };
    console.log("data", data);

    // Axios.post("/event", data)
    //   .then(result => {
    //     console.log(result.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    // console.log("❗️❗️❗️", this.state.date[0]);
    // console.log("✅", this.state);
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
      tagList
    } = this.state;
    // console.log("ticketList | Parent", ticketList);
    
    return (
      <DefaultLayout>
        <div className="outerBox">
          <Row className="infoEvents">
            <InfoEvents
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
