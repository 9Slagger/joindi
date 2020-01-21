import axios from "../_helper/axios";

export const serviceRole = {
  getRole: (email, password) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/role", { email, password });
        resolve(res.data);
      } catch (error) {
        if(error.status  < 500)
        reject(error.response.data);
      }
    });
  }
};
