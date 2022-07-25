import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import axios from "../../utils/Axios/axios";
import ShowProfil from "../../components/ShowProfil/ShowProfil";
import ShowPost from "../../components/ShowPost/ShowPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import Deconnexion from "../../components/Disconnect/Disconnect";
import ProfilButton from "../../components/ProfilS/ProfilS";
const userSaved = localStorage.getItem("token");

const MYPROFILE = "api/user/myprofil";
const StyledButton = styled.button`
  background: ${colors.tertiary};
  font-size: 30px;
  color: white;
`;
const AllBody = styled.body`
height: 100%; 
margin:0;#f9f9fb
`;
const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: solid;
`;

const GlobalDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CreatePostDiv = styled.div``;

const ShowPostDiv = styled.div`
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const jwtToken = JSON.parse(userSaved);


function Homepage() {
  return (
    <AllBody>
      <div>
        <GlobalDiv>
          <CreatePostDiv>
            <CreatePost />
          </CreatePostDiv>

          <StyledDiv>
            <ProfilButton/>
            <Deconnexion/>
            <ShowProfil />
          </StyledDiv>
        </GlobalDiv>

        <ShowPostDiv>
          <ShowPost />
        </ShowPostDiv>
      </div>
    </AllBody>
  );
}

export default Homepage;
