

import AxiosServices from "./AxiosServices";
import configuration from "../configuration/configuration";

const AxiosService = new AxiosServices();

export default class AuthService {
  SignUp(data) {
    return AxiosService.post(configuration.SignUp, data, false);
  }

  SignIn(data) {
    return AxiosService.post(configuration.SignIn, data, false);
  }
}
