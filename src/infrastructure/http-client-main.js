import axios from "axios";
import { BASE_URL } from '../shared/constants/api-urls';
import toast  from "@/shared/components/toast";

const mainApi = axios.create({
  baseURL: BASE_URL,
});
mainApi.interceptors.response.use(
  function (response) {
    toast.success(response.data.message);
    return response;
  },
  function (error) {
    const response = error.response;
    toast.error(response.data.message);
    return Promise.reject(error);
  }
);
export default mainApi;
