import React, { Component } from "react";
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import VehicleStatistics from './VehicleStatistics'
import DataColumns from './DataTableColumns';
import axios from 'axios';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
                  VehicleData: [],
                  searchText: '',
                 };
  }

  componentDidMount() {
    axios.get('./database.json')
    .then((res)=>{
      this.setState({VehicleData: this.dataFilter(res.data)});
    }).catch((err)=>{
      console.log(err);
    })
  }

  getColumnSearchProps = (dataIndex, cellRender) => ({
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
    render: text => {
      const hasCellRender = (typeof cellRender !== "undefined")
      const cellText = typeof text === "string" ? text : text[0]
      const cellElementes = text.slice(1)
      return  (
        <>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={cellText.toString()}
          />
          <>
          {hasCellRender ? cellRender(cellElementes) : <></>}
          </>
        </>
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

  dataFilter = (data) => {
      data.map(item => {
        item.nextMaintenceDate = this.getDate(item.nextMaintenceDate)
        item.plate = [item.plate].concat(item.tags)
        return item
      })

    return data
  }

  render() {    
    const columns = DataColumns.map(item => (item.title !== "Editar" ? {...item, ...this.getColumnSearchProps(item.dataIndex, item.cellRender)} : item))

    return (
      <Table 
          columns={columns} dataSource={this.state.VehicleData} 
          expandedRowRender={record => <VehicleStatistics style={{ margin: 0 }} {...record} />}
          pagination={{ 
            pageSizeOptions: ["5", "10", "15", "20"],
            showSizeChanger: true,
          }} 
        />);
  }
}

export default DataTable;