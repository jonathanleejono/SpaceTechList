import axios from "axios";
import { baseUrl } from "constants/apiUrls";

const customFetch = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default customFetch;
