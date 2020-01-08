import React, { Component } from "react";
import { Card } from 'antd';
import "./styles.css"

class NotFound extends Component {
    render(){
        return (
            <Card title="Erro 404 - Página não encontrada." className={"not-found-card"}>
                <p>Clique <a onClick={() => this.props.history.goBack()}>aqui</a> para voltar para a página anterior.</p>
            </Card>
        );
    }
}

export default NotFound;