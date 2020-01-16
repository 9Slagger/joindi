import React, { Component } from "react";
import { Card, Icon, Row, Col, Button, Input,Modal } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import AdminLayout from "../../../common/AdminLayout";
const { TextArea,Search } = Input;
const { confirm } = Modal;


const tabListNoTitle = [
  {
    key: "Waiting",
    tab: (
      <span className="sub-header-admin">
        <Icon type="question-circle" />
        Waiting
      </span>
    )
  },
  {
    key: "Approved",
    tab: (
      <span className="sub-header-admin">
        <Icon type="check-circle" />
        Approve
      </span>
    )
  },
  {
    key: "Rejected",
    tab: (
      <span className="sub-header-admin">
        <Icon type="close-circle" />
        Rejected
      </span>
    )
  }
];


export default class ApprovePayment extends Component {
  state = {
    key: "tab1",
    noTitleKey: "app",
    visible: false,
    id: '',
    remark: '',
    theData: [
      {
        id:'1',
        name: 'จ่ายค่ากิจกรรมดูหนังนะจ้ะ',
        remark:'',
        status:'1'
      },
      {
        id:'2',
        name: 'จ่ายเงินค่ากิจกรรมร้องเพลงที่ตู้คาราโอเกะ',
        remark:'',
        status:'1'
      },
      {
        id:'3',
        name: 'จ่ายเงินค่ากิจกรรมไปจ่ายชาบูชิ โปรโมชั่นมา 4 จ่าย 3',
        remark:'',
        status:'1'
      },
      {
        id:'4',
        name: 'จ่ายเงินค่ากิจกรรมไปกินไอติมที่ท่าน้ำนนท์',
        remark:'',
        status:'1'
      },
      {
        id:'5',
        name: 'จ่ายเงินค่ากิจกรรมไปออกกำลังกายเพื่อสุขภาพที่ดี',
        remark:'',
        status:'1'
      },
      {
        id:'6',
        name: 'จ่ายเงินค่ากิจกรรมวิ่งสู้ฟัดเพื่อลดความอ้วนนะจ้ะ',
        remark:'',
        status:'1'
      },
    ],
  };
  
  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  approvePayment=(id)=>{
    var theData = [...this.state.theData];
    var index = theData.findIndex(obj => obj.id === id);
    theData[index].status = '2';
    this.setState({theData});
  }

  handleApprove = (id) => {
    confirm({
      title: 'Do you want to Approve Item?',
      content: 'When clicked the OK button, this dialog will be closed',
      onOk: ()=> {
        this.approvePayment(id);
      },
      onCancel:()=>{},
    });
  }

  handleDelete = (id,remark) => {
    var theData = [...this.state.theData];
    var index = theData.findIndex(obj => obj.id === id);
    theData[index].status = '3';
    theData[index].remark = remark;
    this.setState({
      theData,
      visible: false
    });
  }

  modalDelete = (id) => {
    this.setState({
      id: id
    })
    this.showModal()
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChangeRemark = (e) => {
    this.setState({ remark: e.target.value });
  };

  render() {
    const contentListNoTitle = {
      Waiting: ( 
        this.state.theData.filter(item => item.status === '1').map((obj)=>{
          // console.log(obj)
          return(
            <div>
               <Card
                style={{
                  width: "200",
                  boxShadow: " 0px 0px 10px -5px rgba(0,0,0,0.75)",
                  height: "80px"
                }}
                className="card-list"
              >
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  <Col>
                  <Button
                    style={{ border: "none", color: "#345586" }}
                    shape="circle"
                    onClick={()=>this.handleApprove(`${obj.id}`)}
                  >
                    <Icon type="check-circle" style={{ fontSize: "25px" }} />
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    style={{ border: "none", color: "#8D021F" }}
                    shape="circle"
                    onClick={()=>this.modalDelete(obj.id)}
                  >
                    <Icon type="close-circle" style={{ fontSize: "25px" }} />
                  </Button>
                  </Col>
                </Row>
              </Card><br/>
            </div>
          );
        })
        
      ),
      Approved: ( 
        this.state.theData.filter(item => item.status === '2').map((obj)=>{
          // console.log(obj)
          return(
            <div>
              <Card
                style={{
                  width: "200",
                  boxShadow: " 0px 0px 10px -5px rgba(0,0,0,0.75)",
                  height: "80px"
                }}
                className="card-list"
              >
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  <Col>
                  &nbsp;&nbsp;
                  <Button
                    style={{ border: "none", color: "#8D021F" }}
                    shape="circle"
                    onClick={()=>this.modalDelete(obj.id)}
                  >
                    <Icon type="close-circle" style={{ fontSize: "25px" }} />
                  </Button>
                  </Col>
                </Row>
              </Card><br/>
            </div>
          );
        })
        
      ),
      Rejected: ( 
        this.state.theData.filter(item => item.status === '3').map((obj)=>{
          // console.log(obj)
          return(
            <div>
              <Card
                style={{
                  width: "200",
                  boxShadow: " 0px 0px 10px -5px rgba(0,0,0,0.75)",
                  height: "80px"
                }}
                className="card-list"
              >
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  <Col>{obj.remark}</Col>
                </Row>
              </Card><br/>
            </div>
          );
        })
        
      ),
    };
    const { visible, 
      // value
    } = this.state;
    this.showModal = () => {
      this.setState({
        visible: true
      });
    };

    return (
      <div>
        <AdminLayout>
        <br />
        <Card
          style={{
            width: "100%",
            textAlign: "center"
          }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, "noTitleKey");
          }}
        >
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: "70vh" }}
          />
          <br />
          <br />
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>

        <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
          <Row>
            <span className="head-modal-approve-payment">Reject</span>
            <hr />
            <br />
            <TextArea
              onChange={(e)=>this.onChangeRemark(e)}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{
                border: "none",
                boxShadow: " 0px 0px 10px -5px rgba(0,0,0,0.75)"
              }}
            />
          </Row>
          <Row style={{ textAlign: "center" }}>
            <br />
            <Button className="btn-cancle" onClick={this.handleCancel}>Cancle</Button>
            &nbsp;
            <Button 
            className="btn-send" 
            onClick={()=>this.handleDelete(this.state.id,this.state.remark)}
            >Send</Button>
          </Row>
        </Modal>
      </AdminLayout>
      </div>
      
    );
  }
}
