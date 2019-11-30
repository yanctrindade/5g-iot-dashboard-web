import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row } from "antd";

import "./Login.css";
import "antd/dist/antd.css";

const FormItem = Form.Item;
class Login extends React.Component {
  checkUsername = (rule, value, callback) => {
    const form = this.props.form;
    form.setFields({
      username: {
        value: "asdas"
      }
    });
    form.setFieldsValue("pedro, manada");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" },
                { validator: this.checkUsername }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Usuário"
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Senha"
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Mantenha-me conectado</Checkbox>)}
            <a className="login-form-forgot" href="recover">
              Esqueci minha senha
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <a href="map">Entrar</a>
            </Button>
            Ou <a href="register">Registrar!</a>
          </FormItem>
        </Form>
      </Row>
    );
  }
}

export default Login;