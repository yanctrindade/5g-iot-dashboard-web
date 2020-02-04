import React, { Component } from "react";
import { Table, Select, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

const { Option } = Select;

class DriverManager extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                        users: [], 
                        VehicleData: [],
                        searchText: '',
                     };
      }

    componentDidMount() {
        axios.get('./users.json')
        .then((res)=>{
            this.setState({users: res.data});
        }).catch((err)=>{
            console.log(err);
        })

        axios.get('./database.json')
        .then((res)=>{
        this.setState({VehicleData: res.data});
        }).catch((err)=>{
        console.log(err);
        })
    }

    updateDriver = (driver, plate) => {
        console.log("Selected driver: ");
        console.log(driver);
        console.log("Driver car: ");
        plate !== undefined ? console.log(plate) : console.log("Nenhum selecionado");
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Buscar ${dataIndex.charAt(0).toUpperCase() + dataIndex.slice(1)}`}
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
        const columns = [
            {
              title: 'Motoristas',
              dataIndex: 'name',
              key: 'name',
              onFilter: (value, record) => record.name.indexOf(value) === 0,
              sorter: (a, b) =>  { return a.name.localeCompare(b.name)},
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps('name')
            },
            {
                title: 'Carro',
                key: 'associatedPlate',
                render: (record) => 
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Selecionar Placa"
                        optionFilterProp="children"
                        allowClear={true}
                        onChange={(plate) => this.updateDriver(record.name, plate)}
                        defaultValue = {String(record.associatedPlate) !== "" ? String(record.associatedPlate) : undefined}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.VehicleData.map(item => <Option value={item.plate} key={item.key}>{item.plate}</Option>)}
                    </Select>
            }
        ];
        
        return (
            <Table 
                style = {{margin: '25px'}}
                bordered = {true}
                size="middle"
                columns={columns} 
                dataSource={this.state.users.filter(
                                                    function(item) {
                                                        if (item.isAdmin) {
                                                            return false; // skip
                                                        }
                                                        return true;
                                                    })} 
                pagination={{ 
                pageSizeOptions: ["5", "10", "15", "20"],
                showSizeChanger: true,
                }} 
            />
        );
    }
}

export default DriverManager;