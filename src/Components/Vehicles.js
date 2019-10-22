import React from "react";
import DataTable from "./DataTable.js"
import FakeData from '../FakeData/DataTableData'
import FakeColumns from '../FakeData/DataTableColumns'

function Vehicles(props) {
  return <div>
    <DataTable columns={FakeColumns} data={FakeData} showStatistics='True'/>
  </div>
  
}

export default Vehicles;
