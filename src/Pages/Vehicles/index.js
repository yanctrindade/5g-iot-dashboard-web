import React from "react";
import NavBar from '../../Components/NavBar'
import DataTable from "../../Components/DataTable.js"
import FakeData from '../../FakeData/DataTableData'
import FakeColumns from '../../FakeData/DataTableColumns'

function Vehicles(props) {
  const content = <DataTable columns={FakeColumns} data={FakeData}/>;
  return <NavBar pathname="/vehicles" content={content}/>
}

export default Vehicles;
