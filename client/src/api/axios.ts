import axios from "axios";
import {AxiosInstance} from "axios"

const instance: AxiosInstance  = axios.create({
    baseURL: "http://localhost:2000/api",
    headers: {
        'Content-Type': 'application/json',
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 10000
});

instance.interceptors.request.use(
    (request) => {
      request.headers["Authorization"] = "Bearer " + sessionStorage.getItem("token")
      return request
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default instance;