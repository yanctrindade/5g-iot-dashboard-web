import React from "react";
import { Tag, Icon } from 'antd';
import { Link } from "react-router-dom";

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
    dataIndex: 'model',
    key: 'model',
    align: "center",
    onFilter: (value, record) => record.model.indexOf(value) === 0,
    sorter: (a, b) =>  { return a.model.localeCompare(b.model)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Fabricante',
    dataIndex: 'manufacture',
    key: 'manufacture',
    align: "center",
    onFilter: (value, record) => record.manufacture.indexOf(value) === 0,
    sorter: (a, b) => { return a.manufacture.localeCompare(b.manufacture)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Data da última Manuntenção',
    dataIndex: 'lastMaintenceDate',
    key: 'revisao',
    align: "center",
    onFilter: (value, record) => record.lastMaintenceDate.indexOf(value) === 0,
    sorter: (a, b) => { return compareDates(a.lastMaintenceDate, b.lastMaintenceDate)},
    sortDirections: ['descend', 'ascend'],
    renderIcon:  (record) =>
        <Link to={'/vehicles/maintenceHistory?plate='  + record.plate[0].replace(" ", "")} style={{position: "relative", left: "15px"}}>
          <Icon type="unordered-list" />
        </Link>
  },
  {
    title: 'Departamento',
    dataIndex: 'departament',
    key: 'departament',
    align: "center",
    onFilter: (value, record) => record.departament.indexOf(value) === 0,
    sorter: (a, b) => { return a.departament.localeCompare(b.departament)},
    sortDirections: ['descend', 'ascend'],
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
];

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
