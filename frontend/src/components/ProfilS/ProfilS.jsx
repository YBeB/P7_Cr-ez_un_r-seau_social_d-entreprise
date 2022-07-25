import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
const  ProfilButton=()=>{
    const Navigate =useNavigate("");
function Redirect(){

  Navigate("/myprofil")

}

return(

<button onClick={Redirect}>Mon Profil</button>
)
}
export default ProfilButton


