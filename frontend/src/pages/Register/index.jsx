import React from 'react';
import styled from "styled-components";
const FormStyle=styled.form`
display:flex;
flex-direction:column;
width:20%;
height:750px;
font-size:25px;
justify-content:center;
padding:0% 0% 0% 10%;

`
const InputStyle=styled.input`
height:30px;

`




function Register() {
return(
<div className='Register'>
<FormStyle method="post" >

<label htmlFor="">Identifiant</label>
<InputStyle type="text" className='FormAw'/>

<label htmlFor="">Email</label>
<InputStyle type="email" className='FormAw'/>

<label htmlFor="">Mot de passe</label>
<InputStyle type="password" className='FormAw'/>

</FormStyle>

</div>


)


}

export default Register