import axios from "../_helper/axios";
import { setToken, removeToken } from "../_helper/localStorage";

export const serviceAuth = {
  signin: (email, password) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.post("/signin", { email, password });
        setToken(JSON.stringify(res.data.result.token));
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  signout: () =>
    new Promise(async (resolve, reject) => {
      removeToken();
      resolve({
        messages: {
          title_en: "signout success",
          title_th: ""
        }
      });
    })
};
