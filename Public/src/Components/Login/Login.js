import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import Logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../../Utils/APIRoutes';

function Login() {

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  const [values, setValues] = useState({
    username: "",
    email: "",
  })

  const myFunction1 = () => {
    const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
    if (currentUser) navigate("/");
  }

  useEffect(() => {
    myFunction1();
  });


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleValidation = () => {
    const { password, username} = values;
    if (password === "") {
      toast.error(
        "Email and Password are required.",
        toastOptions
      );
      return false;
    } else if (username.length === "") {
      toast.error(
        "Email and Password are required.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()){
          const { password, username } = values;
          const {data} = await axios.post(loginRoute, {
            username,
            password,
          });

          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
            navigate("/");
          }

        }

        
    }

  

  return (
    <>
      <div className={styles.register}>
        <form className={styles.registerForm} onSubmit={(event)=> handleSubmit(event)}>
          <div className={styles.brand}>
              <img src={Logo} alt="Logo" />
              <h1>
                  Snappy
              </h1>
          </div>
          <input
              className={styles.formInput}
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            
            <button className={styles.formButton} type="submit">Login In</button>
            <span className={styles.formSpan}>
              Don't have an account ? <Link to="/register">Register.</Link>
            </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login



