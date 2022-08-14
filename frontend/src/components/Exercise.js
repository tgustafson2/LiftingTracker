//store info about exercise
import { useState } from "react";
import React from "react";

class Exercise extends React.Component{
    constructor(props){
        super(props)
        this.state =Object.assign(...this.props);
        console.log("Created");
    }
    //Update operation here
    deleteExercise(){

    }
    updateExercise(){

    }
    render(){
        return( <div className="exercise">
            <p>placeholder</p>

        </div>)
    }
}
export default Exercise