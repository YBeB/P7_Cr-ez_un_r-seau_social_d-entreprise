import React from "react";
import axios from "../../utils/Axios/axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);
const SHOWPOST = "/api/post";

const PostImage = styled.img`
  width: 150px;
`;

const AnotherDivPost = styled.div``;
const StyledBoxPost = styled.div`
  border: solid;
  border-radius: 12px;
  border-color: #4e5166;
  height: 100%;
  margin: 0px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
const StyledHun = styled.h1`
  font-size: 1.2rem;
`;

const ImageProfilPost = styled.img`
  width: 5rem;
`;
const StyledProfill = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: end;
  border: solid;
`;

const WidthDiv = styled.div`
  width: 70%;
`;

function ShowPost() {
  const [Posts, SetPost] = useState([]);
  const fetchPoste = async () => {
    axios
      .get(SHOWPOST, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => {
        SetPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchPoste();
  }, []);

  const deletePost = (id) => {
    console.warn(id);
    axios
      .delete(`api/post/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        alert("Post Supprimé");
        document.location.reload(true)
      });

  };

  const LikingPost = (id) => {
    axios.post(`api/post/${id}/like`,{
      headers: { Authorization: `Bearer ${jwtToken}` },
    })

}



  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [content,setContent]=useState("");
  const [title,setTitle]=useState("")
  const userSaved = localStorage.getItem("token");
  const jwtToken = JSON.parse(userSaved);
  const handleSubmit = (id) => (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("content",content);
    formData.append("title",title);
    try {
      const response = axios({
        method: "put",
        url: `/api/post/${id}`,
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
    <div>
      {Posts.map((Post) => (
        <StyledBoxPost key={Post.id}>
          <AnotherDivPost>
            <WidthDiv>
              <StyledHun>{Post.title}</StyledHun>
              <p>{Post.content}</p>
              <PostImage src={Post.imagePost} alt="" />
              <form id="ModPost" onSubmit={handleSubmit(Post.id)} >
              <input type="text" name="title"  id="title" onChange={(e) => setTitle(e.target.value)}/>
              <input type="file" name="image" onChange={handleFileSelect}/>
                <input type="text" name="content"  id="content" onChange={(e) => setContent(e.target.value)}/>
                <input type="submit" value="ModifyPost"   />
              </form>
              <button onClick={() => deletePost(Post.id)}>Supprimé</button>
              <button onClick={()=>LikingPost(Post.id) }>Like</button>
            </WidthDiv>
          </AnotherDivPost>
          <StyledProfill>
            <ImageProfilPost src={Post.User.imageProfile} alt="" />
            <p>{Post.User.username}</p>
          </StyledProfill>
        </StyledBoxPost>
      ))}
    </div>
  );
}

export default ShowPost;
