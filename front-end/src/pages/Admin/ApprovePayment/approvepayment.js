import React, { Component } from "react";
import { Card, Icon, Row, Col, Button, Input } from "antd";
import AdminLayout from "../../../common/AdminLayout";

const { Search } = Input;

const tabListNoTitle = [
  {
    key: "Waiting",
    tab: (
      <span>
        <Icon type="question-circle" />
        Waiting
      </span>
    )
  },
  {
    key: "Approved",
    tab: (
      <span>
        <Icon type="check-circle" />
        Approve
      </span>
    )
  },
  {
    key: "Rejected",
    tab: (
      <span>
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
    theData: [
      {
        id:'1',
        name: 'จ่ายค่ากิจกรรมดูหนังนะจ้ะ',
        status:'1'
      },
      {
        id:'2',
        name: 'จ่ายเงินค่ากิจกรรมร้องเพลงที่ตู้คาราโอเกะ',
        status:'1'
      },
      {
        id:'3',
        name: 'จ่ายเงินค่ากิจกรรมไปจ่ายชาบูชิ โปรโมชั่นมา 4 จ่าย 3',
        status:'1'
      },
      {
        id:'4',
        name: 'จ่ายเงินค่ากิจกรรมไปกินไอติมที่ท่าน้ำนนท์',
        status:'1'
      },
      {
        id:'5',
        name: 'จ่ายเงินค่ากิจกรรมไปออกกำลังกายเพื่อสุขภาพที่ดี',
        status:'1'
      },
      {
        id:'6',
        name: 'จ่ายเงินค่ากิจกรรมวิ่งสู้ฟัดเพื่อลดความอ้วนนะจ้ะ',
        status:'1'
      },
    ]
  };
  
  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  handleApprove = (id) => {
    var theData = [...this.state.theData];
    var index = theData.findIndex(obj => obj.id === id);
    theData[index].status = '2';
    this.setState({theData});
  }

  handleDelete = (id) => {
    var theData = [...this.state.theData];
    var index = theData.findIndex(obj => obj.id === id);
    theData[index].status = '3';
    this.setState({theData});
  }

  render() {
    const contentListNoTitle = {
      Waiting: ( 
        this.state.theData.filter(item => item.status === '1').map((obj)=>{
          // console.log(obj)
          return(
            <div>
              <Card style={{ width: "200", height: "20" }}>
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  <Col>
                    <Button style={{ border: "none" }} shape="circle" onClick={()=>this.handleApprove(`${obj.id}`)}>
                      <Icon type="check-circle" style={{ fontSize: "20px" }} />
                    </Button>
                    <Button style={{ border: "none" }} shape="circle" onClick={()=>this.handleDelete(`${obj.id}`)}>
                      <Icon type="close-circle" style={{ fontSize: "20px" }} />
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
              <Card style={{ width: "200", height: "20" }}>
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  {/* <Col>
                    <Button style={{ border: "none" }} shape="circle">
                      <Icon type="check-circle" style={{ fontSize: "20px" }} />
                    </Button>
                    <Button style={{ border: "none" }} shape="circle" onClick={()=>this.handleDelete(`${obj.id}`)}>
                      <Icon type="close-circle" style={{ fontSize: "20px" }} />
                    </Button>
                  </Col> */}
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
              <Card style={{ width: "200", height: "20" }}>
                <Row type="flex" justify="space-between">
                  <Col>{obj.name}</Col>
                  {/* <Col>
                    <Button style={{ border: "none" }} shape="circle">
                      <Icon type="check-circle" style={{ fontSize: "20px" }} />
                    </Button>
                    <Button style={{ border: "none" }} shape="circle" onClick={()=>this.handleDelete(`${obj.id}`)}>
                      <Icon type="close-circle" style={{ fontSize: "20px" }} />
                    </Button>
                  </Col> */}
                </Row>
              </Card><br/>
            </div>
          );
        })
        
      ),
    };

    return <AdminLayout>
      <Card
        style={{ width: "100%", textAlign: "center" }}
        tabList={tabListNoTitle}
        activeTabKey={this.state.noTitleKey}
        // tabBarExtraContent={<a href="#">More</a>}
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
    </AdminLayout>;
  }
}
