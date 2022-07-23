import { useState,useEffect } from "react";
import React from "react";
import axios from "../../utils/Axios/axios";


const useLikes = async (id) =>{
const [like,setLike]=useState(0)
const response = await axios.post("/:postId/like");
return response.data;

}
