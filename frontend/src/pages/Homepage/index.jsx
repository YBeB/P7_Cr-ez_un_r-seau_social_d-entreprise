import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import axios from "../../utils/Axios/axios";
import ShowProfil from "../../components/ShowProfil/ShowProfil";
const userSaved = localStorage.getItem("token");





const MYPROFILE = "api/user/myprofil";
const StyledButton = styled.button`
  background: ${colors.tertiary};
  font-size: 30px;
  color: white;

`;
const StyledDiv = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items: flex-end;
 `

 
const GlobalDiv=styled.div`display:flex;
justify-content:space-around;
`


const ProfilePicture=styled.img`
width:75px;
height:75px;

`

const jwtToken = JSON.parse(userSaved);

function Homepage() {




  return (

      <GlobalDiv>
      <StyledDiv>
      <ShowProfil/>
      </StyledDiv>
      </GlobalDiv>

  );
}

export default Homepage;
