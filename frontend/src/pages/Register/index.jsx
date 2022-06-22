import React from 'react';
import styled from "styled-components";
import BackgroundImage from "../../assets/family-using-computer.jpg"
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
margin:10px;
`
const BodyStyle=styled.body`
background-image:${BackgroundImage}
`



function Register() {
return(
<BodyStyle>
<div style={{ 
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
      }}>
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
</div>
</BodyStyle>

)


}

export default Register