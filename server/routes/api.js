
const User = require('../models/User');
const Exercise = require('../models/Exercise')
const jwt_decode =require("jwt-decode");
const { response } = require('express');
const { ObjectId } = require('mongodb');

async function LoginRegister(req,res){
  const token = req.body;

  const user= await User.findOne({Username: token.email});
  if(user){
//return user ID
console.log(user._id.valueOf());
    return res.json({status: "ok", data: `${user._id.valueOf()}`})
  }
  else{
    //create user
    try{
      await User.create({
        Username: token.email,
        name: token.name,
        Cycles:1
      })
      console.log("User created")
    }catch(error){
      console.log("Error: "+ error);
      return res.json({status: "error"});
    }
    //then check if token is valid
  }
  //return User ID
  console.log(await User.findOne({Username: token.email})._id);
  return res.json({status: "ok", data: `${user._id.valueOf()}`})
}
async function SubmitSet(req, res){
  const sub = req.body;
  const user= await User.findOne({Username: sub.email});
  let reps=[];
  let weight=[];
  console.log(sub);
  sub.sets.forEach(element => {
    reps.push(element.reps);
    weight.push(element.weight);
  });
  try{
    await Exercise.create({
      User_id: user._id.valueOf(),
      Date: sub.Date,
      Reps: reps,
      Weight:weight,
      Name: sub.Exercise,
      Variation: sub.Variation,
      Area_of_Focus: sub.AreaOfFocus
    })
    console.log("Exercise Added")
    return res.json({status:"ok"})
  }catch(error){
    console.log("Error: "+error);
    return res.json({status: "error"});
  }
}
async function GetWorkouts(req, res){
  
  Exercise.find({User_id: req.params.UserID}).distinct("Name").then( item =>{
    console.log(item);
    res.send({status: 'ok',workouts: item})
  }).catch ((err)=>{
    console.log("Error" + err);
    res.status(500)
  })
  
}
async function GetGraphData(req, res){
  Exercise.find({User_id:req.params.UserID, Name: req.params.Exer}).sort({Date:1}).then(item=>{
    console.log(item[0]);
    let data=[]
    for(let i=0; i<item.length;i++){
      //calcualte one rep max and add it and date to data, return data
   
      let orm=0;
      for( let j=0;j<item[i].Weight.length; j++){
          orm+=((item[i].Weight[j]*(36/(37-item[i].Reps[j])))+(item[i].Weight[j]*(31/30*item[i].Reps[j]))+((100*item[i].Weight[j])/(101.3-2.67123*item[i].Reps[j])))/3;
      }

      // console.log(d.toDateString());
      data=[...data,{x: item[i].Date, y:orm/3}];
    }
    res.send({status: 'ok', Data:data});
  })
}

async function EditExercise(req, res){
  const exer = await Exercise.findOne({User_id: req.body.UserID});
  // if(exer){
  // Exercise.updateOne({User_id: req.body.UserID},
  //   {$set: {`${req.body.Field}`: req.body.update}}).then( item =>{
  //   console.log(item);
  //   res.send({status: 'ok'})
  // }).catch ((err)=> {
  //   console.log("Error" + err);
  //   res.status(500);
  // })
// }
// else {
//   res.status({status:"Not found"})
// }
}

async function DeleteExercise(req, res){
  const exer = await Exercise.findOne({"_id" : ObjectId(`${req.body.id}`)});
  if(exer){
    Exercise.deleteOne({"_id" : ObjectId(`${req.body.id}`)})
    console.log("deleted")
    res.send({status:"Deleted"});
  }
  else{
    res.send({status:"Not found"})
  }
}



module.exports = {
  LoginRegister,
  SubmitSet,
  GetWorkouts,
  EditExercise,
  DeleteExercise,
  GetGraphData
};