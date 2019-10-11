const columns = [
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
      width: '30%',
      //...this.getColumnSearchProps('placa'),
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
      width: '20%',
      //...this.getColumnSearchProps('modelo'),
    },
    {
      title: 'Fabricante',
      dataIndex: 'fabricante',
      key: 'fabricante',
      //...this.getColumnSearchProps('fabricante'),
    },
    {
        title: 'Data da última revisão',
        dataIndex: 'datarevisao',
        key: 'datarevisao',
        //...this.getColumnSearchProps('datarevisao'),
    },
    {
        title: 'Departamento',
        dataIndex: 'departamento',
        key: 'departamento',
        //...this.getColumnSearchProps('departamento'),
    },
  ];

  export default columns;