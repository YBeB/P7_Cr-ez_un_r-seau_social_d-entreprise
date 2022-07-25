import React from "react";
import { Navigate } from "react-router-dom";

const  Deconnexion=()=>{
function clearLocalStorage(){
    localStorage.clear()
    window.location.reload();

}

return(
    <div>
<button onClick={clearLocalStorage}>Déconnexion</button>
</div>)
}
export default Deconnexion


