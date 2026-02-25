import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default class AxiosServices {

  post(url, data, isRequired = false, header) {
    return API.post(url, data, isRequired ? header : {});
  }

  get(url, isRequired = false, header) {
    return API.get(url, isRequired ? header : {});
  }

  put(url, data, isRequired = false, header) {
    return API.put(url, data, isRequired ? header : {});
  }

  delete(url, isRequired = false, header) {
    return API.delete(url, isRequired ? header : {});
  }

}
