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
import axios from 'axios';

import "./styles.css";

const { Header} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
                  confirmDirty: false,
                  email: "",
                  name: "",
                  userCurrentPassword: "",
                  password: "",
                  oldPassword: "",
                  confirmPassword: "",
                  userName: "",
                  checkbox: false
                };
  }

  componentDidMount() {
    if (auth.isAuthenticated()){
      axios.get('/users.json')
      .then((res)=>{
        this.setData(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  setData = (data) => {
    const userData = data.filter(item => item.name === auth.getUserName())
    this.setState({
        email: userData[0].email,
        name: userData[0].name,
        userCurrentPassword: userData[0].password,
        userName: userData[0].userName
      });
  }

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

  compareToOldPassword = (rule, value, callback) => {

    if (value && value !== this.state.userCurrentPassword) {
      callback('Senha incorreta!');
    } else {
      callback();
    }
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

  updateEmail = (e) => {
    this.setState(({
      email: e.target.value
    }));
  }

  updateOldpassword = (e) => {
    this.setState(({
      oldPassword: e.target.value
    }));
  }

  updatePassword = (e) => {
    this.setState(({
      password: e.target.value
    }));
  }

  updateUserName = (e) => {
    this.setState(({
      userName: e.target.value
    }));
  }

  updateConfirmPassword = (e) => {
    this.setState(({
      confirmPassword: e.target.value
    }));
  }

  updateName = (e) => {
    this.setState(({
      name: e.target.value
    }));
  }

  areRegistrationFieldsEmpty = () => {
    return !(this.state.email !== ""  && this.state.name !== "" && this.state.password !== "" && this.state.userName !== "" && this.state.confirmPassword !== "")
  }

  areEditFieldsEmpty = () => {
    if (this.state.oldPassword !== ""){
      return !(this.state.email !== "" && this.state.name !== "" && this.state.password !== "" && this.state.userName !== "" && this.state.confirmPassword !== "")
    }

    return !(this.state.email !== "" && this.state.name !== "" && this.state.userName !== "")
  }

  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;     
    const emailError = isFieldTouched('email') && getFieldError('email');
    const oldPasswordError = isFieldTouched('oldPassword') && getFieldError('oldPassword');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmPasswordError = isFieldTouched('confirm') && getFieldError('confirm');
    const userNameError = isFieldTouched('nickname') && getFieldError('nickname');
    const nameError = isFieldTouched('name') && getFieldError('name');

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
              <Card style={{ width: 600, height: auth.isAuthenticated() ? 460 : 560 }}>                    
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={12}>
                      <Col span={20}>
                        <Form.Item label="E-mail" validateStatus={emailError ? 'error' : ''} help={emailError || ''} >
                            {getFieldDecorator('email', {
                              initialValue: this.state.email,
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
                            })(<Input 
                                  placeholder="Insira seu E-mail."
                                  onChange={this.updateEmail}
                              />)}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={12}>
                      <Col span={20}>
                        <Form.Item label="Nome" validateStatus={nameError ? 'error' : ''} help={nameError || ''} >
                            {getFieldDecorator('name', {
                              initialValue: this.state.name,
                              rules: [
                                  {
                                  required: true,
                                  message: 'Insira seu nome completo!',
                                  },
                              ],
                            })(<Input 
                                  placeholder="Insira seu Nome completo."
                                  onChange={this.updateName}
                              />)}
                        </Form.Item>
                      </Col>
                    </Row>

                      {auth.isAuthenticated() ? 
                        <>
                          <Row gutter={12}>
                            <Col span={20}>
                              <Form.Item label="Senha Antiga" hasFeedback  validateStatus={oldPasswordError ? 'error' : ''} help={oldPasswordError || ''} >
                                {getFieldDecorator('oldPassword', {
                                rules: [
                                    {
                                      required: true,
                                      message: 'Insira sua senha antiga!',
                                    },
                                    {
                                      validator: this.compareToOldPassword,
                                    }
                                ],
                                })(<Input.Password 
                                    placeholder="Insira sua senha antiga."
                                    onChange={this.updateOldpassword}
                                  />)}
                              </Form.Item>
                            </Col>
                          </Row>
                        </> 
                      :<></>}
                      
                      <Row gutter={12}>
                        <Col span={20}>
                          <Form.Item label={auth.isAuthenticated() ? "Nova Senha" : "Senha"} hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''} >
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
                              })(<Input.Password 
                                  placeholder= {auth.isAuthenticated() ? "Insira sua nova senha." : "Insira sua senha."}
                                  onChange={this.updatePassword}
                                />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Row gutter={12}>
                        <Col span={20}>
                          <Form.Item label="Confirmar Senha" hasFeedback validateStatus={confirmPasswordError ? 'error' : ''} help={confirmPasswordError || ''} >
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
                              })(<Input.Password onBlur={this.handleConfirmBlur} 
                                  placeholder="Confirme a senha."
                                  onChange={this.updateConfirmPassword}
                                />)}
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

                             validateStatus={userNameError ? 'error' : ''} help={userNameError || ''} 
                          >
                              {getFieldDecorator('nickname', {
                                initialValue: this.state.userName,
                                rules: [{ required: true, message: 'Insira o nome de usuário!', whitespace: true }],
                              })(<Input 
                                  placeholder="Insira seu nome de usuário."
                                  onChange={this.updateUserName}
                                />)}
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
                                  <Checkbox onClick={() => this.setState(prevState => ({checkbox: !prevState.checkbox}))}>
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
                            <Button 
                              type="primary" 
                              htmlType="submit" 
                              disabled={auth.isAuthenticated() ? hasErrors(getFieldsError()) || this.areEditFieldsEmpty() : (!this.state.checkbox || hasErrors(getFieldsError()) || this.areRegistrationFieldsEmpty())}
                            >
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