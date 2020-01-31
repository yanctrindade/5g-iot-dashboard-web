import React, { Component } from "react";
import { Table, Select } from 'antd';

const { Option } = Select;

const columns = [
    {
      title: 'Motoristas',
      dataIndex: 'title',
    },
    {
        title: 'Carro',
        render: (record) => 
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Selecionar Placa"
                optionFilterProp="children"
                allowClear={true}
                //defaultValue = "PAM 9846"
                //onChange={onChange}
                //onFocus={onFocus}
                //onBlur={onBlur}
                //onSearch={onSearch}
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="PAM 9846">PAM 9846</Option>
                <Option value="PJK 9126">PJK 9126</Option>
                <Option value="PAM 8272">PAM 8272</Option>
            </Select>
    }
];

const data = [
    {
        key: '1',
        title: 'João Alberto de Souza',
        plate: 'PAM 9846'
    },
];

class DriverManager extends Component {
    render(){
        return (
            <Table 
                style = {{margin: '25px'}}
                bordered = {true}
                size="middle"
                columns={columns} dataSource={data} 
                pagination={{ 
                pageSizeOptions: ["5", "10", "15", "20"],
                showSizeChanger: true,
                }} 
            />
        );
    }
}

export default DriverManager;