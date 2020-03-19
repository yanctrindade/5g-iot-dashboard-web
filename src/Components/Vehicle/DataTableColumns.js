import React from "react";
import { Tag, Icon, message, Button } from 'antd';
import { Link } from "react-router-dom";
import API from "../../api/fiware";

const tagsFunction = tags => (
  <span>
    {tags.map(tag => {
      const styles = {
        float : 'right'
      };
      let color;
      if (tag === 'Operando') {
        color = 'green';
      } else if (tag === 'Manuntenção'){
        color = 'yellow';
      } else if (tag === 'Quebrado'){
        color = 'red';
      } else{
        return console.log('tag not found');
      }

      return (
        <Tag color={color} key={tag} style={styles}>
          {tag.toUpperCase()}
        </Tag>
      );
    })}
  </span>
);

const columns = [
  {
    title: 'Placa',
    dataIndex: 'plate',
    key: 'plate',
    align: "center",
    onFilter: (value, record) => record.plate.indexOf(value) === 0,
    sorter: (a, b) => { return a.plate[0].localeCompare(b.plate[0])},
    sortDirections: ['descend', 'ascend'],
    cellRender: tagsFunction, 
  },
  {
    title: 'Modelo',
    dataIndex: 'carModel',
    key: 'carModel',
    align: "center",
    onFilter: (value, record) => record.carModel.indexOf(value) === 0,
    sorter: (a, b) =>  { return a.carModel.localeCompare(b.carModel)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Fabricante',
    dataIndex: 'carBrand',
    key: 'carBrand',
    align: "center",
    onFilter: (value, record) => record.carBrand.indexOf(value) === 0,
    sorter: (a, b) => { return a.carBrand.localeCompare(b.carBrand)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Data da última Manuntenção',
    dataIndex: 'lastMaintenance',
    key: 'lastMaintenance',
    align: "center",
    onFilter: (value, record) => record.lastMaintenance.indexOf(value) === 0,
    sorter: (a, b) => { return compareDates(a.lastMaintenance, b.lastMaintenance)},
    sortDirections: ['descend', 'ascend'],
    renderIcon:  (record) =>
        <Link to={'/vehicles/maintenceHistory?plate='  + record.plate[0].replace(" ", "")} style={{position: "relative", left: "15px"}}>
          <Icon type="unordered-list" />
        </Link>
  },
  {
    title: 'Departamento',
    dataIndex: 'department',
    key: 'department',
    align: "center",
    onFilter: (value, record) => record.department.indexOf(value) === 0,
    sorter: (a, b) => { return a.department.localeCompare(b.department)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Rotas',
    key: 'routes',
    align: "center",
    render: (record) => 
      <div style={{ textAlign: "center" }}>
        <Link to={'/vehicles/routes?id=' + record.id}>
          <Icon type="swap"/>
        </Link>
      </div>
  },
  {
    title: 'Editar',
    key: 'edit',
    align: "center",
    render: (record) => 
      <div style={{ textAlign: "center" }}>
        <Link to={'/vehicles/edit?plate=' + record.plate[0].replace(" ", "")}>
          <Icon type="edit"/>
        </Link>
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
            onClick={() => {deleteVehicle(record.id)}} 
        />
    </div>
}
];

function deleteVehicle(id){

  const headers = {
    headers : {         
                'fiware-servicepath' : '/',
                'fiware-service' : 'openiot'
                }
  }

  API.delete(`/v2/entities/` + id, headers)
            .then(
                message.success('Deletado!', 5),
                window.location.reload()
            ).catch((err)=>{
                console.log(err);
                message.error('Erro ao deletar!', 5);
            })      
  
  
} 

function compareDates(a, b){
  let dateA = new Date(a);
  let dateB = new Date(b);

  if (dateA > dateB)
    return 1;
  if (dateA < dateB)
    return -1;

  return 0;
}

export default columns;
