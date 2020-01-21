import axios from "../_helper/axios";

export const serviceTag = {
  getTag: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/tag",);
        resolve(res.data);
      } catch (error) {
        if(error.status  < 500)
        reject(error.response.data);
      }
    });
  }
};