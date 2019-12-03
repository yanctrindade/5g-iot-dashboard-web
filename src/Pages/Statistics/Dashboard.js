import React,{Component} from "react";
import {Doughnut, HorizontalBar, Line, Pie, Bar} from "react-chartjs-2";
import { Row, Col, Card } from 'antd';

const doughnutData = {
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

const horizontalBarData = {
  labels: [],
  datasets: [
    {
      backgroundColor: '#0000ff',
      borderColor: '#0000ff',
      borderWidth: 1,
      hoverBackgroundColor: '#004fff',
      hoverBorderColor: '#004fff',
      data: [80, 25, 30]
    }
  ]
};

const barData = {
  labels: ['ENE', 'CIC', 'Reitoria'],
  datasets: [
    {
      backgroundColor: '#008000',
      borderColor: '#008000',
      borderWidth: 1,
      hoverBackgroundColor: '#005400',
      hoverBorderColor: '#005400',
      data: [20, 25, 30]
    }
  ]
};

const lineData = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  datasets: [
    {
      label: 'Km/Mês',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [650, 590, 800, 810, 560, 550, 400, 930, 653, 300, 574, 460]
    }
  ]
};

const pieData = {
	labels: [
		'Ciência da Computação',
		'Reitoria',
		'Engenharia Elétrica'
	],
	datasets: [{
		data: [3, 5, 1],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class Dashboard extends Component{

getData(){
  let i, j, operating = 0, broken = 0, maintenance = 0, unknown = 0;

  for (i=0; i < this.props.vehicleData.length; i++){
    if (this.props.vehicleData[i].plate.length > 1){
      for (j=1; j<this.props.vehicleData[i].plate.length; j++){
        if (this.props.vehicleData[i].plate[j] === 'Operando')
        {
          operating += 1;
        }
        else if (this.props.vehicleData[i].plate[j] === 'Manuntenção')
        {
          maintenance += 1;
        }
        else if (this.props.vehicleData[i].plate[j] === 'Quebrado')
        {
          broken += 1;
        }
      }
    }
    else{
      unknown += 1;
    }

    if (!horizontalBarData.labels.includes(this.props.vehicleData[i].departament)){
      horizontalBarData.labels.push(this.props.vehicleData[i].departament);
    }
  }

  doughnutData.datasets[0].data.push(operating);
  doughnutData.datasets[0].data.push(maintenance);
  doughnutData.datasets[0].data.push(broken);
  doughnutData.datasets[0].data.push(unknown);
  
}

render(){
  
  if (doughnutData.datasets[0].data.length === 0)
  {
    this.getData();
  }
    
  return( 
   <div>
     <Row>
      <Col span={8}>
        <Card title="Estatísticas" bordered={true} style={{height: 270}} >
          <p>Quantidade de veículos: {this.props.vehicleData.length} </p>
          <p>Consumo médio total estimado: 9,5 Km/L</p>
          <p>Total de kilometros percorridos: 2365,12 Km</p>
          <p>Custo total estimado: R$965,87 </p>
        </Card>     
      </Col>
      <Col span={8}>
        <Card title="Estado de operação" bordered={true} style={{height: 270}} >
          <Doughnut data={doughnutData} options={{
            responsive: true,
            maintainAspectRatio: true,
          }}       
          />
        </Card>    
      </Col>
      <Col span={8}>
        <Card title="Distância média percorrida na semana (Km)" bordered={true} style={{height: 270}} >
          <HorizontalBar
            data={horizontalBarData}
            
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
    <Row>
      <Col span={8}>
        <Card title="Distância total percorrida em cada mês" bordered={true} style={{height: 270}} >
          <Line data={lineData} options={{
            responsive: true,
            maintainAspectRatio: true,
          }}       
          />
        </Card>     
      </Col>
      <Col span={8}>
        <Card title="Quantidade de carros por departament" bordered={true} style={{height: 270}} >
          <Pie data={pieData} options={{
            responsive: true,
            maintainAspectRatio: true,
          }}       
          />
        </Card>    
      </Col>
      <Col span={8}>
        <Card title="Consumo médio estimado na semana (L)" bordered={true} style={{height: 270}} >
          <Bar
            data={barData}
            
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }}
          />
        </Card>
      </Col>
    </Row>
  </div>
    )}
}
export default Dashboard;