import React, { Component } from "react";
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import VehicleStatistics from './VehicleStatistics'

class DataTable extends Component {
  state = {
    searchText: '',
  };

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

  render() {    
    
    const columns = this.props.columns.map(item => ({...item, ...this.getColumnSearchProps(item.dataIndex, item.cellRender)}))

    // Because of ANTD 'componentWillReceiveProps has been renamed' warning, 
    // while they don't update their package, this is used to hide the warning.
    ///////////////////////////////////////////////////////////////////////////
    const doWarn = window.console.warn
    window.console.warn = (...args) => {
      if(typeof args[0] !== 'string' || !args[0].startsWith('Warning: componentWillReceiveProps has been renamed'))
        doWarn(...args)
    }
    ///////////////////////////////////////////////////////////////////////////

    return <Table 
              columns={columns} dataSource={this.props.data} 
              expandedRowRender={record => <VehicleStatistics style={{ margin: 0 }} {...record.statistics} />}
              pagination={{ 
                pageSizeOptions: ["5", "10", "15", "20"],
                showSizeChanger: true,
              }}
            />;
  }
}

export default DataTable;