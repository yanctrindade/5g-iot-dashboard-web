import React, { Component } from "react";

class AddnEditVehicle extends Component {

    render(){        
        const n = window.location.href.search("plate");
        const returnValue = n !== -1 ? 
            <div>
                <h1>Edit Page</h1> 
                <h2>Placa: {window.location.href.substring(n + 6, n + 13)}</h2> 
            </div> : 
            <h1>Add Page</h1>;

        return(
            <>
                {returnValue}
            </>
        );
    }
}

export default AddnEditVehicle;