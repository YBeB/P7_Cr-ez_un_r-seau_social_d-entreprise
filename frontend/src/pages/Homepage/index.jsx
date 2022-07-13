import React from "react";
import styled from 'styled-components';
import colors from "../../utils/style/colors";
import axios from "../../utils/Axios/axios";

const POSTE_URL="api/post"
const userSaved=JSON.parse(localStorage.getItem('user'));
const StyledButton=styled.button`
background:${colors.tertiary};
font-size: 30px;
color :white;
display:flex;
justify-content:end;
`

let user={
'username':userSaved.username,
'image':userSaved.imageProfil,
}

function Homepage(){
    


    return(
<div>
<div>
<p>{user.username}</p>
<img src={user.image} alt="Profil"/>
</div>
<StyledButton>Deconnexion</StyledButton>


</div>
)


}

export default Homepage