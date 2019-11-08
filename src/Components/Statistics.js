import React from "react";
import StatisticsCard from "./StatisticsCard";
import {Pie, Bar} from "react-chartjs-2";
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
  labels: ['Reitoria', 'CIC', 'ENE'],
  datasets: [
    {
      label: 'Consumo médio na semana (L)',
      backgroundColor: '#a5a529',
      borderColor: '#a5a535',
      borderWidth: 1,
      hoverBackgroundColor: '#ffff00',
      hoverBorderColor: '#ffff2d',
      data: [80, 25, 30]
    }
  ]
};

let operating, broken, maintenance, unknown;

function getData(){
  let i, j;
  operating = 0;
  broken = 0;
  maintenance = 0;
  unknown = 0;

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
    <StatisticsCard allVehicles={VehicleData.length} averageConsumption='9,5' totalTraveled='2365,12' averageCost='965,87' />
    <p>Estado de operação</p>
    <Pie data={pieData} options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
        
        />
    <Bar
          data={barData}
          
          options={{
            responsive: true,
            maintainAspectRatio: true
          }}
        />
  </div>
    )}

export default Statistics;
