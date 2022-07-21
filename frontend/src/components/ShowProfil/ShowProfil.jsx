import React from "react";
import { useEffect,useState } from "react";
import axios from "../../utils/Axios/axios";
import { ReactDOM } from "react";
const SHOWPROFIL="/api/user/myprofil"
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);
function ShowProfil(){
    const [profil, setProfil] = useState([]);

    useEffect(()=>{
    axios
    .get(SHOWPROFIL, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    .then((res) => {
       setProfil(res.data)
    })
    .catch((error) => {
      console.error(error);
    });
  },[])
return(
    <div>
    <img src={profil.imageProfil} alt="profil"/>
    <p>{profil.username}</p>
    </div>
)




}

export default ShowProfil