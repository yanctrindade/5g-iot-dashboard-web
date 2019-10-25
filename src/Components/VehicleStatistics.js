import React from "react";
import { Row, Col } from 'antd';

function VehicleStatistics(statistics) {
    if (statistics !== undefined && Object.keys(statistics).length !== 1)
    {
        return <div>
        <Row>
          <Col span={10}>
            <p>Última viagem: {statistics.lastTrip} km</p>
          </Col>
          <Col span={10}>
            <p>Próxima manuntenção: {statistics.nextRevision}</p>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <p>Total percorrido na semana: {statistics.traveledWeek} km</p>
          </Col>
          <Col span={10}>
            <p>Quantidade de rotas feitas na semana: {statistics.NumRoutesWeek}</p>
          </Col>
        </Row>
      </div>
    }
    else{
        return <p>Nenhuma estatística desse veículo foi encontrada!</p>
    }
}

export default VehicleStatistics;