import React, { useState,useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from "../../App";
import M from 'materialize-css'


const SignIn = () => {
    const { state, dispatch } = useContext(userContext)
    const Navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))

                    dispatch({ type: "USER", payload: data.user })

                    M.toast({ html: "signedin successfully", classes: "#00e676 green accent-3" })
                    Navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input field">

                <h2>Fotogram</h2>
                    <input
                        style={{ marginTop: "20px" }}
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        
                    />
                    <button  className="btn btn-primary" 
                     onClick={()=>PostData()}
                     >SignIn</button>
                     <h5>
                        <Link to ="/signup">Dont have an account?</Link>
                     </h5>
                
            </div>
        </div>

    )
}

export default SignIn