import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Card, Layout, message } from "antd";
import { checkCredentials, auth } from "../../Components/Login/Auth";

/////////////////REMOVE/////////////////////////
import { Redirect } from 'react-router-dom'
///////////////////////////////////////////////

import "./styles.css";
import "antd/dist/antd.css";

const { Header} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {

  state = {
    redirect: false
  }

  LoginButton = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('Carregando...', 1.5)
        .then(() => {
          if (checkCredentials(values.userName, values.password))
          {
            auth.authenticate(() => {
              this.setState(() => ({
                redirectToReferrer: true
              }))
            })

            this.setState({
              redirect: true
            })
          }
        })
      }
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/map' />
    }
  }

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        {this.renderRedirect()}
        <Row style={{ marginBottom: 50 }}>
          <Layout>
            <Header style={{ color: "white", textAlign: "center" }}>
                COMNET
            </Header>
          </Layout>
        </Row>

        <Row type="flex" justify="center" align="top" style={{minHeight: '100vh'}}>
          <Card style={{ width: 300, height: 325}}>
            <Form className="login-form">
              <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                {getFieldDecorator("userName", {
                  initialValue: "",
                  rules: [
                    { required: true, message: "Insira um usuário!" }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder="E-mail ou Usuário"
                  />
                )}
              </Form.Item>

              <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator("password", {
                  initialValue: "",
                  rules: [{ required: true, message: "Insira sua senha!" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="Senha"
                  />
                )}
              </Form.Item>

              <Form.Item>
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
                  disabled={hasErrors(getFieldsError()) || !isFieldTouched('userName') || !isFieldTouched('password')}
                  onClick={this.LoginButton}
                >
                  Entrar
                </Button>
                Ou <a href="register">Registrar!</a>
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </div>
    );
  }
}

export default Login;