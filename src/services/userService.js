import db from "../models/index.js";
import bcrypt from "bcrypt";

const userService = {
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.User.create(userData).then(resolve).catch(reject);
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.User.findByPk(id).then(resolve).catch(reject);
    });
  },
  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        where: { UserName: username },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        where: { Email: email },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  activeUser: (id) => {
    return new Promise((resolve, reject) => {
      db.User.update(
        { isActive: true, token: { activeToken: null } },
        {
          where: { id },
        }
      )
        .then(resolve)
        .catch(reject);
    });
  },
  getAllUsers: ({ page }) => {
    return new Promise(async (resolve, reject) => {
      const limit = 10;
      const offset = (page - 1) * limit;
      try {
        const totalUsers = await db.User.count();
        db.User.findAll({
          attributes: { exclude: ["Password", "token"] },
          order: [["createdAt", "DESC"]],
          limit,
          offset,
        })
          .then((users) => {
            resolve({ users, total: totalUsers });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateResetPasswordToken: (id, token) => {
    return new Promise((resolve, reject) => {
      db.User.update(
        { token: { activeToken: null, resetPasswordToken: token } },
        {
          where: { id },
        }
      )
        .then(resolve)
        .catch(reject);
    });
  },
  updateRandomPassword: (id) => {
    return new Promise((resolve, reject) => {
      const randomPassword =
        Math.random().toString(36).slice(-4) +
        "@" +
        Math.random().toString(36).slice(-4);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(randomPassword, salt);
      db.User.update(
        {
          Password: hash,
          token: { activeToken: null, resetPasswordToken: null },
        },
        {
          where: { id },
        }
      )
        .then(resolve(randomPassword))
        .catch(reject);
    });
  },
  updateRefreshToken: ({ id, refreshToken }) => {
    return new Promise((resolve, reject) => {
      console.log("check id: ", id);
      db.User.update(
        { token: { refreshToken } },
        {
          where: { id },
        }
      )
        .then(resolve)
        .catch(reject);
    });
  },
  changePassword: (user, newPassword) => {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      user?.update({ Password: hash }).then(resolve(true)).catch(reject(false));
    });
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      db.User.update(data, {
        where: { id },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.User.destroy({
        where: { id },
      })
        .then(resolve)
        .catch(reject);
    });
  },
  cancelIsActive: (id) => {
    return new Promise((resolve, reject) => {
      db.User.update({
        isActive: 0
      },{
        where: { id },
      })
        .then(resolve)
        .catch(reject);
    });
  }
};

export default userService;
