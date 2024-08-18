import axios from "axios";

// axios.defaults.baseURL =  process.env.BASE_URL || 'http://localhost:3000'
// axios.defaults.withCredentials = true;
// const instance = axios.create({
//   baseURL: process.env.BASE_URL || 'http://localhost:3000',
//   withCredentials = true;
//   timeout: 10000, // 設定請求超時時間
// })

// 創建一個 axios 實例
const instance = axios.create();
// 設定請求攔截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 假設 token 保存在 localStorage 中
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 設定響應攔截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const { data } = await instance.post(
          "/token",
          {},
          {
            withCredentials: true,
          },
        );
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
