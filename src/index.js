import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import SiderDemo from "./Components/SiderDemo";

function App() {
  return <SiderDemo />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
