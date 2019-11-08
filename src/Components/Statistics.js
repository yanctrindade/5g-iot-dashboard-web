import React from "react";
import StatisticsCard from "./StatisticsCard";
import {Pie} from "react-chartjs-2";

const data = {
	labels: [
		'Quebrado',
		'Operando',
    'Em manuntenção',
    'Sem status'
	],
	datasets: [{
		data: [2, 10, 15, 5],
		backgroundColor: [
		'#FF0000',
		'#008000',
    '#FFFF00',
    '#808080'
		],
		hoverBackgroundColor: [
		'#FF0000',
		'#008000',
    '#FFFF00',
    '#808080'
		]
	}]
};

function Statistics(props) {
  

  return <div>
    <StatisticsCard />
    <Pie data={data} options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
        height='50%'
        />
  </div>;
}

export default Statistics;
