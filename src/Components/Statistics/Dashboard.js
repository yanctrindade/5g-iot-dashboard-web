import React,{Component} from "react";
import {Doughnut, HorizontalBar, Line, Pie, Bar} from "react-chartjs-2";
import { Row, Col, Card } from 'antd';
import tinygradient from 'tinygradient';
import axios from 'axios';

const statistics = {
  vehicleCount: 0,
  totalMileage: 0,
  averageFuelEconomy: 0,
}

const doughnutData = {
	labels: [
		'Operando',
    'Manuntenção',
    'Quebrado'
	],
	datasets: [{
		data: [0, 0, 0],
		backgroundColor: [
		'#34eb52',
    '#f9ff3d',
    '#fc3232'
		],
		hoverBackgroundColor: [
		'#34eb52',
    '#f9ff3d',
    '#fc3232'
		]
	}]
};

const horizontalBarData = {
  labels: [],
  datasets: [
    {
      backgroundColor: '#268bff',
      borderColor: '#268bff',
      borderWidth: 1,
      hoverBackgroundColor: '#004fff',
      hoverBorderColor: '#004fff',
      data: []
    }
  ]
};

const barData = {
  labels: [],
  datasets: [
    {
      backgroundColor: '#34eb52',
      borderColor: '#34eb52',
      borderWidth: 1,
      hoverBackgroundColor: '#00ff2f',
      hoverBorderColor: '#00ff2f',
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
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
};

class Dashboard extends Component{

constructor(props) {
  super(props);
  this.state = { VehicleData: [] };
}

componentDidMount() {

  axios.get('./database.json')
  .then((res)=>{
    this.handleData(res.data);    
    this.setState({VehicleData: res.data});
  }).catch((err)=>{
    console.log(err);
  })
}

eraseDashboardData(){
  doughnutData.datasets[0].data = [0, 0, 0];
  statistics.totalMileage = 0;
  statistics.totalMileage = 0;
  statistics.averageFuelEconomy = 0;
  doughnutData.datasets[0].data = [0, 0, 0];
  horizontalBarData.labels = [];
  horizontalBarData.datasets[0].data = [];
  barData.labels = [];
  pieData.labels = [];
  pieData.datasets[0].data = [];
  pieData.datasets[0].backgroundColor = [];
  pieData.datasets[0].hoverBackgroundColor = [];
}

handleData = (data) => {
  let i, j, k;

  // Erasing all data from dashboard
  this.eraseDashboardData();

  // Iterating on every car
  for (i=0; i < data.length; i++){
      // Iterating on every tag label
      for (j=0; j<data[i].tags.length; j++){
        if (data[i].tags[j] === 'Operando')
        {
          doughnutData.datasets[0].data[0] += 1;
        }
        else if (data[i].tags[j] === 'Manuntenção')
        {
          doughnutData.datasets[0].data[1] += 1;
        }
        else if (data[i].tags[j] === 'Quebrado')
        {
          doughnutData.datasets[0].data[2] += 1;
        }
    }

    // Add to the total mileage statistics counter
    statistics.totalMileage += data[i].statistics.mileage;

    // Add to the average fuel economy the total of km/L of every vehicle
    statistics.averageFuelEconomy += data[i].averageFuelEconomy;

    // Add departament to horizontal bar graph
    if (!horizontalBarData.labels.includes(data[i].departament)){
      horizontalBarData.labels.push(data[i].departament);
      horizontalBarData.datasets[0].data.push(0);
    }

    // Ads to horizontal bar the average distance data according to the departament
    for (k = 0; k < horizontalBarData.labels.length; k++)
    {
      if (data[i].departament === horizontalBarData.labels[k])
      {
        horizontalBarData.datasets[0].data[k] += data[i].statistics.traveledWeek;
      }
    }

    // Add departament to vertical bar graph
    if (!barData.labels.includes(data[i].departament)){
      barData.labels.push(data[i].departament);
    }

    // Add departament to the pie graph
    if (!pieData.labels.includes(data[i].departament)){
      pieData.labels.push(data[i].departament);
      pieData.datasets[0].data.push(0);
    }

    // Ads to pie graph the total number of cars each departament has
    for (k = 0; k < pieData.labels.length; k++)
    {
      if (data[i].departament === pieData.labels[k])
      {
        pieData.datasets[0].data[k] += 1;
      }
    }
  }

  // Set pieData backgroundColor and hoverBackgroundColor colors
  pieData.datasets[0].backgroundColor = tinygradient('red', 'green', 'blue').rgb(pieData.labels.length).map(color => color.toHexString());
  pieData.datasets[0].hoverBackgroundColor = pieData.datasets[0].backgroundColor;

  // Write acquired statistics to their respective object
  statistics.vehicleCount = data.length;
  statistics.averageFuelEconomy = (statistics.averageFuelEconomy / statistics.vehicleCount);
}

render(){    
  return( 
   <div>
     <Row>
      <Col span={8}>
        <Card title="Estatísticas" bordered={true} style={{height: 270}} >
          <p>Quantidade de veículos: {statistics.vehicleCount} </p>
          <p>Consumo médio total estimado: {statistics.averageFuelEconomy} Km/L</p>
          <p>Total de kilometros percorridos: {statistics.totalMileage} Km</p>
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
        <Card title="Quantidade de carros por departamento" bordered={true} style={{height: 270}} >
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
