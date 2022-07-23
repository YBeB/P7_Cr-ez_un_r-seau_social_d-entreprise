import React from "react";
import axios from "../../utils/Axios/axios";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);
const SHOWPOST="/api/post";

const PostImage=styled.img`
width:150px;
`
const StyledBoxPost=styled.div`
border:solid;
border-radius:12px;
border-color:#4e5166;
height:100%;
margin:0px;
margin-bottom:10px;
`
const StyledHun=styled.h1`
font-size:1.2rem
`
function ShowPost(){
const [Posts,SetPost]=useState([]);
const fetchPoste=async()=>{
axios
.get(SHOWPOST, {
  headers: { Authorization: `Bearer ${jwtToken}` },
})
.then((res) => {
    SetPost(res.data)
    

 
})
.catch((error) => {
  console.error(error);
});}
useEffect(() => {
  fetchPoste();
}, []);


const deletePost=(id)=> {
console.warn(id)
axios
.delete(`api/post/${id}`,{headers: { Authorization: `Bearer ${jwtToken}` }})
.then(()=>{alert("Post Supprimé")})
}


return(

<div>
{Posts.map((Post)=>( <StyledBoxPost key={Post.id}><StyledHun >{Post.title}</StyledHun><p>{Post.content}</p><PostImage src={Post.imagePost} alt=""/><FaHeart/>:{Post.like}<button onClick={()=>deletePost(Post.id)} ></button></StyledBoxPost>))}






</div>

)
}

export default ShowPost