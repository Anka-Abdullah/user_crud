const { Op } = require("sequelize");
const User = require("../models").User;

module.exports = {
  addUser(payload) {
    return User.create(payload);
  },
  getOneUser(findBy) {
    return User.findOne({ where: findBy });
  },
  getAllUser({ q, ob, sb, of, lt }) {
    return User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },

          {
            address: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            creditcard_type: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            creditcard_number: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            creditcard_name: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            creditcard_expired: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            creditcard_cvv: {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      },
      order: [[`${ob || "id"}`, `${sb || "ASC"}`]],
      limit: lt || 30,
      offset: of || 0,
    });
  },
  updateUser(payload) {
    return User.update(payload, { where: { id: payload.user_id } });
  },
  getUserDetails(id) {
    return User.findByPk(id);
  },
  getPhoto(id) {
    return User.findByPk(id, { attributes: ["photos"] });
  },
};
