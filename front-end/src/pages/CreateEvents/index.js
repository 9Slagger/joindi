import React, { Component } from  "react";
import DefaultLayout from  "../../common/DefaultLayout";
import InfoEvents from  "./components/InfoEvents";
import Ticket from  "./components/Ticket";
import OrganizedBy from  "./components/OrganizedBy";
import { Row, Col, Button } from  "antd";
import RichText from  "./components/RichText";
import "./CreateEventsStyle.css";
import Axios from  "axios";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      createrName: "",
      date: "",
      latitudeLocation: "",
      longitudeLocation: "",
      addTag: [],
      richText: "",
      ticketList: [],
      organizedList: []
    };
  }

  handleGetEventName = value => {
    this.setState({ eventName: value });
  };
  handleGetCreaterName = value => {
    this.setState({ createrName: value });
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
      event_address: this.state.createrName,
      event_latitude_map: this.state.latitudeLocation,
      event_longitude_map: this.state.longitudeLocation,
      event_date_start: this.state.date[0],
      event_date_end: this.state.date[1],
      event_content: this.state.richText,
      ticketsList: this.state.ticketList,
      organizedList: this.state.organizedList,
      eventList: this.state.addTag
    };
    Axios.post("/event", data)
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("❗️❗️❗️", this.state.date[0]);
    console.log("✅", this.state);
    
    return (
      <DefaultLayout>
        <div className="outerBox">
          <Row className="infoEvents">
            <InfoEvents
              handleGetEventName={this.handleGetEventName}
              handleGetCreaterName={this.handleGetCreaterName}
              handleGetDate={this.handleGetDate}
              handleGetLatitude={this.handleGetLatitude}
              handleGetLongitude={this.handleGetLongitude}
              handleGetAddTag={this.handleGetAddTag}
            />
          </Row>
          <Row>
            <RichText handleGetRichText={this.handleGetRichText} />
          </Row>
          <Row>
            <Ticket handleGetTicket={this.handleGetTicket} />
          </Row>
          <Row>
            <OrganizedBy handleGetOrganized={this.handleGetOrganized} />
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button style={{ margin: "10px 10px" }}>Back</Button>
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
