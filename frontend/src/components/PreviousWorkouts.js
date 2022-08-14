import { Component } from "react"
import React from 'react'
import Exercise from "./Exercise";

class PreviousWorkouts extends Component{
    constructor(props){
        super(props);
        this.state={
            Workouts:[]
        }
    }
    // componentDidMount(){
    //call fetch and assign to Workouts
    // }
    
    render() {
        if(this.state.Workouts.length!=0){
        return (
             <div>
                {this.state.Workouts.map((element, index)=>{
                    <Exercise key={index} exer={this.state.Workouts[index]} />
                })}
             </div>
        );
            }
            else{
         
                return(<div>

                </div>)
            }
    }
}
export default PreviousWorkouts