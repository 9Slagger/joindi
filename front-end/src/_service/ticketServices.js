import axios from "../_helper/axios";

export const serviceTicket = {
  getTicket: ticketId => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get(`/ticket/${ticketId}`);
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
