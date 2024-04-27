import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
    let Navigate = useNavigate();
    const [name,setName]= useState("")
    const [password,setPassword]= useState("")
    const [email,setEmail]= useState("")
    const PostData =()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:data.message,classes:"#00e676 green accent-3"})
                Navigate('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input field">
                <h2>Fotogram</h2>
                <input
                   type="text"
                   placeholder="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)
                }
               />
                    <input
                    style={{marginTop:"20px"}}
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                 

                <button onClick={()=>PostData()} style={{marginTop:"20px"}} className="btn waves-effect waves-light #2196f3 blue">SignUp</button>
                

             
             <h5> 
                <Link to="/signin">Already Have an account?</Link>
             </h5>
            </div>
        </div>

    )
}

export default SignUp