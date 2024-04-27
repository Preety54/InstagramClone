import React,{useEffect,createContext,useReducer,useContext}from "react";
import NavBar from './components/navbar'
import "./App.css"
import {
 //BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  useNavigate,
  Routes
} from "react-router-dom";
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import  Createpost from './components/screens/Createpost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribeUserPosts from './components/screens/SubscribeUserPosts'

export const userContext = createContext()

const Routing =()=>{
  const Navigate = useNavigate()
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      Navigate('/signin')
    }
  },[])

  return(
        
    <Routes>
        <Route exact path="/" element={<Home />}>home</Route>
        <Route exact path="/signin" element={<Signin />}>login</Route>
        <Route exact path="/signup" element={<Signup />} >signup</Route>
        <Route exact path="/profile" element={<Profile />} >profile</Route>
        <Route exact path="/Create" element={<Createpost />} >Createpost</Route>
        <Route exact path="/profile/:userid" element={<UserProfile />} >UserProfile</Route>
        <Route exact path="/myfollowerspost" element={<SubscribeUserPosts />} >UserProfile</Route>
      </Routes>
  
  )

}
function App() {
  const [state,dispatch]= useReducer(reducer,initialState)
  return (
    <>
    <userContext.Provider value ={{state,dispatch}}>

      <NavBar />
      
      <Routing />
      </userContext.Provider>

    </>
  );
}

export default App;
