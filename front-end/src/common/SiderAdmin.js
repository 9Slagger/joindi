import React, { Component } from 'react'
import { Layout,Icon, Row, Col } from 'antd'
import '../css/SiderAdmin.css'

const { Sider } = Layout;

export class SiderAdmin extends Component {

    render() {
        return (
            <div>
                <Sider className="siderAdmin">
                    <Col>
                        <Row>
                            <br/>
                            <Icon type="project" style={{ fontSize: '60px', color: '#345586' }}/>
                        <br/>
                        <span>Event</span>
                        </Row>
                        <Row>
                            <br/>
                            <Icon type="user" style={{ fontSize: '60px', color: '#345586' }}/> 
                        <br/>
                        <span>User</span>
                        </Row>
                        <Row>
                            <br/>
                            <Icon type="wallet" style={{ fontSize: '60px', color: '#345586' }}/>
                        <br/>
                        <span>Payment</span> 
                        </Row>
                        <Row>
                            <br/>
                            <Icon type="tags" style={{ fontSize: '60px', color: '#345586'}}/>
                            <br/>
                            <span>Tag</span>
                        </Row>
                        <Row style={{ height: '100px'}}>&nbsp;</Row>
                    </Col>
                </Sider>
            </div>
        )
    }
}

export default SiderAdmin
