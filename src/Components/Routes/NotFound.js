import React, { Component } from "react";
import { Card, Button } from 'antd';
import "./styles.css"

class NotFound extends Component {
    render(){
        return (
            <Card title="Erro 404 - Página não encontrada." className={"not-found-card"}>
                <p>Clique <Button 
                            type="link" 
                            onClick={() => this.props.history.goBack()}
                            shape={"circle"}
                        >
                            aqui
                        </Button> para voltar para a página anterior.</p>
            </Card>
        );
    }
}

export default NotFound;