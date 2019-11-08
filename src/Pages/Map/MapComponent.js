import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import MapCard from './MapCard';
import "ol/ol.css";
import {ZoomSlider} from 'ol/control';
import {fromLonLat} from 'ol/proj';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.mapRef = null;
    this.map = null;
    this.layer = null;
    this.view = null;
    this.setMapRef = element => {
      this.mapRef = element;
    }
  }

  render() {
    return (
      <div className="map" id="map" ref={this.setMapRef}>
        <MapCard />
      </div>
    )
  }

  componentDidMount() {
    const mapDOMNode = ReactDOM.findDOMNode(this.mapRef);
    this.layer = new TileLayer({
      preload: Infinity,
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });
    this.view = new View({
      center: fromLonLat([-47.869899,-15.762919]),
      zoom: 17
    });
    this.map = new Map({
      target: mapDOMNode,
      layers: [
        this.layer
      ],
      view: this.view
    });
    let zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
  }

  componentWillReceiveProps(nextProps) {
    console.log("UpdateSize");
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("shouldComponentUpdate: " + !newProps.update);
    return (!newProps.update);
  }
}

export default MapComponent