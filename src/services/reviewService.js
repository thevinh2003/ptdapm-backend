import db from "../models/index.js";

const reviewService = {
    getAllReview: () => {
        return new Promise((resolve, reject) => {
            db.Product.findAll({
                include: [
                    {
                        model: db.ProductReview,
                        attributes: ['id', 'Review', 'Rating', 'ReviewDate', 'Feedback', 'FeedbackDate'],
                        include: {
                            model: db.User,
                            attributes: ['id', 'UserName', 'FullName', 'email']
                        },
                        
                    },
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    updateReviewFeedback: ({id, feedback, feedbackDate}) => {
        return new Promise((resolve, reject) => {
            db.ProductReview.update({ Feedback: feedback, FeedbackDate: feedbackDate }, {
                where: {
                    id
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    deleteReviewFeedback: (id) => {
        return new Promise((resolve, reject) => {
            db.ProductReview.update({ Feedback: null, FeedbackDate: null }, {
                where: {
                    id
                }
            })
            .then(resolve)
            .catch(reject)
        })
    }
}

export default reviewService
