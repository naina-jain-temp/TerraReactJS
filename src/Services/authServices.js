import { DataService } from "./dataService";
const authServices = {
  loginApi: async (data) => {
    return DataService.post("/v1/user/signin", data);
  },

  registrationApi: async (data) => {
    return DataService.post("/v1/user/signup", data);
  },
};

export default authServices;
