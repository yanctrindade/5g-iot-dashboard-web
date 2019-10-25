import React, { Component } from "react";
import { Card } from 'antd';

class StatisticsCard extends Component {
    state = {
      searchText: '',
    };

    render(){
        return(        
            <Card title="Estatísticas" bordered={true}>
                <p>Quantidade de veículos</p>
                <p>Consumo estimado médio</p>
                <p>Custo total</p>
            </Card>     
        )
    }
}
export default StatisticsCard;