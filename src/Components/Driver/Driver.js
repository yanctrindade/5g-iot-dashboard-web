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
            Icon } from 'antd';

import Highlighter from 'react-highlight-words';

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
                        initialLocation: "",
                        finalLocation: "",
                        isOnRoute: false,
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

    updateInitialLocation = (e) => {
        this.setState(({
            initialLocation: e.target.value
        }));
    }

    updateFinalLocation = (e) => {
        this.setState(({
            finalLocation: e.target.value
        }));
    }

    updateIsOnRoute = () => {
        this.setState(prevState => ({
            isOnRoute: !prevState.isOnRoute
        }));
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
        return !(this.state.initialLocation !== "" && this.state.finalLocation !== "")
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
        const initialLocation = isFieldTouched('initialLocation') && getFieldError('initialLocation');   
        const finalLocation = isFieldTouched('finalLocation') && getFieldError('finalLocation');

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
                            <Form.Item label="Local de partida" validateStatus={initialLocation ? 'error' : ''} help={initialLocation || ''}>
                                {getFieldDecorator("initialLocation", {
                                    initialValue: this.state.initialLocation,
                                    rules: [
                                        { required: true, message: "Insira o local de partida!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Local de partida"
                                        onChange={this.updateInitialLocation}
                                        allowClear={true}
                                        disabled={this.state.isOnRoute}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={9} style={{margin: "5%"}}>
                            <Form.Item label="Local de destino" validateStatus={finalLocation ? 'error' : ''} help={finalLocation || ''}>
                                {getFieldDecorator("finalLocation", {
                                    initialValue: this.state.finalLocation,
                                    rules: [
                                        { required: true, message: "Insira o local de destino!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Local de destino"
                                        onChange={this.updateFinalLocation}
                                        allowClear={true}
                                        disabled={this.state.isOnRoute}
                                    />
                                    )}
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
                                    disabled={this.state.isOnRoute}
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
                                    disabled={this.state.isOnRoute}
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
                                    disabled={this.state.isOnRoute}
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

                    <Row style={{marginLeft: "38%"}}>
                        <Form.Item >
                            <Row>
                                <Col span={5}>                                
                                    <Button 
                                        type="danger"
                                        onClick={this.updateIsOnRoute}
                                        disabled={!this.state.isOnRoute}
                                    >
                                        Finalizar
                                    </Button>
                                </Col>
                                <Col span={5}>      
                                    <Button 
                                        type="primary" 
                                        onClick={this.updateIsOnRoute}
                                        disabled={hasErrors(getFieldsError()) || this.areFieldsEmpty() || this.state.isOnRoute}
                                    >
                                        Iniciar
                                    </Button>
                                </Col>
                            </Row>
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