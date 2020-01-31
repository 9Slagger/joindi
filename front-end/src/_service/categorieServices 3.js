import axios from  "../_helper/axios";

export const serviceCategorie = {
  getCategorie: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/categorie",);
        resolve(res.data);
      } catch (error) {
        if(error.status  < 500)
        reject(error.response.data);
      }
    });
  }
};