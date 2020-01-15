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
        name: 'name1',
        status:'1'
      },
      {
        id:'2',
        name: 'name2',
        status:'1'
      },
      {
        id:'3',
        name: 'name1',
        status:'2'
      },
      {
        id:'4',
        name: 'name2',
        status:'2'
      },
      {
        id:'5',
        name: 'name1',
        status:'3'
      },
      {
        id:'6',
        name: 'name2',
        status:'3'
      },
    ]
  };
  
  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  handleDelete = (id1) => {
    console.log(id1)
    // this.setState.theData.filter((theData) => theData.id != id1);
    const newArray = this.state.theData.filter(item => item.id !== id1)
    this.setState({
      theData: newArray
    })  
  }

  render() {
    const contentListNoTitle = {
      Waiting: ( 
        this.state.theData.map((obj)=>{
          return(
            <Card style={{ width: "200", height: "20" }}>
              <Row type="flex" justify="space-between">
                <Col>{obj.name}</Col>
                <Col>
                  <Button style={{ border: "none" }} shape="circle">
                    <Icon type="check-circle" style={{ fontSize: "20px" }} />
                  </Button>
                  <Button style={{ border: "none" }} shape="circle" onClick={()=>this.handleDelete(`${obj.id}`)}>
                    <Icon type="close-circle" style={{ fontSize: "20px" }} />
                  </Button>
                </Col>
              </Row>
            </Card>
          );
        })
        
      ),
      Approved: <p>app content</p>,
      Rejected: <p>project content</p>
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
