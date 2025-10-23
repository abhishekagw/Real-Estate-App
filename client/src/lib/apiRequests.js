import axios from "axios";

const apiRequests = axios.create({baseURL:"https://real-estate-app-backend-qe8q.onrender.com/api",withCredentials:true,});

export default apiRequests;
