import React, { Component } from "react";
import {    Form,
            Input,
            Button,
            Row,
            Col,
            Collapse,
            Typography,
            Table,
            Popconfirm,
            Icon,
            message
} from 'antd';

import Highlighter from 'react-highlight-words';
import API from "../../api/fiware";

const { Panel } = Collapse;
const { Title } = Typography;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Driver extends Component {
    constructor(props) {
        super(props);
        this.stopsColumns = [
            {
              title: "Longitude",
              dataIndex: "longitude",
              width: "30%"
            },
            {
              title: "Latitude",
              dataIndex: "latitude"
            },
            {
              title: "Ação",
              dataIndex: "operation",
              render: (text, record) =>
                this.state.vehicleStops.length >= 1 ? (
                  <Popconfirm
                    title="Certeza que deseja deletar?"
                    onConfirm={() => this.handleDelete(record.key)}
                  >
                    <Button type="link">
                      Deletar
                    </Button>
                  </Popconfirm>
                ) : null
            }
          ];
        this.state = { 
                        routesData: [],
                        initialLocationLong: "",
                        initialLocationLat: "",
                        finalLocationLong: "",
                        finalLocationLat: "",
                        vehicleStops: [],
                        count: 0,
                        stopLongitude: "",
                        stopLatitude: ""
                     };
    }

    componentDidMount() {
        const dataSource = [
            {
                key: 1,
                initialLocation: "Unb - ICC sul",
                finalLocation: "Unb - CIC",
                date: "2020-02-04"
            },
            {
                key: 2,
                initialLocation: "Unb - ICC norte",
                finalLocation: "Unb - FT",
                date: "2020-02-06"
            }
        ];

        this.setState({routesData: this.dataFilter(dataSource)});
    }

    handleDelete = key => {
        const vehicleStops = [...this.state.vehicleStops];
        this.setState({
          vehicleStops: vehicleStops.filter(item => item.key !== key)
        });
    };

    handleAdd = () => {
    const { count, vehicleStops } = this.state;
    const newData = {
        key: count,
        longitude: this.state.stopLongitude,
        latitude: this.state.stopLatitude
    };
    this.setState({
        vehicleStops: [...vehicleStops, newData],
        count: count + 1,
        stopLongitude: "",
        stopLatitude: ""
    });
    };

    dataFilter = (data) => {
        data.map(item => {
          item.date = this.getDate(item.date)
          return item
        })
  
      return data
    }

    updateInitialLocationLong = (e) => {
        this.setState(({
            initialLocationLong: e.target.value
        }));
    }

    updateInitialLocationLat = (e) => {
        this.setState(({
            initialLocationLat: e.target.value
        }));
    }

    updateFinalLocationLong = (e) => {
        this.setState(({
            finalLocationLong: e.target.value
        }));
    }

    updateFinalLocationLat = (e) => {
        this.setState(({
            finalLocationLat: e.target.value
        }));
    }

    saveRoute = () => {
        const n = window.location.href.search("id");

        let carID = "";
        
        if (n !== -1){
            // this is the plate of the car which route is being defined
            carID = window.location.href.substring(n + 3, n + 6);
            console.log(carID)
        }

        // Here we transform every state data that is related to the route that is being saved to a json
        let item, route = [];
        
        // Initial lotation
        route = [[parseFloat(this.state.initialLocationLong), parseFloat(this.state.initialLocationLat)]];
        
        // Stops
        for (let i = 0; i < this.state.vehicleStops.length; i++) {
            item = [parseFloat(this.state.vehicleStops[i].longitude), parseFloat(this.state.vehicleStops[i].latitude)];
            route.push(item);
        }
        
        // Final location
        route.push([parseFloat(this.state.finalLocationLong), parseFloat(this.state.finalLocationLat)]);

        // now we transform that json to a string
        const jsonString = JSON.stringify(route)

        const finalRoute = {
            "route": {
                "type": "Text",
                "value": jsonString
            }
        }

        const headers = {
            headers : {         
                        'fiware-servicepath' : '/',
                        'fiware-service' : 'openiot'
                        }
        }

        API.patch(`/v2/entities/` + carID + '/attrs', finalRoute, headers)
            .then(
                message.success('Rotas adicionadas com sucesso!', 5)
            ).catch((err)=>{
                console.log(err);
                message.error('Erro ao adicionar as rotas!', 5);
        })
    } 

    insertString = (str, index, value) => {
        return str.substr(0, index) + value + str.substr(index);
    }

    updateStopLongitude = (e) => {
        this.setState(({
            stopLongitude: e.target.value
        }));
    }

    updateStopLatitude = (e) => {
        this.setState(({
            stopLatitude: e.target.value
        }));
    }

    areFieldsEmpty = () => {
        return !(this.state.initialLocationLong !== "" && this.state.finalLocationLong !== "" &&
        this.state.initialLocationLat !== "" && this.state.finalLocationLat !== "")
    }

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

    getDate = (date) => new Date(date).toLocaleDateString();

    render(){
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;
        const initialLocationLong = isFieldTouched('initialLocationLong') && getFieldError('initialLocationLong');
        const initialLocationLat = isFieldTouched('initialLocationLat') && getFieldError('initialLocationLat');   
        const finalLocationLong = isFieldTouched('finalLocationLong') && getFieldError('finalLocationLong');
        const finalLocationLat = isFieldTouched('finalLocationLat') && getFieldError('finalLocationLat');

        const columns = [
            {
                title: 'Local de partida',
                dataIndex: 'initialLocation',
                key: 'initialLocation',
                onFilter: (value, record) => record.initialLocation.indexOf(value) === 0,
                sorter: (a, b) =>  { return a.initialLocation.localeCompare(b.initialLocation)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('initialLocation')
            },
            {
                title: 'Local de destino',
                dataIndex: 'finalLocation',
                key: 'finalLocation',
                onFilter: (value, record) => record.finalLocation.indexOf(value) === 0,
                sorter: (a, b) =>  { return a.finalLocation.localeCompare(b.finalLocation)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('finalLocation')
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

        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={9} style={{margin: "5%"}}>
                            <Form.Item label="Local de partida">
                                <Col span={11} style={{margin: "2%"}}>
                                    <Form.Item label="Longitude" validateStatus={initialLocationLong ? 'error' : ''} help={initialLocationLong || ''}>
                                        {getFieldDecorator("initialLocationLong", {
                                            initialValue: this.state.initialLocationLong,
                                            rules: [
                                                { required: true, message: "Insira a longitude da partida!" }
                                            ]
                                            })(
                                            <Input
                                                placeholder="Longitude da partida"
                                                onChange={this.updateInitialLocationLong}
                                                allowClear={true}
                                            />
                                            )}
                                    </Form.Item>
                                </Col>
                                <Col span={11} style={{margin: "2%"}}>
                                    <Form.Item label="Latitude" validateStatus={initialLocationLat ? 'error' : ''} help={initialLocationLat || ''}>
                                        {getFieldDecorator("initialLocationLat", {
                                            initialValue: this.state.initialLocationLat,
                                            rules: [
                                                { required: true, message: "Insira a latitude da partida!" }
                                            ]
                                            })(
                                            <Input
                                                placeholder="Latitude da partida"
                                                onChange={this.updateInitialLocationLat}
                                                allowClear={true}
                                            />
                                            )}
                                    </Form.Item>
                                </Col>
                            </Form.Item>
                        </Col>
                        <Col span={9} style={{margin: "5%"}}>
                            <Form.Item label="Local de destino">
                                <Col span={11} style={{margin: "2%"}}>
                                    <Form.Item label="Longitude" validateStatus={finalLocationLong ? 'error' : ''} help={finalLocationLong || ''}>
                                        {getFieldDecorator("finalLocationLong", {
                                        initialValue: this.state.finalLocationLong,
                                        rules: [
                                            { required: true, message: "Insira a longitude de destino!" }
                                        ]
                                        })(
                                        <Input
                                            placeholder="Longitude do destino"
                                            onChange={this.updateFinalLocationLong}
                                            allowClear={true}
                                        />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11} style={{margin: "2%"}}>
                                    <Form.Item label="Latitude" validateStatus={finalLocationLat ? 'error' : ''} help={finalLocationLat || ''}>
                                        {getFieldDecorator("finalLocationLat", {
                                        initialValue: this.state.finalLocationLat,
                                        rules: [
                                            { required: true, message: "Insira a latitude do destino!" }
                                        ]
                                        })(
                                        <Input
                                            placeholder="Latitude do destino"
                                            onChange={this.updateFinalLocationLat}
                                            allowClear={true}
                                        />
                                        )}
                                    </Form.Item>
                                </Col>                                
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{marginLeft: "50px"}}>
                        <Col span={5} style={{margin: "5px"}}>
                            <Form.Item label="Longitude">
                                <Input
                                    placeholder="Longitude da parada."
                                    onChange={this.updateStopLongitude}
                                    allowClear={true}
                                    value={this.state.stopLongitude}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={5} style={{margin: "5px"}}>
                            <Form.Item label="Latitude">
                                <Input
                                    placeholder="Latitude da parada."
                                    onChange={this.updateStopLatitude}
                                    allowClear={true}
                                    value={this.state.stopLatitude}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={5} style={{margin: "5px", marginTop: "42px"}}>
                            <Form.Item >
                                <Button
                                    onClick={this.handleAdd}
                                    type="primary"
                                    style={{
                                        marginBottom: 16
                                    }}
                                >
                                    Adicionar Parada
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row style={{marginLeft: "50px"}}>
                        <Table
                            bordered
                            dataSource={this.state.vehicleStops}
                            columns={this.stopsColumns}
                        />
                    </Row>

                    <Row style={{marginLeft: "49%"}}>
                        <Form.Item >
                            <Button 
                                type="primary" 
                                onClick={this.saveRoute}
                                disabled={hasErrors(getFieldsError()) || this.areFieldsEmpty()}
                            >
                                Salvar
                            </Button>
                        </Form.Item>
                    </Row>

                    <Row style={{margin: "1%"}}>
                        <Collapse /*onChange={callback}*/>
                            <Panel header={<Title level={4}>Histórico de rotas</Title>} key="1">
                                <Table 
                                    style = {{margin: '25px'}}
                                    bordered = {true}
                                    size="middle"
                                    columns={columns} 
                                    dataSource={this.state.routesData}
                                    pagination={{ 
                                    pageSizeOptions: ["5", "10", "15", "20"],
                                    showSizeChanger: true,
                                    }} 
                                />
                            </Panel>
                        </Collapse>           
                    </Row>
                </Form>
            </>
        );
    }
}

export default Form.create()(Driver);