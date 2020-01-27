import axios from  "../_helper/axios";

export const serviceEvent = {
  getCategorieAndEvents: categorieId => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get(`/event/categorie/${categorieId}`);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  getEventDetail: eventId => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get(`/event/${eventId}`);
        resolve(res.data);
        console.log('res.data', res.data)
      } catch (error) {
        if (error.status < 500) reject(error.response.data);
      }
    });
  },
  getEventAdmin: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/admin");
        resolve(res.data);
        // console.log('res.data', res.data)
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  approveEventAdminWait: id => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/approveWait", {
          eventId: id
        });
        resolve(res.data);
        // console.log("approve", res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  pendEventAdminReject: (id, remark) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/pendReject", {
          eventId: id
        });
        resolve(res.data);
        // console.log("pending", res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  rejectEventAdmin: (id, remark) => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.put("/event/reject", {
          eventId: id,
          eventRemark: remark
        });
        // console.log("eventId", id, "eventRemark", remark);
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  getEventApprove: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/statusapprove");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  getEventCatagorieList: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/categorie");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  },
  getMyEvents: () => {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.get("/event/myevents");
        resolve(res.data);
      } catch (error) {
        if (error.response.status < 500) reject(error.response.data);
      }
    });
  }
};
