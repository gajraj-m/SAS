// import { SERVER_URL } from "@env";
import axios from "axios";

const API = axios.create({
  baseURL: "https://sasserver.onrender.com",
  // baseURL: "http://localhost:5000",
});

export default API;
