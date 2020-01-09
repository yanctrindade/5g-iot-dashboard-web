import React from "react";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Row,
    Col,
    Checkbox,
    Button,
    Card,
    Layout,
  } from 'antd';
import auth from "../../Components/Login/Auth";
import fiwareLogo from '../../Assets/poweredbyfiware.png';
import comnetLogo from '../../Assets/comnetlogo.png';

  import "./styles.css";
  
  const { Header} = Layout;
  
  class Register extends React.Component {
    state = {
      confirmDirty: false
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('As senhas digitadas não são iguais!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
      return (
        <div>
            <Row style={{ marginBottom: 50 }}>
                <Layout>
                    <Header style={{ color: "white", textAlign: "center" }}>
                        <img src={fiwareLogo} alt="fiwareLogo" width="130" style={{position: "absolute", right: auth.isAuthenticated() ? "100px" : "40px"}} />
                        <img src={comnetLogo} alt="comnetLogo" width="180" style={{position: "absolute", left: "40px"}} />
                        {auth.isAuthenticated() ? <Button 
                                                    type="link" 
                                                    className="edit-user-logout-buttom"
                                                    href='#' 
                                                    onClick={
                                                      () => {
                                                        auth.logout(() => {
                                                        this.props.history.push("/");
                                                      });
                                                    }}>
                                                    Sair
                                                  </Button> 
                                                  : <></>}
                    </Header>
                </Layout>
            </Row>

            <Row type="flex" justify="center" align="top">
                <Card style={{ width: 600, height: auth.isAuthenticated() ? 400 : 500 }}>                    
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                      <Row gutter={12}>
                        <Col span={20}>
                          <Form.Item label="E-mail">
                              {getFieldDecorator('email', {
                              rules: [
                                  {
                                  type: 'email',
                                  message: 'O E-mail digitado não é valido!',
                                  },
                                  {
                                  required: true,
                                  message: 'Insira seu E-mail!',
                                  },
                              ],
                              })(<Input />)}
                          </Form.Item>
                        </Col>
                      </Row>

                        {auth.isAuthenticated() ? 
                          <>
                            <Row gutter={12}>
                              <Col span={20}>
                                <Form.Item label="Senha Antiga" hasFeedback>
                                  {getFieldDecorator('oldPassword', {
                                  rules: [
                                      {
                                      required: true,
                                      message: 'Insira sua senha antiga!',
                                      }
                                  ],
                                  })(<Input.Password />)}
                                </Form.Item>
                              </Col>
                            </Row>
                          </> 
                        :<></>}
                        
                        <Row gutter={12}>
                          <Col span={20}>
                            <Form.Item label={auth.isAuthenticated() ? "Nova Senha" : "Senha"} hasFeedback>
                                {getFieldDecorator('password', {
                                rules: [
                                    {
                                    required: true,
                                    message: auth.isAuthenticated() ? 'Insira sua senha nova!' : 'Insira sua senha!',
                                    },
                                    {
                                    validator: this.validateToNextPassword,
                                    },
                                ],
                                })(<Input.Password />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row gutter={12}>
                          <Col span={20}>
                            <Form.Item label="Confirmar Senha" hasFeedback>
                                {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                    required: true,
                                    message: 'Confirme a senha digitada anteriormente!',
                                    },
                                    {
                                    validator: this.compareToFirstPassword,
                                    },
                                ],
                                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row gutter={12}>
                          <Col span={20}>
                            <Form.Item
                                label={
                                <span>
                                    Usuário&nbsp;
                                    <Tooltip title="O nome de usuário usado para entrar">
                                    <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                                }
                            >
                                {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Insira o nome de usuário!', whitespace: true }],
                                })(<Input />)}
                            </Form.Item>
                          </Col>
                        </Row>

                        {auth.isAuthenticated() ? <></> : 
                          <>
                            <Row gutter={12}>
                              <Col span={20}>
                                <Form.Item label="Captcha" extra="Verifica se você é humano.">
                                    <Row gutter={8}>
                                    <Col span={12}>
                                        {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: 'Insira a captcha!' }],
                                        })(<Input />)}
                                    </Col>
                                    <Col span={12}>
                                        <Button>Get captcha</Button>
                                    </Col>
                                    </Row>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={12}>
                              <Col span={20}>
                                <Form.Item {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                    })(
                                    <Checkbox>
                                        Eu li e aceito <a href="agreement">os termos de serviço</a>
                                    </Checkbox>,
                                    )}
                                </Form.Item>
                              </Col>
                            </Row>
                        </>}

                        <Row gutter={12}>
                          <Form.Item {...tailFormItemLayout}>
                            <Col span={8}>
                              <Button onClick={() => this.props.history.goBack()}>
                                Voltar
                              </Button>
                            </Col>

                            <Col span={8}>
                              <Button type="primary" htmlType="submit">
                                {auth.isAuthenticated() ? "Salvar" : "Registrar"}
                              </Button>
                            </Col>
                          </Form.Item>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </div>
      );
    }
  }

export default Register;