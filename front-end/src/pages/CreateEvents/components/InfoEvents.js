import React, { Component } from "react";
import { DatePicker, Select, Modal } from "antd";
import { Upload, Icon, Row, Col, Form, Input } from "antd";
import "./StyleComponents/infoEventStyle.css";
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
      imageInfo: [],
      tagList: [],
      dateTimeInInterger: "",
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8085/tag").then(result => {
      this.setState({ tagList: result.data.result });
    });
  }

  handleChangeImageInfo = e => {
    this.setState({ fileList: e.fileList });
    this.props.handleGetImageInfo(e);
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

  handleChange = addtags => {
    this.props.handleGetAddTag(addtags);
  };

  render() {
    const { imageInfo } = this.state;
    // console.log(this.state);

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
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { getFieldDecorator } = this.props.form;

    const { previewVisible, previewImage, fileList } = this.state;

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
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  //   beforeUpload={beforeUpload}
                  onChange={this.handleChangeImageInfo}
                >
                  {fileList.length >= 1 ? null : uploadButton}
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
                  {getFieldDecorator("creatername", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Address!"
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
