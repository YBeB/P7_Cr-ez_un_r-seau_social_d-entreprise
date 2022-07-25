import React from 'react';
import axios from '../../utils/Axios/axios';



const ToggleImage = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [username,setUsername]=React.useState("")
    const userSaved = localStorage.getItem("token");
    const jwtToken = JSON.parse(userSaved);
    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append('username',username)
      try {
        const response = axios({
          method: "put",
          url: "/api/user/change",
          data: formData,
          headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`
         },
        });        setTimeout(function(){
          window.location.reload();
         },1000);
      } catch(error) {
        console.log(error)
      }
    }
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' onChange={(e)=>setUsername(e.target.value)}/>
        <input type="file" name="image" onChange={handleFileSelect} />
        <input type="submit" value="Submit" />
      </form>
    )
  };
  
  export default ToggleImage;