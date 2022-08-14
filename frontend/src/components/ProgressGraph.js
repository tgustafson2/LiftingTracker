import React, {Component} from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ProgressGraph extends Component{
    constructor(props){
        super(props);
        console.log(this.props.exercise);
        console.log(this.props.data);
    }
    render(){
        const options = {
            animationEnabled: true,
            title:{
                text:`${this.props.exercise}`
            },
            axisX:{
                valueFormatString:"YYYY-MM-DD"
            },
            axisY:{
                title: "One Rep Max Calcualted",
                suffix: "lbs"
            },
            data: [{
                yValueFormatString: "######.##",
                xValueType:"dateTime",
                type: "spline",
                dataPoints: this.props.data
            }]
        }
            return(
                <div>
                    <CanvasJSChart options = {options}/>
                </div>
            );
        
    }
}

export default ProgressGraph
