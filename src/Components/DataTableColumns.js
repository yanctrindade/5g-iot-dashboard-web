import React from "react";
import { Tag } from 'antd';

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
    onFilter: (value, record) => record.plate.indexOf(value) === 0,
    sorter: (a, b) => { return a.plate[0].localeCompare(b.plate[0])},
    sortDirections: ['descend', 'ascend'],
    cellRender: tagsFunction, 
  },
  {
    title: 'Modelo',
    dataIndex: 'model',
    key: 'model',
    onFilter: (value, record) => record.model.indexOf(value) === 0,
    sorter: (a, b) =>  { return a.model.localeCompare(b.model)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Fabricante',
    dataIndex: 'manufacture',
    key: 'manufacture',
    onFilter: (value, record) => record.manufacture.indexOf(value) === 0,
    sorter: (a, b) => { return a.manufacture.localeCompare(b.manufacture)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Data da última maintenceDate',
    dataIndex: 'maintenceDate',
    key: 'revisao',
    onFilter: (value, record) => record.maintenceDate.indexOf(value) === 0,
    sorter: (a, b) => { return compareDates(a.maintenceDate, b.maintenceDate)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Departamento',
    dataIndex: 'departament',
    key: 'departament',
    onFilter: (value, record) => record.departament.indexOf(value) === 0,
    sorter: (a, b) => { return a.departament.localeCompare(b.departament)},
    sortDirections: ['descend', 'ascend'],
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
