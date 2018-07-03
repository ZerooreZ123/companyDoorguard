import axios from "axios";
import crypto from "crypto-js";

axios.defaults.baseURL = window.baseURL;

const key = "APIHELPER";
const iv = () => {
  return Date.parse(new Date()) / (15 * 60 * 1000) + "";
};
axios.interceptors.request.use(config => {
  const encrypted = crypto.AES.encrypt(JSON.stringify(config.data), key, {
    iv: iv(),
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  });
  config.data = { data: encrypted.toString() };
  return config;
});

axios.interceptors.response.use(
  response => {
    const decrypted = crypto.AES.decrypt(response.data, key, {
      iv: iv(),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });
    return JSON.parse(decrypted.toString(crypto.enc.Utf8));
  },
  err => alert(err)
);

export default {
  post(url, param = {}, error) {
    return axios({ method: "post", url: "/api", data: { apiName: url, params: param } })
      .then(result => {
        console.log(url, result);
        if (result.success === "T") {
          return result.data;
        } else {
          error && error();
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  postUrl(url, param = {}, error) {
    return axios({ method: "post", url, data: param })
      .then(result => {
        console.log(result);
        if (result.success === "T") {
          return result.data;
        } else {
          alert(result.msg);
          error && error();
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }
};
