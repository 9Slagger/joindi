import axios from "../_helper/axios";

export const serviceCustomerType = {
  getCustomerType: (email, password) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/customertype", { email, password });
        resolve(res.data);
      } catch (error) {
        if(error.status  < 500)
        reject(error.response.data);
      }
    });
  }
};
