import React , {Component} from "react";
import "./styles.css";
import { Row, Col, Icon } from 'antd';

class MapCard extends Component{
    
    getDate = (date) => new Date(date).toLocaleDateString();
    getTime = (date) => new Date(date).toLocaleTimeString();

    render(){
        let data = this.props.content;
        return(
            <>
            {this.props.isVisible ? (
                <div className="MapCard">
                    <Row  className="MapCard-title">
                        <Icon type="close" id="CloseButton" onClick={this.props.onClose}/>
                        <h3>{data.plate}</h3>
                        <p>Última atualização em {this.getDate(data.dateModified)} às {this.getTime(data.dateModified)}</p>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="Metric-info">
                                {data.speed}<span className="Metric">km/h</span>
                            </div>
                            <div className="Info-tag">Velocidade Instantânea</div>
                        </Col>
                        <Col span={12}>
                            <div className="Metric-info">
                                {data.distance}<span className="Metric">km</span>
                            </div>
                            <div className="Info-tag">Distância Percorrida</div>
                        </Col>
                    </Row>
                    <Row style={{padding: '0px 10px 0px 10px'}}>
                        <Col span={12} className="Info" style={{fontWeight: 'bold'}}>{data.carModel}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{data.carBrand}</Col>
                    </Row>
                    <Row style={{padding: '0px 10px 0px 10px'}}>
                        <Col span={12} className="Info">{data.carYearModel}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{data.carColor}</Col>
                    </Row>
                    <Row style={{padding: '10px 10px 0px 10px'}}>
                        <Col span={18} className="Info" style={{fontSize: '16px'}}>Data da próxima manutenção:</Col>
                        <Col span={6} className="Info" style={{textAlign: 'right', fontSize: '16px'}}>{this.getDate(data.nextMaintenance)}</Col>
                    </Row>
                </div>
            ) : (
                <></>
            )
            }
            </>
        );
    }
}

export default MapCard;