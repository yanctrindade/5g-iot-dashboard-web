import React from "react";
import { Form, Icon, Input, Button, Typography, Row, Card, Layout, message } from "antd";

import "./Recover.css";
import "antd/dist/antd.css";

const { Header} = Layout;
const { Text } = Typography;

class Recover extends React.Component{
    SendNewPassword = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log("Received values of form: ", values); 

            if (values.userName === 'test')
            {
                 message.success('Nova senha enviada!', 1.0); 
            }
            else
            {
                message.error('Usuário inexistente!', 1.0); 
            }
          }
        });
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
            <Row style={{ marginBottom: 50 }}>
                <Layout>
                    <Header style={{ color: "white", textAlign: "center" }}>
                        COMNET
                    </Header>
                </Layout>
            </Row>

            <Row type="flex" justify="center" align="top" style={{minHeight: '100vh'}}>
                <Card style={{ width: 300, height: 250}}>
                    <Row style={{ marginBottom: 30 }}>
                        <Text className="forgot-password-text">Insira seu usuário ou E-mail para recuperar a senha:</Text>
                    </Row>

                    <Row style={{ marginBottom: 2 }}>
                        <Form>
                            <Row style={{ marginBottom: 15 }}>
                                <Form.Item>
                                    {getFieldDecorator("userName", {
                                    rules: [
                                        { required: true, message: "Insira um usuário ou E-mail!" }
                                    ]
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                        placeholder="E-mail ou usuário"
                                    />
                                    )}                                    
                                </Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={this.SendNewPassword}
                                    >
                                    Enviar
                                </Button>
                            </Row>

                            <Row>
                                <a className="login-form-forgot" href="/">
                                    Voltar para a página de Login
                                </a>
                            </Row>
                        </Form>
                    </Row>
                </Card>
            </Row>
        </div>
        );}
}

export default Recover;