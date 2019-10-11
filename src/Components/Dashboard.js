import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import MapCard from "./MapCard";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { center: [0, 0], zoom: 2 };

    this.olmap = new OlMap({
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM()
        })
      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <>
      <div id="map">
        <MapCard/>
      </div>
      </>
    );
  }
}

export default Dashboard;
