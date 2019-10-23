import React from "react";
import { Tag } from 'antd';

const columns = [
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    onFilter: (value, record) => record.placa.indexOf(value) === 0,
    sorter: (a, b) => { return a.placa[0].localeCompare(b.placa[0])},
    sortDirections: ['descend', 'ascend'],  
    render: tags => (
      <span>
        {tags.map(tag => {
          let color;
          if (tag === 'Operando') {
            color = 'green';
          } else if (tag === 'Manuntenção'){
            color = 'yellow';
          } else if (tag === 'Quebrado'){
            color = 'red';
          } else{
            tag += '  ';
            return tag.toUpperCase();
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),  
  },
  {
    title: 'Modelo',
    dataIndex: 'modelo',
    key: 'modelo',
    onFilter: (value, record) => record.modelo.indexOf(value) === 0,
    sorter: (a, b) =>  { return a.modelo.localeCompare(b.modelo)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Fabricante',
    dataIndex: 'fabricante',
    key: 'fabricante',
    onFilter: (value, record) => record.fabricante.indexOf(value) === 0,
    sorter: (a, b) => { return a.fabricante.localeCompare(b.fabricante)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Data da última revisão',
    dataIndex: 'revisão',
    key: 'revisao',
    onFilter: (value, record) => record.revisão.indexOf(value) === 0,
    sorter: (a, b) => { return compareDates(a.revisão, b.revisão)},
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Departamento',
    dataIndex: 'departamento',
    key: 'departamento',
    onFilter: (value, record) => record.departamento.indexOf(value) === 0,
    sorter: (a, b) => { return a.departamento.localeCompare(b.departamento)},
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