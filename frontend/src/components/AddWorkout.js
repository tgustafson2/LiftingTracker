import {useState} from 'react';
import React from 'react';

class AddWorkout extends React.Component{
    constructor(props){
        super(props)
            this.state={
                Exercise: "",
                Date: "",
                AreaOfFocus:"",
                Variation:"",
                sets: [{reps:"", weight:""}],
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(i, e) {
        // console.log(i);
        if(i!=-1){
        let sets = this.state.sets;
        sets[i][e.target.name] = e.target.value;
        this.setState({ sets });
        }
        else{
            this.setState({ [e.target.name]: e.target.value})
        }
        
      }
    addSet(){
        // console.log(JSON.stringify(this.state))
        this.setState(({
            Exercise: this.state.Exercise,
            Date: this.state.Date,
            AreaOfFocus: this.state.AreaOfFocus,
            Variation: this.state.Variation,
            sets: [...this.state.sets,{reps:"", weight:""}]
        }))
    }
    removeSet(i){
        let setsLocal= this.state.sets;
        setsLocal.splice(i,1);
        this.setState(({
            Exercise: this.state.Exercise,
            Date: this.state.Date,
            AreaOfFocus: this.state.AreaOfFocus,
            Variation: this.state.Variation,
            sets: setsLocal
        }))
        console.log(JSON.stringify(this.state))
    }
    handleSubmit = (e) => {       
        e.preventDefault() 
        let user = JSON.parse(localStorage.getItem('user'));
        let bod = {...user, ...this.state};
 
        return fetch('http://localhost:8080/submitWorkout',{
            method: 'Post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bod)
        }).then((res)=>console.log(res.json()))
        .then((res) => {
            this.setState(({
                Exercise: "",
                Date: "",
                AreaOfFocus:"",
                Variation:"",
                sets: [{reps:"", weight:""}],
            }))
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            )
        })
        
        
    }
    //add workout recommend function and button

    render(){
        let{Exercise, Date, AreaOfFocus, Variation, sets}=this.state
        return(
            <form onSubmit={this.handleSubmit} >
                <label>
                    Exercise:
                    <input type="text" name="Exercise" onChange={e => this.handleChange(-1,e)}/>
                </label>
                <label>
                    Date:
                    <input type="Date" name="Date" onChange={e => this.handleChange(-1,e)}/>
                </label>
                <label>
                    Area of Focus:
                    <input type="text" name="AreaOfFocus" onChange={e => this.handleChange(-1,e)}/>
                </label>
                <label>
                    Variation:
                    <input type="text" name="Variation" onChange={e => this.handleChange(-1,e)}/>
                </label>
                {
                this.state.sets.map((element, index) =>
                        <div key = {index}>
                           <label>Reps</label>
                           <input 
                            type="number"
                            name="reps"
                            value = {sets[index].reps||""}
                            onChange={e => this.handleChange(index,e)}
                            />
                            <label>Weight</label>
                           <input 
                            type="number"
                            name="weight"
                            value = {sets[index].weight||""}
                            onChange={e => this.handleChange(index,e)}
                            />
                            {
                                index ? <button type='button' onClick={()=> this.removeSet(index)}>Delete</button>
                                :null
                            }
                        </div>
                     
                )
                }
                <button type="button" onClick={() => this.addSet()}>Add Set</button>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}


export default AddWorkout;