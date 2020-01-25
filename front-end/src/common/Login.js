import React, { Component } from "react";
import { Row, Col, Modal, Button, Input, Divider, Form } from "antd";
import { connect } from "react-redux";
import { signin } from "../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visibleLogIn: false
    };
  }

  showModalLogIn = () => {
    this.setState({
      visibleLogIn: true
    });
  };

  handleCancelLogIn = () => {
    this.setState({
      visibleLogIn: false
    });
  };

  handleSubmitLogIn = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        try {
          this.props.signin(email, password);
        } catch (error) {
          alert(this.props.Authentication.item.messages.title_en);
        }
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col className="login">
        <Button
          type="link"
          onClick={this.showModalLogIn}
          className="buttonHeader"
        >
          Log in
        </Button>
        <Modal
          visible={this.state.visibleLogIn}
          // title="Log in"
          onOk={this.handleOkLogIn}
          onCancel={this.handleCancelLogIn}
          footer={null}
        >
          <p> Log in</p>
          <Divider />
          <Form onSubmit={this.handleSubmitLogIn}>
            <Row>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your username!"
                    }
                  ]
                })(<Input name="email" onChange={this.handleChange} />)}
              </Form.Item>
              <Form.Item label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Password!"
                    }
                  ]
                })(
                  <Input.Password
                    name="password"
                    onChange={this.handleChange}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Row type="flex" justify="center">
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </Row>
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </Col>
    );
  }
}

const mapStateToProps = ({ Authentication }) => ({ Authentication });

const mapDispatchToProps = {
  signin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
