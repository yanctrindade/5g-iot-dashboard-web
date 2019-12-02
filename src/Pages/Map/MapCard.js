import React , {Component} from "react";
import "./styles.css";
import { Row, Col, Icon } from 'antd';
import VehicleData from '../../FakeData/MapCardData';

class MapCard extends Component{

    constructor(props){
        super(props);

        this.state = {
            isVisible : this.props.isVisible
        }
    }

    d = VehicleData;
    updateDate = new Date(this.d.updateTime).toLocaleDateString();
    updateTime = new Date(this.d.updateTime).toLocaleTimeString();
    maintenceDate = new Date(this.d.maintenceTime).toLocaleDateString();

    closeMapCard = () => this.setState({isVisible : false})
    

    render(){
        return(
            <>
            {this.state.isVisible ? (
                <div className="MapCard">
                    <Row  className="MapCard-title">
                        <Icon type="close" id="CloseButton" onClick={this.closeMapCard}/>
                        <h3>{this.d.plate}</h3>
                        <p>última atualização em {this.updateDate} às {this.updateTime}</p>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="Metric-info">
                                {this.d.speed}<span className="Metric">km/h</span>
                            </div>
                            <div className="Info-tag">Velocidade Instantânea</div>
                        </Col>
                        <Col span={12}>
                            <div className="Metric-info">
                                {this.d.distance}<span className="Metric">km</span>
                            </div>
                            <div className="Info-tag">Distância Percorrida</div>
                        </Col>
                    </Row>
                    <Row style={{padding: '0px 10px 0px 10px'}}>
                        <Col span={12} className="Info" style={{fontWeight: 'bold'}}>{this.d.model}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{this.d.brand}</Col>
                    </Row>
                    <Row style={{padding: '0px 10px 0px 10px'}}>
                        <Col span={12} className="Info">{this.d.year}</Col>
                        <Col span={12} className="Info" style={{textAlign: 'right'}}>{this.d.color}</Col>
                    </Row>
                    <Row style={{padding: '10px 10px 0px 10px'}}>
                        <Col span={18} className="Info" style={{fontSize: '16px'}}>Data da próxima manutenção:</Col>
                        <Col span={6} className="Info" style={{textAlign: 'right', fontSize: '16px'}}>{this.maintenceDate}</Col>
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