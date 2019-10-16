import React from "react";
import DataTable from "./DataTable.js"
import FakeData from '../FakeData/DataTableData'
import FakeColumns from '../FakeData/DataTableColumns'

function Vehicles(props) {
  return <div>
    <h1>Veículos</h1>
    <DataTable columns={FakeColumns} data={FakeData} showStatistics='True'/>
  </div>
  
}

export default Vehicles;
