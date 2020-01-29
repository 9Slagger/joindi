import axios from  "../_helper/axios";

export const serviceBookmark = {
  getBookmark: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/bookmark/mybookmark");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  }
}



