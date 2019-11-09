import React from "react";
import {Doughnut, Bar} from "react-chartjs-2";
import { Row, Col, Card } from 'antd';
import VehicleData from '../FakeData/DataTableData'

const pieData = {
	labels: [
		'Operando',
    'Manuntenção',
    'Quebrado',
    'Sem dados'
	],
	datasets: [{
		data: [],
		backgroundColor: [
		'#008000',
    '#FFFF00',
    '#FF0000',
    '#808080'
		],
		hoverBackgroundColor: [
		'#008000',
    '#FFFF00',
    '#FF0000',
    '#808080'
		]
	}]
};

const barData = {
  labels: [],
  datasets: [
    {
      backgroundColor: '#a5a529',
      borderColor: '#a5a535',
      borderWidth: 1,
      hoverBackgroundColor: '#ffff00',
      hoverBorderColor: '#ffff2d',
      data: [80, 25, 30]
    }
  ]
};

function getData(){
  let i, j, operating = 0, broken = 0, maintenance = 0, unknown = 0;

  for (i=0; i < VehicleData.length; i++){
    if (VehicleData[i].placa.length > 1){
      for (j=1; j<VehicleData[i].placa.length; j++){
        if (VehicleData[i].placa[j] === 'Operando')
        {
          operating += 1;
        }
        else if (VehicleData[i].placa[j] === 'Manuntenção')
        {
          maintenance += 1;
        }
        else if (VehicleData[i].placa[j] === 'Quebrado')
        {
          broken += 1;
        }
      }
    }
    else{
      unknown += 1;
    }

    if (!barData.labels.includes(VehicleData[i].departamento)){
      barData.labels.push(VehicleData[i].departamento);
    }
  }

  pieData.datasets[0].data.push(operating);
  pieData.datasets[0].data.push(maintenance);
  pieData.datasets[0].data.push(broken);
  pieData.datasets[0].data.push(unknown);
  
}

function Statistics(){
  
  if (pieData.datasets[0].data.length === 0)
  {
    getData();
  }
    
  return( 
   <div>
     <Row>
      <Col span={8}>
        <Card title="Estatísticas" bordered={true}>
          <p>Quantidade de veículos: {VehicleData.length} </p>
          <p>Consumo médio total estimado: 9,5 Km/L</p>
          <p>Total de kilometros percorridos: 2365,12 Km</p>
          <p>Custo total estimado: R$965,87 </p>
        </Card>     
      </Col>
      <Col span={8}>
        <Card title="Estado de operação" bordered={true}>
          <Doughnut data={pieData} options={{
            responsive: true,
            maintainAspectRatio: true,
          }}       
          />
        </Card>    
      </Col>
      <Col span={8}>
        <Card title="Consumo médio na semana (L)" bordered={true}>
          <Bar
            data={barData}
            
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              }
            }}
          />
        </Card>
      </Col>
    </Row>
  </div>
    )}

export default Statistics;
