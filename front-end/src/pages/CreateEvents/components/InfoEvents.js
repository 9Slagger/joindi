import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import { Upload, Icon,  Row, Col,  Form, Input } from "antd";

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
      <Form>
        <Row>
          {/* ---------------------Photo Upload----------------------- */}
          <Col span={8}>
            <Row>
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
            </Row>
          </Col>
          {/* --------------------------Info Events------------------------------- */}
          <Col span={16}>
            <Row>
              <Col span={4}>Event Name:</Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("eventname", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Event name!"
                      }
                    ]
                  })(<Input placeholder="Event name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={4}>Creater name:</Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("creatername", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Creater name!"
                      }
                    ]
                  })(<Input placeholder="Creater name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <Icon type="calendar" /> Date:
              </Col>
              <Col span={20}>
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
              <Col span={4}>
                <Icon type="compass" /> Location:
              </Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("location", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Location!"
                      }
                    ]
                  })(<Input placeholder="Location" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}>
                <Icon type="tags" /> Tags:
              </Col>
              <Col span={20}>
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
