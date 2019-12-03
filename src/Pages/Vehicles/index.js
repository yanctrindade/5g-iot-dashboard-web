import React from "react";
import NavBar from '../../Components/NavBar'
import DataTable from "../../Components/DataTable.js"
import DataColumns from '../../Components/DataTableColumns'
import FakeData from '../../FakeData/DataTableData'

function Vehicles(props) {
  const content = <DataTable columns={DataColumns} data={FakeData}/>;
  return <NavBar pathname="/vehicles" content={content}/>
}

export default Vehicles;
