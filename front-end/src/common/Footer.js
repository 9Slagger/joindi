import React, { Component } from 'react'
import {Row,Col,Icon} from 'antd'
import '../css/Footer.css'

export class Footer extends Component {

    render() {
        return (
            <div>
                <Row className="footer">
                    <Col span={8}>
                        <img src="https://i.ibb.co/CQbsfSH/noun-contact-1784720-new.png" alt="join-di logo" style={{height: '40px', width: 'auto'}}/>
                        <div>
                            JoinDi Co., Ltd.
                        </div>
                        <div>
                            SYN HUB at Pantip Plaza, Pratunam, Room 4121, 4125, 4th floor Building, 604/3 Petchaburi Road, Rattchatavee, Bangkok 10400
                        </div>
                        <div>© 2020 Join Di</div>
                        <div className="LinkFooter">
                            <a>Term of Service</a> &nbsp; | &nbsp;
                            <a>Primary Policy</a>
                        </div>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Row className="RightFooter">
                            <br/>
                            <Col span={5}>
                                <a>About us</a>
                                <br/>
                                <a>Blog</a>
                                <br/>
                                <a>Join Di News</a>
                            </Col>
                            <Col span={4}>
                                <a>For Creator</a>
                                <br/>
                                <a>Host on events</a>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Icon type="facebook" style={{ fontSize: '15px', color: '#345586', backgroundColor: '#fff', borderRadius: '50%', padding: '10px'}}/>
                            &nbsp;
                            <Icon type="instagram" style={{ fontSize: '15px', color: '#345586', backgroundColor: '#fff', borderRadius: '50%', padding: '10px'}}/>
                            &nbsp;
                            <Icon type="medium" style={{ fontSize: '15px', color: '#345586', backgroundColor: '#fff', borderRadius: '50%', padding: '10px'}}/>
                            &nbsp;
                            <Icon type="twitter" style={{ fontSize: '15px', color: '#345586', backgroundColor: '#fff', borderRadius: '50%', padding: '10px'}}/>
                            &nbsp;
                            <Icon type="wechat" style={{ fontSize: '15px', color: '#345586', backgroundColor: '#fff', borderRadius: '50%', padding: '10px'}}/>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Footer
