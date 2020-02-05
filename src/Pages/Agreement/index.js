import React, { Component } from "react";
import { Card, Typography, Button } from 'antd';
import "./styles.css";

const { Text } = Typography;

class Agreement extends Component {
    render(){
        return (
            <div>
                <Card title="Termos de uso" className={"agreement-card"} >
                    <Text>
                        Ao se cadastrar, você estará fornecendo aos nossos servidores as informações de E-mail, Nome completo, Nome de usuário e senha.
                    </Text>

                    <br />
                    <br />

                    <Text>
                        Ao clicar em "aceito os termos de serviço" você estará dando a autorização para o uso de seus dados para fins de estudo ou comercial, sem aviso prévio ao usuário.
                    </Text>

                    <br />
                    <br />

                    <Text>
                        Caso seja um motorista ou administrador cadastrado, os dados gerados pelo uso do site é de total propriedade da Universidade de Brasília, e poderá ser usado para
                        fins de fiscalização do patrimônio público.
                    </Text>

                    <br />
                    <br />

                    <Button onClick={() => this.props.history.goBack()} className={"back-buttom"}>
                              Voltar
                    </Button>
                </Card>
            </div>
        )
    }
}

export default Agreement;