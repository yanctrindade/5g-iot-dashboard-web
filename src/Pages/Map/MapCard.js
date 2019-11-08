import React from "react";
import "./styles.css";
import { Row, Col, Icon } from 'antd';
import VehicleData from '../../FakeData/MapCardData';

function  MapCard(props){
    const d = VehicleData;
    let updateDate = new Date(d.updateTime).toLocaleDateString();
    let updateTime = new Date(d.updateTime).toLocaleTimeString();
    let maintenceDate = new Date(d.maintenceTime).toLocaleDateString();

    return(
        <div className="MapCard">
            <Row  className="MapCard-title">
                <Icon type="close" id="CloseButton"/>
                <h3>{d.plate}</h3>
                <p>última atualização em {updateDate} às {updateTime}</p>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="Metric-info">
                        {d.speed}<span className="Metric">km/h</span>
                    </div>
                    <div className="Info-tag">Velocidade Instantânea</div>
                </Col>
                <Col span={12}>
                    <div className="Metric-info">
                        {d.distance}<span className="Metric">km</span>
                    </div>
                    <div className="Info-tag">Distância Percorrida</div>
                </Col>
            </Row>
            <Row style={{padding: '0px 10px 0px 10px'}}>
                <Col span={12} className="Info" style={{fontWeight: 'bold'}}>{d.model}</Col>
                <Col span={12} className="Info" style={{textAlign: 'right'}}>{d.brand}</Col>
            </Row>
            <Row style={{padding: '0px 10px 0px 10px'}}>
                <Col span={12} className="Info">{d.year}</Col>
                <Col span={12} className="Info" style={{textAlign: 'right'}}>{d.color}</Col>
            </Row>
            <Row style={{padding: '10px 10px 0px 10px'}}>
                <Col span={18} className="Info" style={{fontSize: '16px'}}>Data da próxima manutenção:</Col>
                <Col span={6} className="Info" style={{textAlign: 'right', fontSize: '16px'}}>{maintenceDate}</Col>
            </Row>
        </div>
    );
}

export default MapCard;