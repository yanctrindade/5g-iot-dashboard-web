import React, { Component } from "react";
 
import GradientColors from "react-gradient-generator";
 
class GradientGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { startColor: "#ff0000", endColor: "#ffffff", steps: this.props.steps };
  }
 
  render() {
    return (
      <GradientColors
        startColor={this.state.startColor}
        endColor={this.state.endColor}
        steps={this.state.steps}
        getGradients={this.props.getGradients}
      />
    );
  }
}

export default GradientGenerator;