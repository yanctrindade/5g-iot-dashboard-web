import React from "react";
import { Form, Icon, Input, Button, Row, Card, Layout, message, Divider } from "antd";
import auth from "../../Components/Login/Auth";
import fiwareLogo from '../../Assets/poweredbyfiware.png';
import comnetLogo from '../../Assets/comnetlogo.png';

import "./styles.css";
import "antd/dist/antd.css";

const { Header} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  LoginButton = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('Carregando...', 1.5)
        .then(() => {
          auth.login(values.userName, values.password);
          if (auth.isAuthenticated()){
            this.props.history.push("/map");
          }         
        })
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Row style={{ marginBottom: 50 }}>
          <Layout>
            <Header style={{ color: "white", textAlign: "center" }}>
              <img src={fiwareLogo} alt="fiwareLogo" width="130" style={{position: "absolute", right: "40px"}} />
              <img src={comnetLogo} alt="comnetLogo" width="180" style={{position: "absolute", left: "40px"}} />
            </Header>
          </Layout>
        </Row>

        <Row type="flex" justify="center" align="top" style={{minHeight: '100vh'}}>
          <Card style={{ width: 300, height: 410}}>
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

                <Divider />

                <Button
                  type="primary"
                  shape="round"
                  className="visitors-form-button"
                  href="/visitors" 
                >
                  Visitantes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </div>
    );
  }
}

export default Login;