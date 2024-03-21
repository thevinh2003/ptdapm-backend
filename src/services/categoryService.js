import db from "../models/index.js";

const categoryService = {
  getAllCategories: async ({ page }) => {
    return new Promise((resolve, reject) => {
      db.Category.findAndCountAll({
        limit: 10,
        offset: (page - 1) * 10,
        order: [["id", "DESC"]],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getCategoryById: async (id) => {
    return new Promise((resolve, reject) => {
      db.Category.findByPk(id).then(resolve).catch(reject);
    });
  },

  createCategory: async (category) => {
    return new Promise((resolve, reject) => {
      db.Category.create(category).then(resolve).catch(reject);
    });
  },
  updateCategory: async (id, category) => {
    return new Promise((resolve, reject) => {
      db.Category.update(category, { where: { id: id } })
        .then(resolve)
        .catch(reject);
    });
  },
  deleteCategory: async (id) => {
    return new Promise((resolve, reject) => {
      db.Category.destroy({ where: { id: id } })
        .then(resolve)
        .catch(reject);
    });
  },
};

export default categoryService;
