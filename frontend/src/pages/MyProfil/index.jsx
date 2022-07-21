import React from "react";
import ToggleImage from "../../components/ToggleImageProfil/ToggleImageProfil";
import axios from "../../utils/Axios/axios";
const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);

const MYPROFILE = "api/user/myprofil";
function Myprofil(){
axios
.get(MYPROFILE, {
  headers: { Authorization: `Bearer ${jwtToken}` },
})
.then((res) => {
window.username=res.data.username
})
.catch((error) => {
  console.error(error);
});

return(
<div>

<ToggleImage/>
</div>



)




}
export default Myprofil