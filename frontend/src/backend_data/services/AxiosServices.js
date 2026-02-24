
import axios from "axios";

export default class AxiosServices {
  post(url, data, isRequired = false, header) {
    return axios.post(url, data, isRequired ? header : {});
  }
}
