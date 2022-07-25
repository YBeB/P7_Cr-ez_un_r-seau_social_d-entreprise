import axios from "../../utils/Axios/axios";

const userSaved = localStorage.getItem("token");
const jwtToken = JSON.parse(userSaved);
function DeleteAccountButton(){
const deleteAccount = () => {

    axios
      .delete(`api/user/delete`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        alert("Compte supprimé");
        document.location.reload(true)
        localStorage.clear()
      });

  };return(
    <div>
    <button onClick={deleteAccount}>Supprimer son compte</button>
    </div>
    )}

  export default DeleteAccountButton