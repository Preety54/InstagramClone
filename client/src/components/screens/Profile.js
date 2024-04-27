import React, { useEffect,useState,useContext } from "react";
import {userContext} from '../../App'

const Profile = () => {
    const [mypics,setpics]= useState([])
    const {state,dispatch} =useContext(userContext)
    console.log(state)
    useEffect(()=>{
      fetch('/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        setpics(result.mypost)
      })
    },[])
    return (
        <div style={{maxWidth:"1400px",margin:"0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ width: "260px", height: "260px", borderRadius: "130px" }}
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="u8hu"
                    />
                </div>
                <div style={{ marginRight: "51%" }}>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "109%" }}>
                        <h6 style={{ width: "80px" }}>{mypics.length}posts</h6>
                        <h6 style={{ marginLeft: "3%", width: "129px" }}>{state?state.followers.length:"0"} followers</h6>
                        <h6 style={{ marginLeft: "1%", width: "129px" }}>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id}className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
               

            </div>
        </div>
    )
}

export default Profile