import axios from "../_helper/axios";

export const serviceTag = {
  getTag: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/tag/");
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  getTagAndEvent: tagId => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get(`/tag/tagAndEvent/${tagId}`);
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  addTag: (tagNameEn, tagNameTh) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.post("/tag", {
          tagNameEn,
          tagNameTh
        });
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
