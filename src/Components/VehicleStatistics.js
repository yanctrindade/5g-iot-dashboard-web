import React from "react";
import { Row, Col } from 'antd';

function VehicleStatistics(data) {

    if (data.statistics !== undefined && Object.keys(data.statistics).length !== 1)
    {
        return <div>
        <Row>
          <Col span={10}>
            <p>Última viagem: {data.statistics.lastTrip} km</p>
          </Col>
          <Col span={10}>
            <p>Próxima manuntenção: {data.nextMaintenceDate}</p>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <p>Total percorrido na semana: {data.statistics.traveledWeek} km</p>
          </Col>

          <Col span={10}>
            <p>Quantidade de rotas feitas na semana: {data.statistics.NumRoutesWeek}</p>
          </Col>
        </Row>
      </div>
    }
    else{
        return <p>Nenhuma estatística desse veículo foi encontrada!</p>
    }
}

export default VehicleStatistics;


