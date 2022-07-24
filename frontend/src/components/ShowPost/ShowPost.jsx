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
      });
  };

  


  return (
    <div>
      {Posts.map((Post) => (
        <StyledBoxPost key={Post.id}>
          <AnotherDivPost>
            <WidthDiv>
              <StyledHun>{Post.title}</StyledHun>
              <p>{Post.content}</p>
              <PostImage src={Post.imagePost} alt="" />
              <button onClick={() => deletePost(Post.id)}>Supprimé</button>
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
