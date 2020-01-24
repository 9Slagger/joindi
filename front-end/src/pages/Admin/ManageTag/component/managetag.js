import React, { Component } from "react";
import { Input, Row, Col, Icon, Button, Table, Modal, Form } from "antd";
import { serviceTag } from "../../../../_service";
import Axios from "axios";
import Column from "antd/lib/table/Column";

const { Search } = Input;

class ManageTag extends Component {
  state = { visible: false, TagNameEn: "", TagNameTh: "", tagList: [] };

  handleSubmitAddTag = e => {
    e.preventDefault();
    const { TagNameEn, TagNameTh } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          let res = await serviceTag.addTag(TagNameEn, TagNameTh);
          this.props.form.resetFields();
          alert(res.messages.title_en);
        } catch (error) {
          alert(error.messages.title_en);
        }
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleOkAddTag = () => {
    this.setState({
      loading: true
    });
    this.setState({
      loading: false,
      visibleSignUp: false
    });
  };

  fetchdata = () => {
    Axios.get("http://localhost:8085/tag").then(result => {
      this.setState({ tagList: result.data.result });
    });
  }

  componentDidMount() {
    this.fetchdata()
  }

  handleToggleTagStatus = (data) => () => {
    console.log(data)
    Axios.put("http://localhost:8085/tag",{ 
      id: data.id,
      tagActive: !data.tag_active
    })
    .then(result => {
      this.fetchdata()
      console.log(result.data)
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const dataTag = this.state.tagList;

    // const columnTag = [
    //   {
    //     title: "Tag Name EN",
    //     dataIndex: "TagNameEn"
    //   },
    //   {
    //     title: "Tag Name TH",
    //     dataIndex: "TagNameTh"
    //   },
    //   {
    //     title: "Status",
    //     dataIndex: "TagActive"
    //   },
    //   {
    //     title: "Action",
    //     key: "operation",
    //     render: () => (
    // <Row>
    //   <Col span={7}>
    // <Button type="primary" shape="circle">
    //   <Icon type="edit" />
    // </Button>
    //   </Col>
    //   <Col span={7}>
    // <Button type="danger" shape="circle">
    //   <Icon type="delete" />
    // </Button>
    //   </Col>
    // </Row>
    //     )
    //   }
    // ];

    // const dataTag = this.state.getTags.map(getTags => {
    //   return {
    //     TagNameEn: serviceTag.getTags.TagNameEn,
    //     TagNameTh: serviceTag.getTags.TagNameTh
    //     // TagActive: {
    //     //   if (serviceTag.tag_active == 1) {
    //     //   return  TagActive: "Active"
    //     // }else {
    //     //   return  TagActive: "InActive"
    //     // }
    //     // }
    //   };
    // });

    return (
      <Row type="flex" justify="center">
        <Col>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{
              fontSize: "40px",
              color: "#345586"
              // borderBottom: "1px solid #345586"
            }}
          >
            <Col style={{ padding: "10px" }}>
              <Icon type="tags" />
            </Col>
            <Col>
              <div>Tag List</div>
            </Col>
          </Row>
          <Row
            style={{
              color: "#345586",
              borderBottom: "1px solid #345586"
            }}
          ></Row>
          <Row type="flex" justify="center" style={{ padding: "10px" }}>
            <Col style={{ padding: "10px" }}>
              <Search style={{ width: "500px" }} />
            </Col>
            <Col style={{ padding: "10px" }}>
              <Button style={{ color: "#345586" }} onClick={this.showModal}>
                Add Tag
              </Button>
              <Modal
                title="Add Tag"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="Add Tag"
                footer={null}
              >
                <Form onSubmit={this.handleSubmitAddTag}>
                  <Row style={{ paddingBottom: "10px" }}>
                    Tag Name (English) :
                    <Form.Item>
                      {getFieldDecorator("TagNameEn", {
                        rules: [
                          {
                            required: true,
                            message: "Please Enter Tag Name (English)"
                          }
                        ]
                      })(
                        <Input
                          placeholder="Enter Tag Name (English)"
                          name="TagNameEn"
                          onChange={this.handleChange}
                        />
                      )}
                    </Form.Item>
                  </Row>

                  <Row style={{ paddingBottom: "10px" }}>
                    ชื่อแท็ก (ภาษาไทย) :
                    <Form.Item>
                      {getFieldDecorator("TagNameTh", {
                        rules: [
                          {
                            required: true,
                            message: "กรุณากรอกชื่อแท็ก (ภาษาไทย)"
                          }
                        ]
                      })(
                        <Input
                          placeholder="กรอกชื่อแท็ก (ภาษาไทย)"
                          name="TagNameTh"
                          onChange={this.handleChange}
                        />
                      )}
                    </Form.Item>
                  </Row>

                  <Form.Item>
                    <Row type="flex" justify="end">
                      <Button type="primary" htmlType="submit">
                        Add Tag
                      </Button>
                    </Row>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
          <Row style={{ padding: "10px" }}>
            <Table
              // columns={columnTag}
              dataSource={dataTag}
              scroll={{ x: 800, y: 300 }}
            >
              <Column
                title="Tag Name EN"
                dataIndex="tag_name_en"
                key="Tag-Name-EN"
              />
              <Column
                title="Tag Name TH"
                dataIndex="tag_name_th"
                key="Tag-Name-TH"
              />
              <Column
                title="Status"
                dataIndex="tag_active"
                key="status"
                render={(text, data, index) => (
                  <>{data.tag_active ? "Active" : "In-Active"}</>
                )}
              />
              <Column
                title="Action"
                key="action"
                dataIndex="tag_active"
                render={(text, data, index) => (
                  <>
                    <Button type="primary" shape="circle"
                    // onClick={this.swapOrganizedData(index, true)}
                    >
                      <Icon type="edit" />
                    </Button>
                    <Button type="danger" shape="circle"
                    onClick={this.handleToggleTagStatus(data)}
                    >
                      <Icon type="delete" />
                    </Button>
                  </>
                )}
              />
            </Table>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(ManageTag);
