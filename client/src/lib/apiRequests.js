import axios from "axios";

const apiRequests = axios.create({baseURL:"http://localhost:8500/api",withCredentials:true,});

export default apiRequests;