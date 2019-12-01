import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Card, Layout, message } from "antd";

import "./Login.css";
import "antd/dist/antd.css";

const { Header} = Layout;
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
        message.loading('Carregando...', 2.5)
        .then(() => {
          message.success('Carregado!', 1.0);
          console.log("Received values of form: ", values);  
        })        
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Layout>
          <Header style={{ color: "white", textAlign: "center" }}>
              COMNET
          </Header>
        </Layout>

        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
          <Card style={{ width: 300}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Insira um usuário!" }/*,
                    { validator: this.checkUsername }*/
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
                  rules: [{ required: true, message: "Insira sua senha!" }]
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
                  {/*<a href="map">Entrar</a>*/}
                  Entrar
                </Button>
                Ou <a href="register">Registrar!</a>
              </FormItem>
            </Form>
          </Card>
        </Row>
      </div>
    );
  }
}

export default Login;