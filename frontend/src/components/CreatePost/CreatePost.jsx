import axios from "../../utils/Axios/axios";
import React from "react";

import { useState } from "react";
const CreatePost = () => {
    // a local state to store the currently selected file.

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [content,setContent]=useState("");
    const [title,setTitle]=useState("")
    const userSaved = localStorage.getItem("token");
    const jwtToken = JSON.parse(userSaved);
    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("content",content);
      formData.append("title",title);
      try {
        const response = axios({
          method: "post",
          url: "/api/post",
          data: formData,
          headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
         },
        }) 
        setTimeout(function(){
          window.location.reload();
         },1000);
        
      } catch(error) {
        console.log(error)
      }
 

    }
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }

    return (
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileSelect} />
        <input type="text" name="title"  id="title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" name="content"  id="content" onChange={(e) => setContent(e.target.value)}/>
        
        <input type="submit" value="Envoi post"  />
      </form>
    )
  };
  
  export default CreatePost;