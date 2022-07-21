import React from 'react';
import axios from '../../utils/Axios/axios';



const ToggleImage = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
    const userSaved = localStorage.getItem("token");
    const jwtToken = JSON.parse(userSaved);
    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const response = axios({
          method: "put",
          url: "/api/user/change",
          data: formData,
          headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`
         },
        });
      } catch(error) {
        console.log(error)
      }
    }
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileSelect} />
        <input type="submit" value="Upload File" />
      </form>
    )
  };
  
  export default ToggleImage;