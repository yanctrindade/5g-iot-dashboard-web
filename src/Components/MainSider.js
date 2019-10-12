import React from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import MapComponent from "./Map";
import Vehicles from "./Vehicles.js";
import Statistics from "./Statistics.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Content, /*Footer,*/ Sider } = Layout;

class MainSider extends React.Component {
  state = {
    collapsed: false, 
    content: 1
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ color: "white", textAlign: "center" }}>
            COMNET
          </Header>
          <Layout style={{ minHeight: "90vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <Icon type="search" />
                  <span>Mapa</span>
                  <Link to="/" />
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="car" />
                  <span>Veículos</span>
                  <Link to="/vehicles" />
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="area-chart" />
                  <span>Estatísticas</span>
                  <Link to="/statistics" />
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content>
                {/* <Route exact path="/" component={MapComponent} /> */}
                <Route exact path={"/"} render={() => <Map update={this.state.collapsed}/>}/>
                <Route path="/vehicles" component={Vehicles} />
                <Route path="/statistics" component={Statistics} />
              </Content>
              {/* <Footer style={{ textAlign: "center" }}>
                COMNET - UnB
              </Footer> */}
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default MainSider;
