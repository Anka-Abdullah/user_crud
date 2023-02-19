const { addUser, getOneUser, getAllUser, getUserDetails, getPhoto } = require("../repository/user");

module.exports = {
  async addUser(payload) {
    try {
      const addProcess = await addUser(payload);
      const rs = {
        user_id: addProcess.id,
      };
      return rs;
    } catch (e) {
      throw Error(e);
    }
  },

  async checkUserEmail(payload) {
    try {
      const user = await getOneUser({ email: payload.email });
      let rs = 0;
      if (user !== null) {
        rs = 1;
      }
      return rs;
    } catch (e) {
      throw Error(e);
    }
  },

  async getUserLists(params) {
    try {
      const list = await getAllUser(params);
      console.log(list);
      return list;
    } catch (e) {
        console.log(e);
      throw Error(e);
    }
  },

  async getUserDetails(id) {
    try {
      const detail = await getUserDetails(id);
      return detail
    } catch (e) {
      throw Error(e);
    }
  },

  async updateUser(payload) {
    try {
        const update = await getOneUser(payload);
        return update
      } catch (e) {
        throw Error(e);
      }
  },

  async getUserPhoto(id) {
    try {
        const photo = await getPhoto(id);
        return photo
      } catch (e) {
        throw Error(e);
      }
  }
};
