import React, { Component } from  "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  DatePicker,
  Table,
  Icon
} from  "antd";
import Column from  "antd/lib/table/Column";
import "./StyleComponents/ticketDecoration.css";

const { RangePicker } = DatePicker;

class Ticket extends Component {
  state = {
    visible: false,
    checked: true,
    disabled: false,
    ticketList: [],
    title: "",
    description: "",
    remarks: "",
    quantity: "",
    ticketPrice: "",
    dateAndTimeStart: "",
    dateTimetoShow:"",
    dateAndTimeEnd: "",
    startValue: null,
    endValue: null,
    endOpen: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, value) => {
      let datas = {
        ticket_title: value.tickettitle,
        ticket_detail: value.ticketdescription,
        ticket_note: value.ticketremark,
        ticket_total_quantity: parseInt(value.ticketquantity),
        ticket_remaining_quantity: parseInt(value.ticketquantity),
        ticket_price: value.ticketprice || 0,
        ticket_manufacturing_date: this.state.startValue[0],
        ticket_expiry_date: this.state.startValue[1],
        ticketToShowStart: this.state.dateTimetoShow[0],
        ticketToShowEnd: this.state.dateTimetoShow[1]
      };
      console.log(datas);
      if (!err) {
        let arrayOfTicketList = this.state.ticketList;
        arrayOfTicketList.push(datas);
        await this.setState(arrayOfTicketList);
        await this.setState({
          visible: false
        });
        await this.props.handleGetTicket(this.state.ticketList);
        this.props.form.resetFields();
        console.log(this.state.ticketList);
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };
  // Handle Date and time picker
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onStartChange = (value, valueString) => {
    this.setState({ startValue: value.map(data => data._d.getTime()) })
    this.setState({ dateTimetoShow: valueString })
    ;
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  deleteTicket = indexTarget => () => {
    this.setState({
      ticketList: this.state.ticketList.filter(
        (item, index) => indexTarget !== index
      )
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const label = "Free Event";
    const dataTicketTable = this.state.ticketList;
    return (
      <div className="ticketBox">
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <h3>Ticket</h3>
          </Col>
        </Row>
        <Table
          key="table"
          dataSource={dataTicketTable}
          style={{ width: "100%", overflow: "auto" }}
        >
          <Column title="Title" dataIndex="ticket_title" key="title" />
          <Column
            title="Description"
            dataIndex="ticket_detail"
            key="description"
          />

          <Column title="Remark" dataIndex="ticket_note" key="remarks" />
          <Column
            title="Quantity"
            dataIndex="ticket_total_quantity"
            key="quantity"
          />
          <Column
            title="Ticket Price"
            dataIndex="ticket_price"
            key="ticketPrice"
          />
          <Column
            title="Start"
            dataIndex="ticketToShowStart"
            key="dateAndTimeStart"
            
          />
          <Column
            title="End"
            dataIndex="ticketToShowEnd"
            key="dateAndTimeEnd"
          />
          <Column
            title="Action"
            dataIndex="ticket_detail"
            key="action"
            render={(text, data, index) => (
              <>
                <Button onClick={this.deleteTicket(index)}>
                  <Icon type="delete" />
                </Button>
              </>
            )}
          />
        </Table>
        <Form>
          <Row>
            <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={this.showModal}>
                Add New Ticket Type
              </Button>
            </Col>
          </Row>

          <Modal
            title="Ticket"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Form.Item>
                    Title :
                    {getFieldDecorator("tickettitle", {
                      rules: [
                        {
                          required: true,
                          message: "Please put Ticket title!"
                        }
                      ]
                    })(<Input placeholder="Title" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item>
                    Description :
                    {getFieldDecorator("ticketdescription", {
                      rules: [
                        {
                          required: true,
                          message: "Please put description!"
                        }
                      ]
                    })(<Input placeholder="Description" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={24}>
                    Date :
                    <Form.Item>
                      {getFieldDecorator("startValue", {
                        rules: [
                          {
                            required: true,
                            message: "Please put Date!"
                          }
                        ]
                      })(
                        <RangePicker
                          disabledDate={this.disabledStartDate}
                          showTime={{ format: "HH:mm" }}
                          format="DD-MM-YYYY HH:mm"
                          placeholder="Start"
                          onChange={this.onStartChange}
                          onOpenChange={this.handleStartOpenChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    Remark :
                    {getFieldDecorator(
                      "ticketremark",
                      {}
                    )(<Input placeholder="Remark" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Row>
                    <Checkbox
                      checked={this.state.checked}
                      disabled={this.state.disabled}
                      onChange={this.onChange}
                    >
                      {label}
                    </Checkbox>
                  </Row>

                  <Col span={12}>
                    <Form.Item>
                      Quantity :
                      {getFieldDecorator("ticketquantity", {
                        rules: [
                          {
                            required: true,
                            message: "Please put quantity!"
                          }
                        ]
                      })(<Input type="number" placeholder="Quantity" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      Ticket Price :
                      {getFieldDecorator(
                        "ticketprice",
                        {}
                      )(
                        <Input
                          type="number"
                          placeholder="Ticket Price"
                          disabled={this.state.checked}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Ticket);
