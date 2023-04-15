import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import Logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../../Utils/APIRoutes';

function Register() {

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
    password:  "",
    confirmPassword: ""
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()){
          const { password, username, email } = values;
          const {data} = await axios.post(registerRoute, {
            username,
            email,
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
            />
            <input
              className={styles.formInput}
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={styles.formInput}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button className={styles.formButton} type="submit">Create User</button>
            <span className={styles.formSpan}>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
