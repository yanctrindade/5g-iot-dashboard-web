const columns = [
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    onFilter: (value, record) => record.placa.indexOf(value) === 0,
    sorter: (a, b) => { return a.placa.localeCompare(b.placa)},
    sortDirections: ['descend', 'ascend'],
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
    dataIndex: 'datarevisao',
    key: 'datarevisao',
    onFilter: (value, record) => record.datarevisao.indexOf(value) === 0,
    sorter: (a, b) => { return a.datarevisao.localeCompare(b.datarevisao)},
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

  export default columns;