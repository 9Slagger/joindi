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
        console.log(error && error.response);
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  getUserDetail: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/user/userdetail");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  updateUserDetailIndividual: userNewData => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/user/updateuserindividual", userNewData);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  updateUser: newEmailAndPhoneNumber => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/user/updateuser", newEmailAndPhoneNumber);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  updateCompanyUser: companyNewData => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/user/updatecompanyuser", companyNewData);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  }
};
