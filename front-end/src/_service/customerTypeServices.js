import axios from "../_helper/axios";

export const serviceCustomerType = {
  getCustomerType: (email, password) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/customertype", { email, password });
        resolve(res.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
};
