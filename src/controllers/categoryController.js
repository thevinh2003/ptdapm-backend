import { categoryService } from "../services/index.js";

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const categories = await categoryService.getAllCategories({
        page: parseInt(page),
      });
      res
        .status(200)
        .json({ categories: categories.rows, total: categories.count });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ category });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { CategoryName, Description } = req.body;
      const newCategory = await categoryService.createCategory({
        CategoryName,
        Description,
      });
      res.status(201).json({ message: "Category created", newCategory });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { CategoryName, Description } = req.body;
      console.log("check id: ", id);
      const updatedCategory = await categoryService.updateCategory(id, {
        CategoryName,
        Description,
      });
      res.status(200).json({ message: "Category updated", updatedCategory });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default categoryController;
