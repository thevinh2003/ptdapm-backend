import db from "../models/index.js";

const productReviewService = {
  getAllReview: (ProductID) => {
    return new Promise((resolve, reject) => {
      db.Product.findAll({
        where: { id: ProductID },
        include: {
          model: db.ProductReview,
          attributes: ["UserID", "Rating", "Review", "ReviewDate"],
        },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },
  createReview: ({ ProductID, UserID, Rating, Review }) => {
    return new Promise((resolve, reject) => {
      db.ProductReview.create({
        ProductID,
        UserID,
        Rating,
        Review,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },
};

export default productReviewService;
