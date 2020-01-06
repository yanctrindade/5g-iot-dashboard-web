import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Tag,
    Typography
  } from 'antd';
  import axios from 'axios';

function hasErrors(fieldsError) {
return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddnEditVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                      isNewCar: true,
                      plate: "",
                      operating: false,
                      broken: false,
                      maintenance: false,
                      model: "",
                      manufacture: "",
                      lastMaintenceDate: "",
                      departament: "",
                      year: "",
                      color: "",
                      nextMaintenceDate: "",
                      mileage: "",
                      tagErrorMessage: ""
                     };
    }

    componentDidMount() {
        const n = window.location.href.search("plate");

        if (n !== -1){
            axios.get('http://localhost:3000/database.json')
            .then((res)=>{
                this.setData(res.data, this.insertString(window.location.href.substring(n + 6, n + 13), 3, " "));
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    setData = (allVehicleData, plate) => {
        let found = false;
        let operating = false, broken = false, maintenance = false, model, manufacture, lastMaintenceDate,
        departament, year, color, nextMaintenceDate, mileage;
        
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
                model = allVehicleData[i].model;
                manufacture = allVehicleData[i].manufacture;
                lastMaintenceDate = allVehicleData[i].lastMaintenceDate;
                departament = allVehicleData[i].departament;
                year = allVehicleData[i].year;
                color = allVehicleData[i].color;
                nextMaintenceDate = allVehicleData[i].nextMaintenceDate;
                mileage = allVehicleData[i].statistics.mileage;
            }
        }

        if (found){
            this.setState({
                isNewCar: false,
                plate: plate,
                operating: operating,
                broken: broken,
                maintenance: maintenance,
                model: model,
                manufacture: manufacture,
                lastMaintenceDate: lastMaintenceDate,
                departament: departament,
                year: year,
                color: color,
                nextMaintenceDate: nextMaintenceDate,
                mileage: mileage
            });
        }
    }

    insertString = (str, index, value) => {
        return str.substr(0, index) + value + str.substr(index);
    }

    areFieldsEmpty = () => {
        return !(this.state.plate !== "" && this.state.model !== "" && this.state.manufacture !== "" &&
        this.state.lastMaintenceDate !== "" && this.state.departament !== "" && this.state.year !== "" &&
        this.state.color !== "" && this.state.nextMaintenceDate !== "" && this.state.mileage !== "" && 
        (this.state.operating || this.state.broken || this.state.maintenance))
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

            if(this.state.isNewCar){
                // Save to database as new entry
                console.log("new entry!");
            }
            else{
                // update on database according to this.state.plate value
                console.log("old entry!");
            }
          }
        });
    };

    setOperating = e => {
        e.preventDefault();
        if(this.state.maintenance && !this.state.operating){
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: "Seleção inválida!"
            }));
        } else if(this.state.broken && !this.state.operating){
            this.setState(prevState => ({
                operating: !prevState.operating,
                tagErrorMessage: "Seleção inválida!"
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
        if(!this.state.broken && this.state.operating){
            this.setState(prevState => ({
                broken: !prevState.broken,
                tagErrorMessage: "Seleção inválida!"
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
        if(!this.state.maintenance && this.state.operating){
            this.setState(prevState => ({
                maintenance: !prevState.maintenance,
                tagErrorMessage: "Seleção inválida!"
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

    render(){      
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;     
        const plateError = isFieldTouched('plate') && getFieldError('plate');   
        const modelError = isFieldTouched('model') && getFieldError('model');
        const manufactureError = isFieldTouched('manufacture') && getFieldError('manufacture');
        const departamentError = isFieldTouched('departament') && getFieldError('departament');
        const colorError = isFieldTouched('color') && getFieldError('color');
        const mileageError = isFieldTouched('mileage') && getFieldError('mileage');
        
        return(
            <>
                <Form onSubmit={this.handleSubmit}>
                        
                        <Form.Item label="Placa" validateStatus={plateError ? 'error' : ''} help={plateError || ''}>
                            {getFieldDecorator("plate", {
                                initialValue: this.state.plate,
                                rules: [
                                    { required: true, message: "Insira a placa do carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Placa do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

                        <Form.Item label="Modelo" validateStatus={modelError ? 'error' : ''} help={modelError || ''}>
                            {getFieldDecorator("model", {
                                initialValue: this.state.model,
                                rules: [
                                    { required: true, message: "Insira o modelo do carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Modelo do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

                        <Form.Item label="Fabricante" validateStatus={manufactureError ? 'error' : ''} help={manufactureError || ''}>
                            {getFieldDecorator("manufacture", {
                                initialValue: this.state.manufacture,
                                rules: [
                                    { required: true, message: "Insira o fabricante do carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Fabricante do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

                        <Form.Item label="Departamento" validateStatus={departamentError ? 'error' : ''} help={departamentError || ''}>
                            {getFieldDecorator("departament", {
                                initialValue: this.state.departament,
                                rules: [
                                    { required: true, message: "Insira o departamento que pertence o carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Departamento do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

                        <Form.Item label="Cor" validateStatus={colorError ? 'error' : ''} help={colorError || ''}>
                            {getFieldDecorator("color", {
                                initialValue: this.state.color,
                                rules: [
                                    { required: true, message: "Insira a cor do carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Cor do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

                        <Form.Item label="Hodômetro" validateStatus={mileageError ? 'error' : ''} help={mileageError || ''}>
                            {getFieldDecorator("mileage", {
                                initialValue: this.state.mileage,
                                rules: [
                                    { required: true, message: "Insira a quilometragem do carro!" }
                                ]
                                })(
                                <Input
                                    placeholder="Hodômetro do carro"
                                    allowClear={true}
                                />
                                )}
                        </Form.Item>

{/*
                      lastMaintenceDate: "",
                      year: "",
                      nextMaintenceDate: "",
*/}
                        <Form.Item label="Estado atual" validateStatus={this.getTagError() ? 'error' : ''} help={this.getTagError() || ''}>
                            <Tag
                                color={this.state.operating ? "green" : "blue"}
                                onClick={this.setOperating}
                            >
                                Operando
                            </Tag>
                            <Tag
                                color={this.state.broken ? "red" : "blue"}
                                onClick={this.setBroken}
                            >
                                Quebrado
                            </Tag>
                            <Tag
                                color={this.state.maintenance ? "yellow" : "blue"}
                                onClick={this.setMaintenance}
                            >
                                Manuntenção
                            </Tag>
                            <br/>
                            <Typography type="warning">{this.state.tagErrorMessage}</Typography>
                        </Form.Item>

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
                </Form>
            </>
        );
    }
}

export default Form.create()(AddnEditVehicle);