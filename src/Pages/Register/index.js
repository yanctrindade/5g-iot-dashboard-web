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
                        COMNET
                    </Header>
                </Layout>
            </Row>

            <Row type="flex" justify="center" align="top">
                <Card style={{ width: 600, height: 500}}>                    
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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

                        <Form.Item label="Senha" hasFeedback>
                            {getFieldDecorator('password', {
                            rules: [
                                {
                                required: true,
                                message: 'Insira sua senha!',
                                },
                                {
                                validator: this.validateToNextPassword,
                                },
                            ],
                            })(<Input.Password />)}
                        </Form.Item>

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

                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                            })(
                            <Checkbox>
                                Eu li e aceito <a href="agreement">os termos de serviço</a>
                            </Checkbox>,
                            )}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                            Registrar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </div>
      );
    }
  }

export default Register;