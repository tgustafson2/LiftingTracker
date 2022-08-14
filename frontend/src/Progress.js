import {useState} from 'react';
import React from 'react';
import Navbar from './components/Navbar.js';
import ProgressGraph from './components/ProgressGraph';
import Exercise from './components/Exercise.js';

class Progress extends React.Component{
    constructor(props){
        super(props)
        // this.getWorkouts = this.getWorkouts.bind(this);
        this.state={
            workoutsArray:[],
            graphSelection:'',
            graph:<div></div>
        }
        // this.getWorkouts();
        this.selectGraph=this.selectGraph.bind(this);
        this.generateGraph=this.generateGraph.bind(this);
        
    }
 
    selectGraph = (e) =>{
        let index=e.target.selectedIndex;
        this.state.graphSelection=e.target.options[index].dataset.isd;
        console.log(e.target.options[index].dataset.isd)
        
    }
    generateGraph(){
        if(this.state.graphSelection!=""){
        console.log(this.state.graphSelection);
        //call api for getting data
        //generate and display graph
        let UserID=localStorage.getItem('UserId');
        let Exer=this.state.graphSelection;
        fetch(`http://localhost:8080/getGraphData/${UserID}/${Exer}`)
        .then(res => res.json())
        .then(data =>{
            let graphData=data.Data
            graphData.forEach(i =>{
                i.x=new Date(i.x)
                i.x.setTime(i.x.getTime()+60*60*1000*8)
            })
            console.log(graphData);
            //use graphData to form graph
            let g= <ProgressGraph data={graphData} exercise={Exer} />
            this.setState({graph:g})
        })
        }
    }
    componentDidMount(){
        let UserId=localStorage.getItem('UserId');
        fetch(`http://localhost:8080/previousWorkouts/${UserId}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data.workouts);
            console.log(typeof(data.workouts));
            this.setState({workoutsArray:data.workouts });
            console.log(this.state.workoutsArray);
  
        })
    }

    render(){
        const {workoutsArray} = this.state;
        let exerciseList = workoutsArray.length >0
            && workoutsArray.map((item, i)=> {
                return (
                    <option key={i} data-isd={item} value={item}>{item}</option>
                )
            }, this)
        let Graph= this.state.graph;
        return(
            <div>
        <Navbar />
       
            <select onChange={this.selectGraph} placeholder="Select Exercise">
                <option value="">Select Exercise</option>
                {exerciseList}
            </select>
            <button onClick={this.generateGraph}>Graph Progress</button>
            {Graph}
        </div>
        )
    }
}

export default Progress