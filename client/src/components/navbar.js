import React, { useContext } from "react";
import { Link,useNavigate} from "react-router-dom";
import { userContext } from '../App'

const NavBar = () => {
  const { state, dispatch } = useContext(userContext)
  let Navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li><Link to="/profile">Profile</Link ></li>,
        <li><Link to="/Create">Createpost</Link ></li>,
        <li><Link to="/myfollowerspost">My following Posts</Link ></li>,
        <li>
          <button  className="btn #f44336 red
"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              Navigate('/signin')
            }}

          >Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/signin">Signin</Link ></li>,
        <li><Link to="/signup">Signup</Link ></li>,
      ]
    }
  }



  return (
    <>
      <div>
        <nav>
          <div className="nav-wrapper white">
            <Link to={state ? "/" : "/signin"} style={{ marginLeft: "20px" }} className="brand-logo left">Fotogram</Link >
            <ul id="nav-mobile" className="right">
              {/* <li><Link to="/signin">Signin</Link ></li>
              <li><Link to="/signup">Signup</Link ></li>
              <li><Link to="/profile">Profile</Link ></li>
              <li><Link to="/Create">Createpost</Link ></li> */}
              {renderList()}
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}


export default NavBar;