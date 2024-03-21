import { reviewService } from "../services/index.js";

const reviewController = {
    getAllReview: async (req, res) => {
        try {
            const products = await reviewService.getAllReview()
            // await reviews.reverse()

            return res.status(200).json({ products, total: products.length })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    updateReviewFeedback: async (req, res) => {
        try {
            const {feedback, feedbackDate} = req.body
            const {id} = req.params
            if (!feedback || !feedbackDate || !id) {
                return res.status(400).json("Missing parameters");
            }
            const review = await reviewService.updateReviewFeedback({id, feedback, feedbackDate})
            // await reviews.reverse()
            return res.status(200).json({ message: 'Feedback Successfully' })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    },
    deleteReviewFeedback: async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(400).json("Missing parameters");
            }
            const review = await reviewService.deleteReviewFeedback(id)
            // await reviews.reverse()
            return res.status(200).json({ message: 'Feedback deleted successfully' })
        } catch (e) {
            console.log(e)
            res.status(500).json("Internal Server Error");
        }
    }
}

export default reviewController
