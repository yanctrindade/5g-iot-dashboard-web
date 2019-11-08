import React, { Component } from "react";
import { Card } from 'antd';

class StatisticsCard extends Component {
    state = {
      searchText: '',
    };

    render(){
        return(        
            <Card title="Estatísticas" bordered={true}>
                <p>Quantidade de veículos: {this.props.allVehicles} </p>
                <p>Consumo médio total estimado: {this.props.averageConsumption} Km/L</p>
                <p>Total de kilometros percorridos: {this.props.totalTraveled} Km</p>
                <p>Custo total estimado: R${this.props.averageCost} </p>
            </Card>     
        )
    }
}
export default StatisticsCard;