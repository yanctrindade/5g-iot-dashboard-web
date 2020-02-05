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
    Collapse,
    Icon
  } from 'antd';
import { Redirect } from "react-router-dom";
import moment from "moment";
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import "./styles.css";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

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
                      collapsed: true,
                      maintenceHistory: []
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
        departament, year, color, nextMaintenceDate, mileage, maintenceHistory;

        maintenceHistory = [
            {
                key: '1',
                maintenceTitle: 'Revisão geral',
                date: "2020-02-04",
                description: 'Foi feita a revisão geral desse veículo',
            },
        ];
       
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
                mileage: mileage,
                maintenceHistory: this.dataFilter(maintenceHistory)
            });
        } else{
            this.setState({redirect: true});
        }
    }

    dataFilter = (data) => {
        data.map(item => {
          item.date = this.getDate(item.date)
          return item
        })
  
      return data
    }

    getDate = (date) => new Date(date).toLocaleDateString();

    compareDates = (a, b) => {
        let dateA = new Date(a);
        let dateB = new Date(b);
      
        if (dateA > dateB)
          return 1;
        if (dateA < dateB)
          return -1;
      
        return 0;
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                this.searchInput = node;
                }}
                placeholder={`Buscar Item`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm)}
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
            >
                Buscar
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Limpar
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
            setTimeout(() => this.searchInput.select());
            }
        },
        render: (text, record) => {
            const cellText = typeof text === "string" ? text : text[0]
            return  (
                <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={cellText.toString()}
                />
            )
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render(){      
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;     
        const titleError = isFieldTouched('title') && getFieldError('title'); 
        const descriptionError = isFieldTouched('description') && getFieldError('description');

        const columns = [
            {
                title: 'Manuntenções',
                dataIndex: 'maintenceTitle',
                key: 'maintenceTitle',
                onFilter: (value, record) => record.maintenceTitle.indexOf(value) === 0,
                sorter: (a, b) =>  { return a.maintenceTitle.localeCompare(b.maintenceTitle)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('maintenceTitle')
            },
            {
                title: 'Data',
                dataIndex: 'date',
                key: 'date',
                align: "center",
                onFilter: (value, record) => record.date.indexOf(value) === 0,
                sorter: (a, b) => { return this.compareDates(a.date, b.date)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('date')
            }
        ];

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
                            columns={columns} dataSource={this.state.maintenceHistory} 
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

                                <Row className="back-save-button">
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
                    <Row className="back-button">                             
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