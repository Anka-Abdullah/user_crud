const bcrypt = require("bcrypt");
const {
  addUser,
  checkUserEmail,
  getUserLists,
  getUserDetails,
  updateUser,
  getUserPhoto,
} = require("../service/user");
const { registerSchema, updatedSchema } = require("../validator/user");

module.exports = {
  async register(req, res) {
    try {
      const check = await checkUserEmail(req.body);
      if (check === 1) {
        throw new Error("Email already exist ..!!");
      }
      const { error, _ } = registerSchema.validate(req.body);

      if (error) {
        throw new Error(error.message);
      }

      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(req.body.password, salt);

      const payload = {
        ...req.body,
        password: encryptPassword,
        photos: [req.body.photos],
      };
      console.log(payload);

      const result = await addUser(payload);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      let errorMessage = {
          error: e.message,
        },
        status = 400;

      if ("SequelizeDatabaseError".includes(e.message)) {
        status = 500;
        errorMessage.error = "Something went wrong. Please try again later";
      }

      res.status(status).json(errorMessage);
    }
  },

  async list(req, res) {
    try {
      const { count, rows } = await getUserLists(req.query);
      const rowsData = rows.map((u) => {
        const obj = {
          user_id: u.id,
          name: u.name,
          email: u.email,
          address: u.address,
          photo: u.photos.reduce((acc, val, index) => {
            acc[index + 1] = val;
            return acc;
          }, {}),
          creditcard: {
            type: u.creditcard_type,
            number: u.creditcard_number,
            name: u.creditcard_name,
            expired: u.creditcard_expired,
          },
        };

        return obj;
      });
      const result = {
        count,
        rows: rowsData,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." });
    }
  },

  async details(req, res) {
    try {
      const u = await getUserDetails(req.params.user_id);
      if (u === null) {
        res.status(404).json({ error: "User not found." });
        return;
      }
      const result = {
        user_id: u.id,
        name: u.name,
        email: u.email,
        address: u.address,
        photo: u.photos.reduce((acc, val, index) => {
          acc[index + 1] = val;
          return acc;
        }, {}),
        creditcard: {
          type: u.creditcard_type,
          number: u.creditcard_number,
          name: u.creditcard_name,
          expired: u.creditcard_expired,
        },
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." });
    }
  },

  async updatingData(req, res) {
    try {
      const { error, _ } = updatedSchema.validate(req.body);

      if (error) {
        throw new Error(error.message);
      }

      const { dataValues } = await getUserPhoto(req.body.user_id);
      let photos = dataValues.photos;
      photos.push(req.body.photos);

      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(req.body.password, salt);

      const payload = {
        ...req.body,
        password: encryptPassword,
        photos,
      };

      await updateUser(payload);

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." });
    }
  },
};
