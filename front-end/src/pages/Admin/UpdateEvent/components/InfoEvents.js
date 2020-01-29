import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import { Upload, Icon, Row, Col, Form, Input, Modal } from "antd";
import "./StyleComponents/infoEventStyle.css";
import moment from "moment";
import Axios from "axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class InfoEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      tagList: [],
      dateTimeInInterger: "",
      eventName: "",
      address: "",
      latitudeLocation: "",
      longitudeLocation: "",
      dateStart: "",
      dateEnd: "",
      addTag: [],
      imgUrl: ""
    };
  }

  componentDidMount() {
    this.setState({
      eventName: this.props.eventName,
      address: this.props.address,
      dateStart: this.props.dateStart,
      dateEnd: this.props.dateEnd,
      latitudeLocation: this.props.latitudeLocation,
      longitudeLocation: this.props.longitudeLocation,
      addTag: this.props.addTag,
      imgUrl: this.props.imgUrl
    });
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        eventName: this.props.eventName,
        address: this.props.address,
        dateStart: this.props.dateStart,
        dateEnd: this.props.dateEnd,
        latitudeLocation: this.props.latitudeLocation,
        longitudeLocation: this.props.longitudeLocation,
        addTag: this.props.addTag,
        imgUrl: this.props.imgUrl
      });
    }
  }

  handleChangeImageInfo = e => {
    this.setState({ fileList: e.fileList });
    this.props.handleGetImageInfo(e);
  };

  // handleChange = value => {
  //   // console.log(`selected ${value}`);
  //   // this.setState({ addTag: `${value}` });
  //   this.props.handleGetAddTag(value);
  // };

  handleOnChangeEventName = e => {
    this.props.handleGetEventName(e);
  };
  handleOnChangeAddress = e => {
    this.props.handleGetAddress(e);
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
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  render() {
    const {
      eventName,
      address,
      latitudeLocation,
      longitudeLocation,
      dateStart,
      dateEnd,
      fileList,
      imageInfo,
      previewVisible,
      previewImage,
      imgUrl
    } = this.state;
    const dateFormat = "DD-MM-YYYY";
    const props = {
      onRemove: file => {
        this.setState(state => {
          return {
            imageInfo: null
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          imageInfo: file
        }));
        return false;
      },
      imageInfo
    };
    // const { imageUrl } = this.state;
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
                  showUploadList={true}
                  //   beforeUpload={beforeUpload}
                  onChange={this.handleChangeImageInfo}
                >
                  {imgUrl && fileList.length == 0 ? (
                    <img src={imgUrl} alt="avatar" style={{ width: "100%" }} />
                  ) : (
                    null
                  )}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="avatar"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
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
                    initialValue: eventName,
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
                    initialValue: address,
                    rules: [
                      {
                        required: true,
                        message: "Please put address!"
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleOnChangeAddress(e.target.value)}
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
                        moment(parseInt(dateStart)).format(dateFormat),
                        dateFormat
                      ),
                      moment(
                        moment(parseInt(dateEnd)).format(dateFormat),
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
                  {/* {console.log("😊😊😊",parseInt(dateStart),parseInt(dateEnd))} */}
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
                    initialValue: latitudeLocation,
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
                    initialValue: longitudeLocation,
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
                    // initialValue: addTag,
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
                      // onChange={this.handleChange}
                    >
                      {this.props.tagList.map(tagListData => (
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
