import axios from "../_helper/axios";

export const serviceEvent = {
  getEventAdmin: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/admin");
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  approveEventAdminWait: (id) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/approveWait", {
          eventId: id
        });
        resolve(res.data);
        console.log("approve", res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  approveEventAdminReject: (id,remark) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/approveReject", {
          eventId: id,
          // eventRemark: remark
        });
        resolve(res.data);
        console.log("approve", res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  rejectEventAdmin: (id,remark) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/reject", {
          eventId: id,
          eventRemark: remark
        });
        console.log('eventId', id, 'eventRemark', remark)
        resolve(res.data);
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  }
};
