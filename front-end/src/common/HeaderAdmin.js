import React, { Component } from 'react'
import { Row, Col, Icon} from 'antd'
import '../css/HeaderAdmin.css'


export class HeaderAdmin extends Component {
    render() {
        return (
            <div>
                <Row className="headerBox">
                    <Col span={4}>
                           <img src="https://i.ibb.co/28WfkY9/join-DI-logo1.png" alt="join-DI-logo1" style={{ height: '50px', width: 'auto'}}/> 
                    </Col>
                    <Col span={4} className="headerLogo">
                        <span>Management</span>
                    </Col>
                    <Col span={13}></Col>
                    <Col span={3} >
                        <Row>&nbsp;</Row>
                        <Row>
                            <div>
                              <span className="headerAdmin">Admin</span> 
                            &nbsp;
                            <Icon type="down" style={{color: '#fff'}}/>  
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default HeaderAdmin
