import { DataService } from "./dataService";
const authServices = {
  login: async (data) => {
    return DataService.post("/v1/user/signin", data);
  },

  registration: async (data) => {
    return DataService.post("/v1/user/signup", data);
  },
};

export default authServices;
