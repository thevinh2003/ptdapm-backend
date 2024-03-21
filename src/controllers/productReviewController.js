import productReviewService from "../services/productReviewService.js";

const productReviewController = {
  getReviewsByProductID: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await productReviewService.getAllReview(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createReview: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const { ProductID, Rating = 5, Review } = req.body;
      const data = await productReviewService.createReview({
        ProductID,
        UserID: id,
        Rating,
        Review,
      });
      res.status(201).json({ message: "Review created", data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default productReviewController;
