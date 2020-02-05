import React, { Component } from "react";
import { Table, Button, Input, Icon, Radio } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

class DriverManager extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                        users: [], 
                        searchText: ''
                     };
      }

    componentDidMount() {
        axios.get('./users.json')
        .then((res)=>{
            this.setState({ users: res.data });
        }).catch((err)=>{
            console.log(err);
        })
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

    changeAccountType = (key) => {
        let newUsers = this.state.users;
        newUsers[key-1].isAdmin = !this.state.users[key-1].isAdmin;

        this.setState(({
            users: newUsers
        }));
    }

    changeAccountState = (key) => {
        let newUsers = this.state.users;
        newUsers[key-1].isApproved = !this.state.users[key-1].isApproved;

        this.setState(({
            users: newUsers
        }));
    }

    deleteAccount = (key) => {
        console.log("Deleting account: ");
        console.log(this.state.users[key-1].userName);
    }

    render(){
        const columns = [
            {
              title: 'Nome',
              dataIndex: 'name',
              key: 'name',
              onFilter: (value, record) => record.name.indexOf(value) === 0,
              sorter: (a, b) =>  { return a.name.localeCompare(b.name)},
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps('name')
            },
            {
                title: 'Usuário',
                dataIndex: 'userName',
                key: 'userName',
                onFilter: (value, record) => record.userName.indexOf(value) === 0,
                sorter: (a, b) =>  { return a.userName.localeCompare(b.userName)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('userName')
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
                onFilter: (value, record) => record.email.indexOf(value) === 0,
                sorter: (a, b) =>  { return a.email.localeCompare(b.email)},
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('email')
            },
            {
                title: 'Tipo de conta',
                key: 'isAdmin',
                align: "center",
                render: (record) => 
                <div style={{ textAlign: "center" }}>
                    <Radio.Group value={String(record.isAdmin)} onChange={() => {this.changeAccountType(record.key)}} >
                        <Radio.Button value="true">Administrador</Radio.Button>
                        <Radio.Button value="false">Motorista</Radio.Button>
                    </Radio.Group>
                </div>
            },
            {
                title: 'Acesso a conta',
                key: 'state',
                align: "center",
                render: (record) => 
                <div style={{ textAlign: "center" }}>
                    {record.isApproved ? 
                        <Button type="danger" onClick={() => {this.changeAccountState(record.key)}} >Desativar</Button> :
                        <Button type="primary" onClick={() => {this.changeAccountState(record.key)}}>Ativar</Button>
                    }
                </div>
            },
            {
                title: 'Deletar',
                key: 'delete',
                align: "center",
                render: (record) => 
                <div style={{ textAlign: "center" }}>
                    <Button 
                        type="dashed" 
                        shape="circle" 
                        icon="delete" 
                        onClick={() => {this.deleteAccount(record.key)}} 
                    />
                </div>
            }
        ];
        
        return (
            <Table 
                style = {{margin: '25px'}}
                bordered = {true}
                size="middle"
                columns={columns} 
                dataSource={this.state.users} 
                pagination={{ 
                pageSizeOptions: ["5", "10", "15", "20"],
                showSizeChanger: true,
                }} 
            />
        );
    }
}

export default DriverManager;