import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import './Logout.css';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
        navigate("/login");
        // const id = await JSON.parse(
        // localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        // )._id;
        // const data = await axios.get(`${logoutRoute}/${id}`);
        // if (data.status === 200) {
        // localStorage.clear();
        // navigate("/login");
        // }
    };
  return (
    <div className="logoutButton" onClick={handleLogout}>
      <BiPowerOff />
    </div>
  )
}

export default Logout
