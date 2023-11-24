import axios from "axios";

axios.defaults.baseURL = "https://glowbystef-40c11c2d1169.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
