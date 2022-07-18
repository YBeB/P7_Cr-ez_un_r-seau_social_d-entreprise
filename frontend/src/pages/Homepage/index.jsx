import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import axios from "../../utils/Axios/axios";
const userSaved = localStorage.getItem("token");

const MYPROFILE = "api/user/myprofil";

const StyledButton = styled.button`
  background: ${colors.tertiary};
  font-size: 30px;
  color: white;
  display: flex;
  justify-content: end;
`;
const StyledDiv = styled.div`
  border: 50px;
  border-color: black;
  width: 150px;
  heigh: 150px;
`;

const jwtToken = JSON.parse(userSaved);
console.log(jwtToken);

function Homepage() {
  axios
    .get(MYPROFILE, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <div>
      <StyledDiv></StyledDiv>
    </div>
  );
}

export default Homepage;
