import axios from "axios";

const interceptor = axios.interceptors.response.use(undefined, function(err) {
  return new Promise(function(resolve, reject) {
    let res = err.response;
    if (res.status === 200) resolve();
    if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
    reject(err);
  });
});

export default interceptor;
