import axios from "axios";
const create = axios.create({
  baseURL: "http://localhost:5000",
});
export default create;
