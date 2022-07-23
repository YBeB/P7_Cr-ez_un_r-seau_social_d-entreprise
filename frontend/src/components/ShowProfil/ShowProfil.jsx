import React from "react";
import { useEffect,useState } from "react";
import axios from "../../utils/Axios/axios";
import styled from "styled-components";

const SHOWPROFIL="/api/user/myprofil";
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);

const SizedImage=styled.img`width:140px`

const UsernameParagraph=styled.p`display:flex;
`
function ShowProfil(){
    const [profil, setProfil] = useState([]);
    useEffect(()=>{
    axios
    .get(SHOWPROFIL, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    .then((res) => {
       setProfil(res.data)
      const image=document.getElementById('image');
      image.src=res.data.imageProfile;

      // const image=this.refs('image');
      // image.src=res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  },[])
return(
    <div>
    <SizedImage src={profil.imageProfil} id="image" alt="profil"/>
    <UsernameParagraph>{profil.username}</UsernameParagraph>
    </div>
)




}

export default ShowProfil