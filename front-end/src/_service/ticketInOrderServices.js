import axios from "../_helper/axios";

export const serviceTicketInOrder = {
  buyTicket: (ticketId, ticketQuantity) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.post(`/ticketInOrder/${ticketId}`, { ticketQuantity });
        resolve(res.data);
      } catch (error) {
        console.log("error", error.response)
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
