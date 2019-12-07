import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";

import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

class NavBar extends Component {
  state = {
    collapsed: false, 
    content: 1,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {

    // Because of ANTD 'componentWillReceiveProps has been renamed' warning, 
    // while they don't update their package, this is used to hide the warning.
    ///////////////////////////////////////////////////////////////////////////
    const doWarn = window.console.warn
    window.console.warn = (...args) => {
      if(typeof args[0] !== 'string' || !args[0].startsWith('Warning: componentWillReceiveProps has been renamed'))
        doWarn(...args)
    }
    ///////////////////////////////////////////////////////////////////////////
    
    return (
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
              <Menu theme="dark" defaultSelectedKeys="/map" selectedKeys={this.props.pathname} mode="inline">
                <Menu.Item key="/map">
                  <Icon type="search" />
                  <span>Mapa</span>
                  <Link to="/map" />
                </Menu.Item>
                <Menu.Item key="/vehicles">
                  <Icon type="car" />
                  <span>Veículos</span>
                  <Link to="/vehicles" />
                </Menu.Item>
                <Menu.Item key="/statistics">
                  <Icon type="area-chart" />
                  <span>Estatísticas</span>
                  <Link to="/statistics" />
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              {this.props.content}
            </Content>
          </Layout>
        </Layout>
    );
  }
}

export default NavBar;
