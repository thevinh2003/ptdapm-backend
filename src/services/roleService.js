import db from "../models/index.js";

const roleService = {
  checkAdminRole: (userId) => {
    return new Promise((resolve, reject) => {
      db.User.findByPk(userId)
        .then((user) => {
          if (user.RoleId === 2) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  },
};

export default roleService;
