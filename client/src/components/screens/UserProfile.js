import React, { useEffect, useState, useContext } from "react";
import { userContext } from '../../App'
import { useParams } from 'react-router-dom'


const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const [showfollow,setShowFollow] = useState(true)
    const { state, dispatch } = useContext(userContext)
    const { userid } = useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setProfile(result)
            })
    }, [])



    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {


                //console.log(data)
                dispatch({ type: "UPDATE", payload: {followers: data.followers,following: data.following } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState)=>{
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:[...prevState.user.followers,data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {


                //console.log(data)
                dispatch({ type: "UPDATE", payload: {followers: data.followers,following: data.following } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState)=>{
                    const newFollower=prevState.user.followers.filter(item=>item != data._id)
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:newFollower
                        }
                    }
                })
                setShowFollow(true)
            })
    }
    return (
        <>
            {userProfile ?

                <div style={{ maxWidth: "1400px", margin: "0px auto" }}>
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
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "109%" }}>
                                <h6 style={{ width: "80px" }}>{userProfile.posts.length} posts</h6>
                                <h6 style={{ marginLeft: "3%", width: "129px" }}>{userProfile.user.followers.length}  followers</h6>
                                <h6 style={{ marginLeft: "1%", width: "129px" }}>{userProfile.user.following.length}  following</h6>
                                </div>
                                {showfollow?
                                <button style ={{
                                    margin:"10px"
                                }}className="btn btn-primary"
                                    onClick={() => followUser()}
                                >Follow</button>
                                :
                                <button style ={{
                                    margin:"10px"
                                }}className="btn btn-primary"
                                    onClick={() => unfollowUser()}
                                >unFollow</button>
                                }
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }

                    </div>
                </div>



                : <h2>loading.....</h2>}

        </>


    )
}

export default Profile