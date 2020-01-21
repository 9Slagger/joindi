import axios from "../_helper/axios";

export const serviceEvent = {
  getCategorieAndEvents: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/categorie",);
        resolve(res.data);
      } catch (error) {
        if(error.status  < 500)
        reject(error.response.data);
      }
    });
  }
};