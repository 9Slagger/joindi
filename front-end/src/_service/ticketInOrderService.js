import axios from "../_helper/axios";

export const serviceTicketInOrder = {
  ticketInOrder: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get(`/ticketInOrder`);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  }
};
