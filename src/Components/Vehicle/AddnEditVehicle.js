import React, { Component } from "react";

class AddnEditVehicle extends Component {

    render(){
        const returnValue = this.props.addOrEdit ? <h1>Add Page</h1> : <h1>Edit Page</h1>;
        return(
            <>
                {returnValue}
            </>
        );
    }
}

export default AddnEditVehicle;