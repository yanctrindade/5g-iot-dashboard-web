import React , {Component} from "react";
import "./styles.css";
import { Row, Col, Icon } from 'antd';

class MapCard extends Component{
    
    getDate = (date) => new Date(date).toLocaleDateString();

    render(){
        let data = this.props.content;
        console.log(data)
        return(
            <>
            {this.props.isVisible ? (
                <div className="MapCard">
                    <Row  className="MapCard-title">
                        <Icon type="close" id="CloseButton" onClick={this.props.onClose}/>
                        <h3>{data.plate}</h3>
                        <p>última atualização em {this.getDate(data.updateDate)} às {this.getDate(data.updateTime)}</p>
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
                        <Col span={12} className="Info" style={{fontWeight: 'bold'}}>{data.model}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{data.brand}</Col>
                    </Row>
                    <Row style={{padding: '0px 10px 0px 10px'}}>
                        <Col span={12} className="Info">{data.year}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{data.color}</Col>
                    </Row>
                    <Row style={{padding: '10px 10px 0px 10px'}}>
                        <Col span={18} className="Info" style={{fontSize: '16px'}}>Data da próxima manutenção:</Col>
                        <Col span={6} className="Info" style={{textAlign: 'right', fontSize: '16px'}}>{this.getDate(data.maintenceDate)}</Col>
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