import React from "react";
import MapComponent from "../../Components/Map/MapComponent";
import fiwareLogo from '../../Assets/poweredbyfiware.png';
import comnetLogo from '../../Assets/comnetlogo.png';
import {
    Button,
    Layout,
  } from 'antd';

import "./styles.css";

const { Header} = Layout;

function Visitors(props) {
    return (
        <div>
            <Layout>
                <Header style={{ color: "white", textAlign: "center" }}>
                    <img src={fiwareLogo} alt="fiwareLogo" width="130" style={{position: "absolute", right: "100px"}} />
                    <img src={comnetLogo} alt="comnetLogo" width="180" style={{position: "absolute", left: "40px"}} />
                    <Button 
                        type="link" 
                        className="visitors-login-buttom"
                        href="/" 
                        >
                        Logar
                    </Button> 
                </Header>
            </Layout>

            <MapComponent/>
            
        </div>
    );
  }

export default Visitors;
