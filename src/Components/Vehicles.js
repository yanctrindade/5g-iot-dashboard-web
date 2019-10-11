import React from "react";
import DataTable from "./DataTable.js"
import FakeData from '../FakeData/DataTableData'
import FakeColumns from '../FakeData/DataTableColumns'

function Vehicles(props) {
  return <DataTable data={FakeData} columns={FakeColumns}/>;
}

export default Vehicles;
