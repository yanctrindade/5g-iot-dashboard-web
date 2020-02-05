import React, { Component } from "react";
import { Layout, Menu, Icon, Button, Avatar } from "antd";
import auth from "../../Components/Login/Auth";
import { Cookies } from 'react-cookie';
import fiwareLogo from '../../Assets/poweredbyfiware.png';
import comnetLogo from '../../Assets/comnetlogo.png';
import "antd/dist/antd.css";
import "./styles.css"

import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const cookies = new Cookies();

class NavBar extends Component {
  constructor(props) {
    super(props);
    const isCollapsed = cookies.get('isCollapsed') === "true" ? true : false;
    
    this.state = { 
                  collapsed: isCollapsed
                 };
  }

  onCollapse = collapsed => {
    cookies.remove('isCollapsed');
    cookies.set('isCollapsed', !this.state.collapsed, { path: '/' });
    
    this.setState({ collapsed });
  };

  getInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

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
            <img src={fiwareLogo} alt="fiwareLogo" width="130" style={{position: "absolute", right: "100px"}} />
            <img src={comnetLogo} alt="comnetLogo" width="180" style={{position: "absolute", left: "8px"}} />
            <Button 
              type="link" 
              className="main-logout-buttom"
              href='#' 
              onClick={
                () => {
                  auth.logout(() => {
                  this.props.history.push("/");
                });
              }}>
              Sair
            </Button>
            <Button 
              type="link" 
              className="edit-user-button"
              href='/edit-user' 
              >
              <Avatar style={{ backgroundColor:"#1890FF"}}>{this.getInitials(auth.getUserName())}</Avatar>
            </Button>
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
                  <Icon type="fund" />
                  <span>Mapa</span>
                  <Link to="/map" />
                </Menu.Item>
                { auth.isAdmin() ? 
                  <Menu.Item key="/vehicles">
                    <Icon type="car" />
                    <span>Veículos</span>
                    <Link to="/vehicles" />
                  </Menu.Item> : <></>
                }
                <Menu.Item key="/driver">
                  <Icon type="idcard" />
                  <span>{auth.isAdmin() ? "Motoristas" : "Motorista"}</span>
                  <Link to="/driver" />
                </Menu.Item>
                { auth.isAdmin() ? 
                  <Menu.Item key="/statistics">
                    <Icon type="area-chart" />
                    <span>Estatísticas</span>
                    <Link to="/statistics" />
                  </Menu.Item> : <></>
                }
                { auth.isAdmin() ? 
                  <Menu.Item key="/users">
                    <Icon type="usergroup-add" />
                    <span>Usuários</span>
                    <Link to="/users" />
                  </Menu.Item> : <></>
                }
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
