import axios from "../_helper/axios";

export const serviceUser = {
  createUser: (
    email,
    password,
    phoneNumber,
    firstName,
    lastName,
    companyName,
    customerTypeId
  ) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.post("/user", {
          email,
          password,
          phoneNumber,
          firstName,
          lastName,
          companyName,
          customerTypeId
        });
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
