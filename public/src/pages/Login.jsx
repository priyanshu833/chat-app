import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import bg from '../assets/bgg.jpeg'
import bgm from '../assets/bgg-mobile.jpeg'
// import '../pages/login.css'

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
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
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>
              Priyanshu's <br />
              Chit-chat
            </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${bg}); /* Default background image for desktops */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076; /* Semi-transparent background */
    border-radius: 2rem;
    padding: 5rem;
    width: 100%;
    max-width: 500px; /* Limit form width for larger screens */
  }

  input {
        background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset -3px -3px rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border: none;
    border-radius: 20px;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  /* Responsive Design for Mobile View */
  @media screen and (max-width: 768px) {
    background-image: url(${bgm}); /* Replace with your mobile-specific image */
    padding: 1rem; /* Add padding around the container for smaller screens */

    form {
      padding: 2rem; /* Reduce padding for smaller screens */
      gap: 1rem; /* Adjust the gap between form elements */
    }

    .brand img {
      height: 3rem; /* Reduce the size of the logo on smaller screens */
    }

    input, button {
      font-size: 0.9rem; /* Adjust font size for smaller screens */
      padding: 0.8rem; /* Adjust input/button padding */
    }

    span {
      font-size: 0.8rem; /* Adjust text size for the span */
    }
  }

  /* Additional Styles for Very Small Devices */
  @media screen and (max-width: 480px) {
    .brand img {
      height: 2.5rem; /* Further reduce logo size */
    }

    form {
      padding: 1.5rem; /* Smaller padding for very small devices */
    }

    input, button {
      font-size: 0.8rem; /* Further reduce font size */
    }
  }
`;
