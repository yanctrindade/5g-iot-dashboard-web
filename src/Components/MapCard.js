import React from "react";
import "../styles.css";
import { Row, Col, Icon } from 'antd';

function  MapCard(props){
    return(
        <div className="MapCard">
            <Row  className="MapCard-title">
                <Icon type="close" id="CloseButton"/>
                <h3>UNB 1234</h3>
                <p>última atualização em 09/09/2019 às 20h35</p>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="Metric-info" id="info-left">120<span className="Metric">km/h</span></div>
                    <div className="Info-tag">Velocidade Instantânea</div>
                </Col>
                <Col span={12}>
                    <div className="Metric-info" id="info-right">45<span className="Metric">km</span></div>
                    <div className="Info-tag">Distância Percorrida</div>
                </Col>
            </Row>
            <Row style={{padding: '0px 10px 0px 10px'}}>
                <Col span={12} className="Info" style={{fontWeight: 'bold'}}>Saveiro 2.0</Col>
                <Col span={12} className="Info" style={{textAlign: 'right'}}>Volkswagen</Col>
            </Row>
            <Row style={{padding: '0px 10px 0px 10px'}}>
                <Col span={12} className="Info">2015/2016</Col>
                <Col span={12} className="Info" style={{textAlign: 'right'}}>Azul</Col>
            </Row>
            <Row style={{padding: '10px 10px 0px 10px'}}>
                <Col span={18} className="Info" style={{fontSize: '16px'}}>Data da próxima manutenção:</Col>
                <Col span={6} className="Info" style={{textAlign: 'right', fontSize: '16px'}}>25/12/2019</Col>
            </Row>
        </div>
    );
}

export default MapCard;