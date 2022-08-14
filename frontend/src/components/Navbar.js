import React, {useState, useEffect, useCallback} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import "./Navbar.css";

function Navbar(){
    const [ user, setUser ] = useState({});
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        callback: handleCallbackResponse
      });
      const loggedInUser = localStorage.getItem("user");
      if(loggedInUser){
        checkLogin(loggedInUser);
        document.getElementById("Signout").hidden=false;
        document.getElementById("SigninLi").hidden=true;
      }
      if(!loggedInUser){
        // document.getElementById("SigninLi").hidden=false;
        // google.accounts.id.prompt();
        // console.log("in not logged in")
        document.getElementById("Signout").hidden=true;
        document.getElementById("SigninLi").hidden=false;
       }
      google.accounts.id.renderButton(
        
        document.getElementById("signInDiv"),//change getElementbyId
        {theme: "outline", size: "large"}
      );
      
    //   document.getElementById("SigninLi").hidden=true;//change Hidden
      // console.log(loggedInUser);
      
  
    }, []);
   
    async function handleCallbackResponse(response){
      // console.log("Encode JWT ID token: "+ response.credential);
      var userObject = jwt_decode(response.credential);
      // console.log(userObject);
      setUser(userObject);
      localStorage.setItem('user',JSON.stringify(userObject));
      document.getElementById("SigninLi").hidden=true;
      document.getElementById("Signout").hidden=false;
      return fetch('http://localhost:8080/signInUser',{
        method: 'Post',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(userObject) 
      }).then((res)=>res.json())
      .then((objectId)=>{
        // console.log(objectId.data);
        localStorage.setItem('UserId', objectId.data);
        console.log(localStorage.getItem('UserId'));
      })
      
    }
    function checkLogin(userObject){
      //if valid
      // console.log(JSON.parse(userObject));
      setUser(JSON.parse(userObject));
      document.getElementById("SigninLi").hidden=true;//change hidden

      //if not valid
      //    handlSignout
    }
    function handlSignOut(event){
      setUser({});
      localStorage.clear();
      document.getElementById("Signout").hidden=true;
      document.getElementById("SigninLi").hidden=false;//change hidden
    }

  // If we have no user: sigin button
  // If we have a user: show the logout button
  return(
    <nav className='navbar'>
        <ul className='navbar-items-left'>
            <li>
                <a href='/' className='navbar-link'>
                    Add
                </a>
            </li>
            <li>
                <a href='/Progress' className='navbar-link'>
                    Progress
                </a>
            </li>
            <li>
              <a href='/Previous' className='navbar-link'>
                Previous
              </a>
            </li>
        </ul>
        <ul className='navar-items-right'>
            <li id='Signout'>
                <button className='navbar-link logout' onClick={handlSignOut}>
                    Logout
                </button>
            </li>
            <li id='SigninLi'>
                <div id="signInDiv" ></div>
            </li>
        </ul>
    </nav>

  )
}

export default Navbar;

//{/* <div id="signInDiv"></div>
//{ Object.keys(user).length != 0 && 
// <button onClick={ (e) => handlSignOut(e)}>Sign Out</button>
//} 
//{ { user &&
// <div>
//   <img src={user.picture}></img>
//   <h3>{user.name}</h3>
// </div>
//}
