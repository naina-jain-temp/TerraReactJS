import axios from "axios";
import Storage from "../Storage/Storage";

const REACT_APP_API_BASEURL = process.env.REACT_APP_API_BASEURL;

const client = axios.create({
  baseURL: REACT_APP_API_BASEURL,
  withCredentials: false,
});

const header = () => {
  let auth_token = Storage.get("token").token;
  let headers = {
    "Content-Type": "application/json",
    // Accept: "application/json",
    // crossDomain: true,
  };

  if (auth_token) {
    headers["Authorization"] = auth_token;
  }
  return headers;
};

class DataService {
  // GET --
  static get(path = "", params = false, optionalHeader) {
    if (params) {
      params = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    }
    return client({
      method: "GET",
      url: params ? path + "?" + params : path,
      headers: header(optionalHeader),
    });
  }

  // POST--'''

  static post(path = "", data = {}, optionalHeader) {
    return client({
      method: "Post",
      url: path,
      data,
      headers: header(optionalHeader),
    });
  }

  //patch
  static patch(path = "", data = {}, optionalHeader) {
    return client({
      method: "PATCH",
      url: path,
      data,
      headers: header(optionalHeader),
    });
  }

  //put

  static put(path = "", data = {}, optionalHeader) {
    return client({
      method: "PUT",
      url: path,
      data,
      headers: header(optionalHeader),
    });
  }

  //Delete

  static delete(path = "", data = {}, optionalHeader) {
    return client({
      method: "Delete",
      url: path,
      data,
      headers: header(optionalHeader),
    });
  }
}

client.interceptors.request.use((config) => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response, config } = error;
    if (response && config.url === "/") {
      if (response.result.statusCode === 401) {
        Storage.remove("token");
        window.location.href = "/login"
      }
      return response.result;
    } else {
      if (response && response.result) {
        return response.result;
      } else {
        return false;
      }
    }
  }
);
export { DataService };
