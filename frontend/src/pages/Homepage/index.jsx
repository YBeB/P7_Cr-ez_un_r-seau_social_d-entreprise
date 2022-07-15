import React from "react";
import styled from 'styled-components';
import colors from "../../utils/style/colors";

const userSaved=localStorage.getItem('token')

const StyledButton=styled.button`
background:${colors.tertiary};
font-size: 30px;
color :white;
display:flex;
justify-content:end;
`
const StyledDiv=styled.div`
border:50px;
border-color:black;
width:150px;
heigh:150px;
`


const jwtToken  = JSON.parse(userSaved)
console.log(jwtToken)
fetch('http://127.0.1:3000/api/user/myprofil', {
    method: 'GET',
    headers: {
       Authorization: `${jwtToken}`
       
    },
    
  }).then(function (response) {

    return response.json();
})
.then(function(data){
console.log(data)
})

function Homepage(){
    


    return(
<div>
<StyledDiv>


</StyledDiv>

</div>
)


}

export default Homepage