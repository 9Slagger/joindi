import axios from "../_helper/axios";

export const serviceEvent = {
  getEventAdmin: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/admin");
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
