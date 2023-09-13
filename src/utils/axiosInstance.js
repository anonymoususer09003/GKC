import axios from "axios";

const Axios = axios.create({
  baseURL: "https://staging-api.geekkidscode.com",
});

export default Axios;
