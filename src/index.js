import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import "./styles.css";
import MainSider from "./Components/MainSider";

function App() {
  return <MainSider />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ConfigProvider locale={ptBR}> <App /> </ConfigProvider>, rootElement);
