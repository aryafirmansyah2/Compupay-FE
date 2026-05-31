import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

const api = axios.create({
  baseURL,
  timeout: 30000,
});

function expiredTokenHandler() {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("position");

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      expiredTokenHandler();
    }

    return Promise.reject(error);
  },
);

const request = {
  get: (url: string, params?: any, headers = {}) => {
    return api({
      method: "get",
      url,
      params,
      headers,
    });
  },

  post: (url: string, data?: any, config = {}) => {
    return api({
      method: "post",
      url,
      data,
      ...config,
    });
  },

  put: (url: string, data?: any, config = {}) => {
    return api({
      method: "put",
      url,
      data,
      ...config,
    });
  },

  patch: (url: string, data?: any, config = {}) => {
    return api({
      method: "patch",
      url,
      data,
      ...config,
    });
  },

  delete: (url: string, params?: any, headers = {}) => {
    return api({
      method: "delete",
      url,
      params,
      headers,
    });
  },
};

export default request;
