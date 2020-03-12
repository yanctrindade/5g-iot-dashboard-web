import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Tag,
    Typography,
    DatePicker,
    Radio,
    Tooltip,
    Icon,
    message
  } from 'antd';
//import axios from 'axios';
import API from "../../api/fiware";
import moment from "moment";
import "./styles.css";

const { Text } = Typography;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddnEditVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                      isNewCar: true,
                      id: "",
                      isPublic: false,
                      plate: "",
                      operating: false,
                      broken: false,
                      maintenance: false,
                      carModel: "",
                      carBrand: "",
                      lastMaintenance: null,
                      department: "",
                      carYearModel: "",
                      carColor: "",
                      nextMaintenance: null,
                      mileage: "",
                      tagErrorMessage: ""
                     };
    }

    componentDidMount() {
        const n = window.location.href.search("plate");

        const headers = {
            headers : {         
                        'fiware-servicepath' : '/',
                        'fiware-service' : 'openiot'
                      }
        }

        if (n !== -1){
            API.get(`/v2/entities/?type=Car&options=keyValues`, headers)
            .then((res)=>{
                this.setData(res.data, this.insertString(window.location.href.substring(n + 6, n + 13), 3, " "));
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    setData = (allVehicleData, plate) => {
        let found = false;
        let operating = false, broken = false, maintenance = false, carModel, carBrand, lastMaintenance,
        department, carYearModel, carColor, nextMaintenance, mileage, id, isPublic;
        
        for (var i = 0; i < allVehicleData.length; i++){
            // look for the entry with a matching `plate` value
            if (allVehicleData[i].plate === plate){
                found = true; // Sets the found tag for state update

                // Checks the car tags
                for (var j = 0; j < allVehicleData[i].tags.length; j++){
                    if (allVehicleData[i].tags[j] === 'Operando'){
                        operating = true;
                    }
                    else if (allVehicleData[i].tags[j] === 'Manuntenção'){
                        maintenance = true;
                    }
                    else if (allVehicleData[i].tags[j] === 'Quebrado'){
                        broken = true;
                    }
                }

                // Sets all the other variables
                id = allVehicleData[i].id;
                isPublic = allVehicleData[i].isPublic;
                carModel = allVehicleData[i].carModel;
                carBrand = allVehicleData[i].carBrand;
                lastMaintenance = allVehicleData[i].lastMaintenance;
                department = allVehicleData[i].department;
                carYearModel = allVehicleData[i].carYearModel;
                carColor = allVehicleData[i].carColor;
                nextMaintenance = allVehicleData[i].nextMaintenance;
                mileage = allVehicleData[i].statistics.mileage;
            }
        }

        if (found){
            this.setState({
                isNewCar: false,
                id: id,
                isPublic: isPublic,
                plate: plate,
                operating: operating,
                broken: broken,
                maintenance: maintenance,
                carModel: carModel,
                carBrand: carBrand,
                lastMaintenance: lastMaintenance,
                department: department,
                carYearModel: carYearModel,
                carColor: carColor,
                nextMaintenance: nextMaintenance,
                mileage: mileage
            });
        }
    }

    insertString = (str, index, value) => {
        return str.substr(0, index) + value + str.substr(index);
    }

    areFieldsEmpty = () => {
        return !(this.state.plate !== "" && this.state.carModel !== "" && this.state.carBrand !== "" &&
        this.state.lastMaintenance !== "" && this.state.department !== "" && this.state.carYearModel !== "" &&
        this.state.carColor !== "" && this.state.nextMaintenance !== "" && this.state.mileage !== "" && 
        (this.state.operating || this.state.broken || this.state.maintenance) && this.state.id !== "")
    }

    getTagError = () => {
        if(!this.state.operating && !this.state.broken && !this.state.maintenance){
            return true;
        } else if(this.state.operating && this.state.broken){
            return true;
        } else if(this.state.operating && this.state.maintenance){
            return true;
        } else{
            return false;
        }         
    }

    saveEdit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values.plate);
            // Every value is saved in state, so it can be retrieved with this.state or 
            // with values.obj
            if(this.state.isNewCar){
                // Save to database as new entry
                console.log("new entry!");
                
                // If sucess
                message.success('This is a success message');
                // If error
                message.error('This is an error message');
            }
            else{
                // update on database according to this.state.plate value
                console.log("old entry!");

                // If sucess
                message.success('This is a success message');
                // If error
                message.error('This is an error message');
            }
          }
        });
    };

    setOperating = e => {
        e.preventDefault();
        if(this.state.maintenance && !this.state.operating){
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: "Combinação de estados inválida!"
            }));
        } else if(this.state.broken && !this.state.operating){
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: "Combinação de estados inválida!"
            }));
        } else if(this.state.operating && !this.state.broken && !this.state.maintenance){
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: "Selecione um estado!"
            }));
        } else {
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: ""
            }));
        }        
    };

    setBroken = e => {
        e.preventDefault();
        if((!this.state.broken && this.state.operating) || (this.state.broken && this.state.operating && this.state.maintenance)){
            this.setState(prevState => ({
                broken: !prevState.broken,
                tagErrorMessage: "Combinação de estados inválida!"
            }));
        } else if(!this.state.operating && this.state.broken && !this.state.maintenance){
            this.setState(prevState => ({
                broken: !prevState.broken,
                tagErrorMessage: "Selecione um estado!"
            }));
        } else {
            this.setState(prevState => ({
                broken: !prevState.broken,
                tagErrorMessage: ""
            }));
        }    
    };

    setMaintenance = e => {
        e.preventDefault();
        if((!this.state.maintenance && this.state.operating) || (this.state.maintenance && this.state.operating && this.state.broken)){
            this.setState(prevState => ({
                maintenance: !prevState.maintenance,
                tagErrorMessage: "Combinação de estados inválida!"
            }));
        } else if(!this.state.operating && !this.state.broken && this.state.maintenance){
            this.setState(prevState => ({
                maintenance: !prevState.maintenance,
                tagErrorMessage: "Selecione um estado!"
            }));
        } else {
            this.setState(prevState => ({
                maintenance: !prevState.maintenance,
                tagErrorMessage: ""
            }));
        }    
    };

    lastMaintenance = (date, dateString) => {
        this.setState(({
            lastMaintenance: date !== null ? date.format("YYYY-MM-DD") : null
        }));
    }

    nextMaintenance = (date, dateString) => {
        this.setState(({
            nextMaintenance: date !== null ? date.format("YYYY-MM-DD") : null
        }));
    }

    updatePlate = (e) => {
        this.setState(({
            plate: e.target.value
        }));
    }

    updatecarModel = (e) => {
        this.setState(({
            carModel: e.target.value
        }));
    }

    updatecarBrand = (e) => {
        this.setState(({
            carBrand: e.target.value
        }));
    }

    updatecarColor = (e) => {
        this.setState(({
            carColor: e.target.value
        }));
    }

    updatecarYearModel = (e) => {
        this.setState(({
            carYearModel: e.target.value
        }));
    }

    updateMileage = (e) => {
        this.setState(({
            mileage: e.target.value
        }));
    }

    updatedepartment = (e) => {
        this.setState(({
            department: e.target.value
        }));
    }

    updateid = (e) => {
        this.setState(({
            id: e.target.value
        }));
    }

    updateIsPublic = () => {
        this.setState(prevState => ({
            isPublic: !prevState.isPublic
        }));
    }

    render(){      
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;     
        const plateError = isFieldTouched('plate') && getFieldError('plate');   
        const carModelError = isFieldTouched('carModel') && getFieldError('carModel');
        const carBrandError = isFieldTouched('carBrand') && getFieldError('carBrand');
        const departmentError = isFieldTouched('department') && getFieldError('department');
        const carColorError = isFieldTouched('carColor') && getFieldError('carColor');
        const carYearModelError = isFieldTouched('carYearModel') && getFieldError('carYearModel');
        const mileageError = isFieldTouched('mileage') && getFieldError('mileage');
        const lastMaintenanceError = isFieldTouched('lastMaintenance') && getFieldError('lastMaintenance');
        const nextMaintenanceError = isFieldTouched('nextMaintenance') && getFieldError('nextMaintenance');
        const idError = isFieldTouched('id') && getFieldError('id');
        
        return(
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Placa" validateStatus={plateError ? 'error' : ''} help={plateError || ''}>
                                {getFieldDecorator("plate", {
                                    initialValue: this.state.plate,
                                    rules: [
                                        { required: true, message: "Insira a placa do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Placa do carro."
                                        onChange={this.updatePlate}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="carModelo" validateStatus={carModelError ? 'error' : ''} help={carModelError || ''}>
                                {getFieldDecorator("carModel", {
                                    initialValue: this.state.carModel,
                                    rules: [
                                        { required: true, message: "Insira o carModelo do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="carModelo do carro."
                                        onChange={this.updatecarModel}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Fabricante" validateStatus={carBrandError ? 'error' : ''} help={carBrandError || ''}>
                                {getFieldDecorator("carBrand", {
                                    initialValue: this.state.carBrand,
                                    rules: [
                                        { required: true, message: "Insira o fabricante do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Fabricante do carro."
                                        onChange={this.updatecarBrand}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Cor" validateStatus={carColorError ? 'error' : ''} help={carColorError || ''}>
                                {getFieldDecorator("carColor", {
                                    initialValue: this.state.carColor,
                                    rules: [
                                        { required: true, message: "Insira a cor do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Cor do carro."
                                        onChange={this.updatecarColor}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Ano" validateStatus={carYearModelError ? 'error' : ''} help={carYearModelError || ''}>
                                {getFieldDecorator("carYearModel", {
                                    initialValue: this.state.carYearModel,
                                    rules: [
                                        { required: true, message: "Insira o ano do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Ano do carro."
                                        onChange={this.updatecarYearModel}
                                        allowClear={true}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Hodômetro" validateStatus={mileageError ? 'error' : ''} help={mileageError || ''}>
                                {getFieldDecorator("mileage", {
                                    initialValue: this.state.mileage,
                                    rules: [
                                        { required: true, message: "Insira a quilometragem do carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Hodômetro do carro."
                                        onChange={this.updateMileage}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Última manuntenção" validateStatus={lastMaintenanceError ? 'error' : ''} help={lastMaintenanceError || ''}>
                                {getFieldDecorator("lastMaintenance", {
                                    initialValue: this.state.lastMaintenance !== null ? moment(this.state.lastMaintenance) : null,
                                    rules: [
                                        { required: true, message: "Selecione uma data!" }
                                    ]
                                    })(
                                        <DatePicker 
                                            onChange={this.lastMaintenance}
                                            format="DD/MM/YYYY"
                                            className="vehicle-calendar-picker"
                                            placeholder="Última manuntenção do carro."
                                            allowClear={true}
                                        />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Próxima manuntenção" required={true} validateStatus={nextMaintenanceError ? 'error' : ''} help={nextMaintenanceError || ''}>
                                {getFieldDecorator("nextMaintenance", {
                                    initialValue: this.state.nextMaintenance !== null ? moment(this.state.nextMaintenance) : null,
                                    rules: [
                                        { required: true, message: "Selecione uma data!" }
                                    ]
                                    })(
                                        <DatePicker 
                                            onChange={this.nextMaintenance}
                                            format="DD/MM/YYYY"
                                            className="vehicle-calendar-picker"
                                            placeholder="Próxima manuntenção do carro."
                                            allowClear={true}
                                        />
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="departmento" validateStatus={departmentError ? 'error' : ''} help={departmentError || ''}>
                                {getFieldDecorator("department", {
                                    initialValue: this.state.department,
                                    rules: [
                                        { required: true, message: "Insira o departmento que pertence o carro!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="departmento do carro."
                                        onChange={this.updatedepartment}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="ID do Veículo" validateStatus={idError ? 'error' : ''} help={idError || ''}>
                                {getFieldDecorator("id", {
                                    initialValue: this.state.id,
                                    rules: [
                                        { required: true, message: "Insira o ID do veículo!" }
                                    ]
                                    })(
                                    <Input
                                        placeholder="Identificador do veículo."
                                        onChange={this.updateid}
                                        allowClear={true}
                                    />
                                    )}
                            </Form.Item>
                        </Col>

                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item
                                label={
                                    <span>
                                        Privacidade&nbsp;
                                        <Tooltip title="Determina se o veículo poderá ser visto publicamente ou apenas por pessoas autorizadas.">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                    } >
                                <Radio.Group value={String(this.state.isPublic)} onChange={() => {this.updateIsPublic()}} className="privacy-selection">
                                    <Radio.Button value="true">Público</Radio.Button>
                                    <Radio.Button value="false">Privado</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col span={7} style={{margin: "1%"}}>
                            <Form.Item label="Estado atual" validateStatus={this.getTagError() ? 'error' : ''} help={this.getTagError() || ''}>
                                <Tag
                                    style={{marginLeft: "5%"}}
                                    carColor={this.state.operating ? "green" : "blue"}
                                    onClick={this.setOperating}
                                >
                                    Operando
                                </Tag>
                                <Tag
                                    carColor={this.state.broken ? "red" : "blue"}
                                    onClick={this.setBroken}
                                >
                                    Quebrado
                                </Tag>
                                <Tag
                                    carColor={this.state.maintenance ? "yellow" : "blue"}
                                    onClick={this.setMaintenance}
                                >
                                    Manuntenção
                                </Tag>
                                <br />
                                <Text type="danger" className="tag-warning-text">{this.state.tagErrorMessage}</Text>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{marginLeft: "37%"}}>
                        <Form.Item >
                            <Row>
                                <Col span={5}>                                
                                    <Button type="danger" href="/vehicles">
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col span={5}>      
                                    <Button 
                                        type="primary" 
                                        onClick={this.saveEdit}
                                        disabled={hasErrors(getFieldsError()) || this.areFieldsEmpty() || this.getTagError()}
                                    >
                                        Salvar
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Row>
                </Form>
            </>
        );
    }
}

export default Form.create()(AddnEditVehicle);