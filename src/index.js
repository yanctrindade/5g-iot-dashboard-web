import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MainSider from "./Components/MainSider";

function App() {
  return <MainSider />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
