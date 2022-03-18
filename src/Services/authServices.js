import { DataService } from "./dataService";
const authServices = {
  loginApi: async (data) => {
    return DataService.post("/v1/user/signin", data);
  },

  registrationApi: async (data) => {
    return DataService.post("/v1/user/signup", data);
  },

  checkResponseApi: async (data) => {
    return DataService.post("/v1/user/checkResponseValidity", data);
  },

  submitResponseApi: async (data) => {
    return DataService.post("/v1/user/submitResponse", data);
  },
};

export default authServices;
