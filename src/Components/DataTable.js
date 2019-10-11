import React from "react";
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

class DataTable extends React.Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
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
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
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
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {    
    const columns = [
        {
          title: 'Placa',
          dataIndex: 'placa',
          key: 'placa',
          width: '30%',
          ...this.getColumnSearchProps('placa'),
        },
        {
          title: 'Modelo',
          dataIndex: 'modelo',
          key: 'modelo',
          width: '20%',
          ...this.getColumnSearchProps('modelo'),
        },
        {
          title: 'Fabricante',
          dataIndex: 'fabricante',
          key: 'fabricante',
          ...this.getColumnSearchProps('fabricante'),
        },
        {
            title: 'Data da última revisão',
            dataIndex: 'datarevisao',
            key: 'datarevisao',
            ...this.getColumnSearchProps('datarevisao'),
        },
        {
            title: 'Departamento',
            dataIndex: 'departamento',
            key: 'departamento',
            ...this.getColumnSearchProps('departamento'),
        },
      ];
    
    return <Table columns={columns} dataSource={this.props.data} />;
  }
}

export default DataTable;