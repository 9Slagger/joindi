import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import { Upload, Icon, Row, Col, Form, Input } from "antd";
import './StyleComponents/infoEventStyle.css'

const { RangePicker } = DatePicker;
const { Option } = Select;

class InfoEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { fileList } = this.state;
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

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      );
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="decorationForm" >
        <Row>
          {/* ---------------------Photo Upload----------------------- */}
          <Col xs={24} md={24} xl={10} >
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
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
              </Col>
            </Row>
          </Col>
          {/* --------------------------Info Events------------------------------- */}
          <Col className="infoPadding" xs={24} md={24} xl={14} style={{marginTop:"20px"}} >
            <Row >
              <Col xs={24} md={8} xl={6} ><h5 style={{marginTop:"6px",color:"white"}}>Event Name:</h5></Col>
              <Col xs={24} md={10} xl={12} >
                <Form.Item>
                  {getFieldDecorator("eventname", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Event name!"
                      }
                    ]
                  })(<Input style={{width:"100%"}} className="inputDecolation" placeholder="Event name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6} ><h5 style={{marginTop:"6px",color:"white"}}>Creater name :</h5></Col>
              <Col xs={24} md={10} xl={12} >
                <Form.Item>
                  {getFieldDecorator("creatername", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Creater name!"
                      }
                    ]
                  })(<Input style={{width:"100%"}} placeholder="Creater name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6} >
                <h5 style={{marginTop:"6px",color:"white"}}><Icon type="calendar" /> Date : </h5>
              </Col>
              <Col xs={24} md={10} xl={12} >
                <Form.Item>
                  {getFieldDecorator("date", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Date!"
                      }
                    ]
                  })(<RangePicker format="DD-MM-YYYY" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} xl={6} >
                <h5 style={{marginTop:"6px",color:"white"}}><Icon type="compass" /> Location : </h5>
              </Col>
              <Col xs={24} md={6} xl={6} >
                <Form.Item>
                  {getFieldDecorator("latitudeLocation", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Latitude Location!"
                      }
                    ]
                  })(<Input type="number" style={{width:"100%"}} placeholder="Latitude (Ex 13.756331)" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={6} xl={6}  >
              <Form.Item >
                  {getFieldDecorator("longitudeLocation", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Longitude Location!"
                      }
                    ]
                  })(<Input type="number"  style={{width:"100%"}} placeholder="Longitude (Ex 1.501762)" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24} md={8} xl={6} >
              <h5 style={{marginTop:"6px",color:"white"}}><Icon type="tags" /> Tags : </h5>
              </Col>
              <Col xs={24} md={10} xl={12} >
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
                      style={{width:"100%"}}
                      placeholder="Please select"
                      defaultValue={["a10", "c12"]}
                      // onChange={handleChange}
                    >
                      {children}
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
