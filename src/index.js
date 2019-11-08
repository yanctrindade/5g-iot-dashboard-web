import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import Routes from "./Components/Routes";
import "./styles.css";

const rootElement = document.getElementById("root");

ReactDOM.render(<ConfigProvider locale={ptBR}> <Routes/> </ConfigProvider>, rootElement);