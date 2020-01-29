import axios from "../_helper/axios";

export const serviceOrder = {
  getJoinEvents: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/order/joinevent");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  }
};
