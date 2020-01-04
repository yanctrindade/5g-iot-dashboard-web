import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col
  } from 'antd';

class AddnEditVehicle extends Component {

    insertString = (str, index, value) => {
        return str.substr(0, index) + value + str.substr(index);
    }

    render(){        
        const n = window.location.href.search("plate");
        let plate = "";
        let returnValue;
        if (n !== -1){
            plate = this.insertString(window.location.href.substring(n + 6, n + 13), 3, " ");
            returnValue =  <h1>Edit Page</h1>
        }
        else{
            returnValue = <h1>Add Page</h1>;
        }            

        return(
            <>
                {returnValue}
                <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Placa">
                            {(<Input placeholder="Placa do carro" defaultValue={plate}/>)}
                        </Form.Item>
                        <Form.Item >
                            <Row>
                                <Col span={5}>                                
                                    <Button type="danger" href="/vehicles">
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col span={5}>      
                                    <Button type="primary">
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

export default AddnEditVehicle;