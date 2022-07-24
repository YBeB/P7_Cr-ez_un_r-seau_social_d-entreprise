import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/family-using-computer.jpg";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../utils/Axios/axios";

const LOGIN_URL = "/api/user/login";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 750px;
  font-size: 25px;
  justify-content: center;
  padding: 0% 0% 0% 10%;
  @media screen and (max-width: 425px) {
    width: 80%;
  }
`;
const InputStyle = styled.input`
  height: 30px;
  margin: 10px;
`;
const ButtonStyle = styled.button`
  height: 30px;
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const Navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      localStorage.setItem('token',JSON.stringify(response.data.token))
      localStorage.setItem('userId',JSON.stringify(response.data.userId))
      Navigate("/home")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Le Serveur ne reponds pas");
      } else if (err.response?.status === 400) {
        setErrMsg("Mot de passe ou Email manquant");
      } else if (err.response?.status === 401) {
        setErrMsg("Non autorisé");
      } else {
        setErrMsg("Connexion échoué");
      }
      errRef.current.focus();
    }
  };

  return (

    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="Login">
        <FormStyle onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <InputStyle
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <InputStyle
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <ButtonStyle>Connexion</ButtonStyle>
        </FormStyle>
      </div>
    </div>
  )
}

export default Login;