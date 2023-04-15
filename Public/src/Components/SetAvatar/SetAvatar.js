import React, { useEffect, useState } from "react";
// import styles from "./SetAvatar.module.css"
import './SetAvatar.css'
import axios from "axios";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../Utils/APIRoutes";

export default function SetAvatar() {

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const myFunction1 = () => {
    const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
    if (!currentUser) navigate("/login");
  }

  useEffect(() => {
    myFunction1();
  });

  
  const setProfilePicture = async () => {
    console.log("123")
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      console.log("123456")
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      console.log(user)
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data)

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  

  const myFunction = () => {
    let data = [];
    const avatarURL = 'https://api.multiavatar.com/'
    for (let i = 0; i < 4; i++) {
      let rand = Math.round(Math.random() * 1000000)
      const url = `${avatarURL}${rand}.png`
      data.push(url)
    }
    setAvatars(data);
    setIsLoading(false);

  }

  useEffect(() => {
    myFunction();
  }, []);

  

  return (
    <>

      {isLoading ? (
        <div className="setavatar">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="setavatar"> 
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
