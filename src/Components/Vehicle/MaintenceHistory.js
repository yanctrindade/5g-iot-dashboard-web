import React, { Component } from "react";
import {
    Form,
    Input,
    Card,
    Row,
    Col,
    Divider,
    Table,
    Button,
    Typography,
    Collapse
  } from 'antd';
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from 'axios';
import "./styles.css";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const columns = [
    {
      title: 'Manuntenções',
      dataIndex: 'title',
    }
    ];

const data = [
    {
        key: '1',
        title: 'Revisão geral',
        description: 'Foi feita a revisão geral desse veículo',
    },
];

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MaintenceHistory extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                      plate: "",
                      model: "",
                      manufacture: "",
                      lastMaintenceDate: null,
                      departament: "",
                      year: "",
                      color: "",
                      nextMaintenceDate: null,
                      mileage: "",
                      redirect: false,
                      collapsed: true
                     };
    }

    insertString = (str, index, value) => {
        return str.substr(0, index) + value + str.substr(index);
    }

    componentDidMount() {
        const n = window.location.href.search("plate");

        if (n !== -1){
            axios.get('http://localhost:3000/database.json')
            .then((res)=>{
                this.setData(res.data, this.insertString(window.location.href.substring(n + 6, n + 13), 3, " "));
            }).catch((err)=>{
                console.log(err);
            })
        } else{
            this.setState({redirect: true});
        }
    }

    setData = (allVehicleData, plate) => {
        let found = false;
        let model, manufacture, lastMaintenceDate,
        departament, year, color, nextMaintenceDate, mileage;
       
        for (var i = 0; i < allVehicleData.length; i++){
            // look for the entry with a matching `plate` value
            if (allVehicleData[i].plate === plate){
                found = true; // Sets the found tag for state update

                // Sets all the other variables
                model = allVehicleData[i].model;
                manufacture = allVehicleData[i].manufacture;
                lastMaintenceDate = allVehicleData[i].lastMaintenceDate;
                departament = allVehicleData[i].departament;
                year = allVehicleData[i].year;
                color = allVehicleData[i].color;
                nextMaintenceDate = allVehicleData[i].nextMaintenceDate;
                mileage = allVehicleData[i].statistics.mileage;
            }
        }

        if (found){
            this.setState({
                plate: plate,
                model: model,
                manufacture: manufacture,
                lastMaintenceDate: lastMaintenceDate,
                departament: departament,
                year: year,
                color: color,
                nextMaintenceDate: nextMaintenceDate,
                mileage: mileage
            });
        } else{
            this.setState({redirect: true});
        }
    }

    render(){      
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;     
        const titleError = isFieldTouched('title') && getFieldError('title'); 
        const descriptionError = isFieldTouched('description') && getFieldError('description');

        return(
            <>
            {this.state.redirect ? <Redirect to="/vehicles"/> : <></>}
                <Card title={this.state.manufacture + ": " + this.state.model + " (" + this.state.plate + ") - " + 
                this.state.color + ", " + this.state.year + ", " + this.state.departament} >
                    
                    <Row justify="center">
                        <Title level={4}>Estatísticas:</Title>
                        <Text>- Última manuntenção: {moment(this.state.lastMaintenceDate).format("DD/MM/YYYY")}</Text>
                        <br/>
                        <Text>- Próxima manuntenção: {moment(this.state.nextMaintenceDate).format("DD/MM/YYYY")}</Text>
                        <br/>
                        <Text>- Hodômetro: {this.state.mileage} Km</Text>
                    </Row>

                    <Row justify="center" style={{position: "relative", top: "10px"}}>
                        <Title level={4}>Histórico de manuntenção:</Title>
                    </Row>

                    <Row justify="center">
                        <br/>
                        <Table 
                            bordered = {true}
                            size="middle"
                            columns={columns} dataSource={data} 
                            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                            pagination={{ 
                            pageSizeOptions: ["5", "10", "15", "20"],
                            showSizeChanger: true,
                            }} 
                        />
                    </Row>

                    <Divider />

                    <Collapse onChange={() => this.setState(prevState => ({collapsed: !prevState.collapsed}))}>
                        <Panel header={<Title level={4}>Adicionar novo registro de manuntenção</Title>} key="1">
                    
                            <Form onSubmit={this.handleSubmit}>
                                <Row justify="center">
                                    <Col span={24} style={{margin: "1%"}}>
                                        <Form.Item label="Título" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
                                            {getFieldDecorator("title", {
                                                rules: [
                                                    { required: true, message: "Insira o título para a manuntenção!" }
                                                ]
                                                })(
                                                <Input
                                                    placeholder="Título da manuntenção"
                                                    //onChange={this.updatePlate}
                                                    allowClear={false}
                                                />
                                                )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center">
                                    <Col span={24} style={{margin: "1%"}}>
                                        <Form.Item label="Descrição" validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}>
                                            {getFieldDecorator("description", {
                                                rules: [
                                                    { required: true, message: "Insira a descrição da manuntenção!" }
                                                ]
                                                })(
                                                <TextArea
                                                    placeholder="Descrição da Manuntenção"
                                                    //onChange={this.updatePlate}
                                                    allowClear={false}
                                                    rows={4} 
                                                />
                                                )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row style={{marginLeft: "37%", marginTop: "5%"}}>
                                    <Form.Item >
                                        <Row>
                                            <Col span={5}>                                
                                                <Button type="danger" href="/vehicles">
                                                    Voltar
                                                </Button>
                                            </Col>
                                            <Col span={5}>      
                                                <Button 
                                                    type="primary" 
                                                    //onClick={this.saveEdit}
                                                    disabled={hasErrors(getFieldsError()) || !isFieldTouched('title') || !isFieldTouched('description')}
                                                >
                                                    Salvar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Panel>
                    </Collapse>

                    {this.state.collapsed ? 
                    <Row style={{marginLeft: "42%", marginTop: "5%"}}>                             
                        <Button type="primary" href="/vehicles">
                            Voltar
                        </Button>                           
                    </Row>
                    : <></>}
                </Card>
            </>
        );
    }
}

export default Form.create()(MaintenceHistory);