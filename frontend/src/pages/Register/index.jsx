import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/family-using-computer.jpg";
import axios from "../../utils/Axios/axios";
import { useRef, useState, useEffect } from "react";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const REGISTER_URL = "/api/user/signup";
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

const StyledParagraph = styled.p`
  text-shadow: 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white,
    0 0 2px white;

  font-size: 22px;
`;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USERNAME_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Champs mal renseigné");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
        
      );
      console.log(response?.data);
      console.log(response?.token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setEmail("");
      setPassword("");
    
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Aucune réponse serveur");
      } else if (error.response?.status === 401) {
        setErrMsg("Identifiant déjà enregistré");
      } 
      else {
        setErrMsg("Adresse Mail déjà enregistré");
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
          <div className="Register">
            <FormStyle onSubmit={handleSubmit}>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <label htmlFor="username">Identifiant</label>
              <InputStyle
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={username}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <StyledParagraph
                id="uidnote"
                classname={
                  userFocus && username && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                4 a 24 caracteres.
                <br />
                l'identifiant dois commencé par une lettre
                <br />
                Les lettres , nombres et tirets sont accéptés
              </StyledParagraph>
              <label htmlFor="">Email</label>
              <InputStyle
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <StyledParagraph
                id="emailnote"
                classname={
                  emailFocus && email && !validEmail? "instructions" : "offscreen"}>
                Entrer une adresse Mail Valide exemple =jeandupont@live.fr
              </StyledParagraph>
              <label htmlFor="">Mot de passe</label>
              <InputStyle
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />

              <ButtonStyle >Inscription</ButtonStyle>
            </FormStyle>
          </div>
        </div>
      )}

export default Register;
