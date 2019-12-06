import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Card, Layout, message } from "antd";

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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/map' />
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  checkUsername = (rule, value, callback) => {
    const form = this.props.form;
    form.setFields({
      username: {
        value: "asdas"
      }
    });
    form.setFieldsValue("pedro, manada");
  };

  LoginButton = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('Carregando...', 1.5)
        .then(() => {
          if (values.userName === 'test' && values.password === 'test')
          {
            message.success('Carregado!', 1.0);
            this.setState({
              redirect: true
            })
          }
          else
          {
            message.error('Usuário inexistente!', 1.0);
          }
          
          console.log("Received values of form: ", values);  
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
                  rules: [
                    { required: true, message: "Insira um usuário!" }/*,
                    { validator: this.checkUsername }*/
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
                  disabled={hasErrors(getFieldsError())}
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