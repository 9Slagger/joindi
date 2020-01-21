import React, { Component } from "react";
import { Card, Icon, Row, Col, Button, Input,Modal } from "antd";
import Axios from "axios";
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
class ApprovePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "tab1",
      noTitleKey: "app",
      visible: false,
      id: '',
      remark: '',
      data:[]
    }
  };
  
  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  approvePayment=(id)=>{
    const str = null;
    Axios.post(`http://localhost:8085/ticket/admin/update-approvepayment/${id}/2/${str}`).then(res => {
      });
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
    Axios.post(`http://localhost:8085/ticket/admin/update-approvepayment/${id}/3/${remark}`).then(res => {
      this.setState({
        remark: "",
        visible: false
      })
    }).catch(err => {
      console.log(err)
    })
    
  }

  modalDelete = (id) => {
    console.log(id)
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

  async showData(){
    const result = await Axios.get("http://localhost:8085/ticket/admin/approvepayment");
      let temp = result.data.map((item) => {
        return {
          id: item.id,
          ticket_title: item.ticket.ticket_title,
          ticket_remark_reject: item.ticket_remark_reject,
          ticket_in_order_status_id: item.ticket_in_order_status_id
        }
      });
      this.setState({ data: temp }, ()=>{});
  }

  componentDidMount = async () => {
    this.showData()
    setInterval(
      ()=>this.showData(), 
      2000
    )
  };


  render() { 
    // console.log(this.state.data)
    const contentListNoTitle = {
      Waiting: ( 
        this.state.data.filter(item => item.ticket_in_order_status_id === 1).map((obj)=>{
          // console.log('test')
          console.log(obj.ticket_title)
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
                  <Col span={10} style={{textAlign:'left'}}>{obj.ticket_title}</Col>
                  <Col span={4} style={{textAlign:'right'}}>
                  <Button
                    style={{ border: "none", color: "#345586" }}
                    shape="circle"
                    onClick={()=>this.handleApprove(obj.id)}
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
        this.state.data.filter(item => item.ticket_in_order_status_id === 2).map((obj)=>{
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
                  <Col span={20} style={{textAlign:'left'}}>{obj.ticket_title}</Col>
                </Row>
              </Card><br/>
            </div>
          );
        })
      ),
      Rejected: ( 
        this.state.data.filter(item => item.ticket_in_order_status_id === 3).map((obj)=>{
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
                  <Col span={10} style={{textAlign:'left'}}>{obj.ticket_title}</Col>
                  <Col span={10} style={{textAlign:'left'}}>{obj.ticket_remark_reject}</Col>
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
            onSearch={value => {}}
            style={{ width: "70vh" }}
          />
          <br />
          <br />
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
{/* part Model Delete Item */}
        <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
          <Row>
            <span className="head-modal-approve-payment">Reject</span>
            <hr />
            <br />
            <TextArea
              value={this.state.remark}
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

export default (ApprovePayment)
