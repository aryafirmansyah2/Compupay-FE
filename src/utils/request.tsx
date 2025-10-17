import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  // baseURL: 'https://localhost:7023/api/',
  timeout: 60000 * 5,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Credentials": "true",
  },
});

const requestHandler = (request) => {
  const token = Cookies.get("token");

  if (token !== undefined) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

// const expiredTokenHandler = () => {
//   // store.dispatch(getLoginData({}))
//   localStorage.clear();
//   Cookies.remove("token");
//   window.location.href = "/login";
//   // return error;
// };

const errorHandler = (error: any) => {
  if (error.response && error.response.status === 401) {
    // expiredTokenHandler();
  } else if (error.code === "ERR_NETWORK") {
    // window.history.pushState({}, "Redirect Network Error", "/login");
    console.log(error);
    if (error.response.status === 401) {
      //   expiredTokenHandler();
    }
  }
  throw error; // ✅ ini yang benar
};

request.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (url: string, params?: any, headers = {}) =>
    request({ method: "get", url, params, headers }),
  post: (url: string, data: any, headers = {}) =>
    request({ method: "post", url, data, headers }),
  put: (url: string, data: any, headers: any) =>
    request({ method: "put", url, data, headers }),
  delete: (url: string, data: any) => request({ method: "delete", url, data }),
  setToken: (token) => {
    if (token) {
      request.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete request.defaults.headers.common.Authorization;
    }
  },
};
