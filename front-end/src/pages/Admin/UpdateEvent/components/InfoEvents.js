import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import { Upload, Icon, Row, Col, Form, Input } from "antd";
import { serviceTag } from "../../../../_service/tagServices";
import { serviceEvent } from "../../../../_service/eventServices";
import "./StyleComponents/infoEventStyle.css";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

class InfoEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      tagList: [],
      dateTimeInInterger: "",
      getTagList: [],
      eventList: [],
      // Set state
      EventName: "",
      Address: "",
      LatitudeLocation: "",
      LongitudeLocation: "",
      DateStart: "",
      DateEnd: "",
      Tag: []
    };
  }

  componentDidMount() {
    this.getTagAdmin();
    this.getEventDetail();
  }

  async getTagAdmin() {
    try {
      let getTagList = await serviceTag.getTag();
      getTagList = getTagList.result;
      // console.log("getTagList", getTagList);
      this.setState({ getTagList });
    } catch (error) {
      console.log("error", error);
    }
  }

  async getEventDetail() {
    try {
      let eventList = await serviceEvent.getEventDetail();
      eventList = eventList.result;
      // console.log("eventList", eventList);
      this.setState({ eventList });
      this.setState({ EventName: eventList.event_name });
      this.setState({ Address: eventList.event_address });
      this.setState({ LatitudeLocation: eventList.event_latitude_map });
      this.setState({ LongitudeLocation: eventList.event_longitude_map });
      this.setState({ DateStart: eventList.event_date_start });
      this.setState({ DateEnd: eventList.event_date_end });
      // console.log("date", moment(eventList.event_date_start).format("DD-MM-YYYY"), moment(eventList.event_date_end));
      let tag_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let tag_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      this.setState({ Tag: tag_EN });
      // this.setState({ getEventContent: eventList.event_content });
      let ticket_EN = eventList.event_tags.map(obj => obj.tag_name_en);
      // let ticket_TH = eventList.event_tags.map(obj => obj.tag_name_th);
      this.setState({ Ticket: ticket_EN });
    } catch (error) {
      console.log("error", error);
    }
  }

  handleChange = value => {
    // console.log(`selected ${value}`);
    // this.setState({ addTag: `${value}` });
    this.props.handleGetAddTag(value);
  };

  handleOnChangeEventName = e => {
    this.props.handleGetEventName(e);
  };
  handleOnChangeCreaterName = e => {
    this.props.handleGetCreaterName(e);
  };
  handleOnChangeDate = async (dateValue, dateValueArray) => {
    await this.setState({
      dateTimeInInterger: dateValue.map(data => data._d.getTime())
    });
    await this.props.handleGetDate(this.state.dateTimeInInterger);
    console.log("dateTimeInInterger", this.state.dateTimeInInterger);
    
  };
  handleOnChangeLatitude = e => {
    this.props.handleGetLatitude(e);
  };
  handleOnChangeLongitude = e => {
    this.props.handleGetLongitude(e);
  };

  render() {
    const { fileList } = this.state;
    // console.log(this.state);
    const dateFormat = "DD-MM-YYYY";

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="decorationForm">
        <Row>
          {/* ---------------------Photo Upload----------------------- */}
          <Col xs={24} md={24} xl={10}>
            <Row type="flex" justify="center">
              <Col>
                <Upload
                  {...props}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  //   beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>
          </Col>
          {/* --------------------------Info Events------------------------------- */}
          <Col
            className="infoPadding"
            xs={24}
            md={24}
            xl={14}
            style={{ marginTop: "20px" }}
          >
            <Row>
              <Col xs={24} md={8} xl={6}>
                <h5 style={{ marginTop: "6px", color: "white" }}>
                  Event Name:
                </h5>
              </Col>
              <Col xs={24} md={10} xl={12}>
                <Form.Item>
                  {getFieldDecorator("eventname", {
                    initialValue: this.state.EventName,
                    rules: [
                      {
                        required: true,
                        message: "Please put Event name!"
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        this.handleOnChangeEventName(e.target.value)
                      }
                      style={{ width: "100%" }}
                      className="inputDecolation"
                      placeholder="Event name"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6}>
                <h5 style={{ marginTop: "6px", color: "white" }}>Address :</h5>
              </Col>
              <Col xs={24} md={10} xl={12}>
                <Form.Item>
                  {getFieldDecorator("address", {
                    initialValue: this.state.Address,
                    rules: [
                      {
                        required: true,
                        message: "Please put address!"
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        this.handleOnChangeCreaterName(e.target.value)
                      }
                      style={{ width: "100%" }}
                      placeholder="Address"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6}>
                <h5 style={{ marginTop: "6px", color: "white" }}>
                  <Icon type="calendar" /> Date :{" "}
                </h5>
              </Col>
              <Col xs={24} md={10} xl={12}>
                <Form.Item>
                  {getFieldDecorator("date", {
                    initialValue: [
                      moment(
                        moment(parseInt(this.state.DateStart)).format(
                          dateFormat
                        ),
                        dateFormat
                      ),
                      moment(
                        moment(parseInt(this.state.DateStart)).format(
                          dateFormat
                        ),
                        dateFormat
                      )
                    ],
                    rules: [
                      {
                        required: true,
                        message: "Please put Date!"
                      }
                    ]
                  })(
                    <RangePicker
                      onChange={(dateValue, dateValueArray) =>
                        this.handleOnChangeDate(dateValue, dateValueArray)
                      }
                      format="DD-MM-YYYY"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6}>
                <h5 style={{ marginTop: "6px", color: "white" }}>
                  <Icon type="compass" /> Location :{" "}
                </h5>
              </Col>
              <Col xs={24} md={6} xl={6}>
                <Form.Item>
                  {getFieldDecorator("latitudeLocation", {
                    initialValue: this.state.LatitudeLocation,
                    rules: [
                      {
                        required: true,
                        message: "Please put Latitude Location!"
                      }
                    ]
                  })(
                    <Input
                      type="number"
                      onChange={e =>
                        this.handleOnChangeLatitude(e.target.value)
                      }
                      style={{ width: "100%" }}
                      placeholder="Latitude (Ex 13.756331)"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={6} xl={6}>
                <Form.Item>
                  {getFieldDecorator("longitudeLocation", {
                    initialValue: this.state.LongitudeLocation,
                    rules: [
                      {
                        required: true,
                        message: "Please put Longitude Location!"
                      }
                    ]
                  })(
                    <Input
                      type="number"
                      onChange={e =>
                        this.handleOnChangeLongitude(e.target.value)
                      }
                      style={{ width: "100%" }}
                      placeholder="Longitude (Ex 1.501762)"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24} md={8} xl={6}>
                <h5 style={{ marginTop: "6px", color: "white" }}>
                  <Icon type="tags" /> Tags :{" "}
                </h5>
              </Col>
              <Col xs={24} md={10} xl={12}>
                <Form.Item>
                  {getFieldDecorator("addtags", {
                    initialValue: this.state.Tag,
                    rules: [
                      {
                        required: true,
                        message: "Please add Tags!"
                      }
                    ]
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      onChange={this.handleChange}
                    >
                      {this.state.tagList.map(tagListData => (
                        <Option
                          key={tagListData.id}
                          value={tagListData.id}
                          label={tagListData.tag_name_en}
                        >
                          <span>{tagListData.tag_name_en}</span>
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(InfoEvents);
