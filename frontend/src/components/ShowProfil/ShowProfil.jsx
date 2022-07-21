import React from "react";
import { useEffect,useState } from "react";
import axios from "../../utils/Axios/axios";
import { ReactDOM } from "react";
const SHOWPROFIL="/api/user/myprofil";
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);
function ShowProfil(){
    const [profil, setProfil] = useState([]);
  console.log(SHOWPROFIL)
    useEffect(()=>{
    axios
    .get(SHOWPROFIL, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    .then((res) => {
       setProfil(res.data)
       console.log(res.data)
      const image=document.getElementById('image');
      image.src=res.data.imageProfile;

      // const image=this.refs('image');
      // image.src=res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  },[])
  console.log('FinPhotoProfil')
return(
    <div>
    <img src={profil.imageProfil} id="image" alt="profil"/>
    <p>{profil.username}</p>
    </div>
)




}

export default ShowProfil