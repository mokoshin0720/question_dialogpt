import axios from "axios";

const instance = axios.create({
    "baseURL": "http://0.0.0.0:8000/api",
})

// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post["Access-Control-Allow-Headers"] = "*"

export default instance