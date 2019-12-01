import React from "react";
import { Form, Icon, Input, Button, Typography, Row, Card, Layout, message } from "antd";

import "./Recover.css";
import "antd/dist/antd.css";

const { Header} = Layout;
const FormItem = Form.Item;
const { Text } = Typography;

function Recover(){
    return (
        <div>
            <Layout>
            <Header style={{ color: "white", textAlign: "center" }}>
                COMNET
            </Header>
            </Layout>

            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Card style={{ width: 300}}>
                    <Text className="forgot-password-text">Insira seu usuário ou E-mail para recuperar a senha:</Text>
                    <Form>
                        <FormItem>
                            <Input
                                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                placeholder="E-mail ou usuário"
                            />
                        </FormItem>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={SendNewPassword}
                            >
                            {/*<a href="map">Entrar</a>*/}
                            Enviar
                        </Button>

                        <a className="login-form-forgot" href="/">
                            Voltar a página de Login
                        </a>
                    </Form>
                </Card>
            </Row>
        </div>
    );
}

function SendNewPassword(){
    message.loading('Enviando...', 2.5)
    .then(() => {
        message.success('Nova senha enviada!', 1.0);
    })
}

export default Recover;