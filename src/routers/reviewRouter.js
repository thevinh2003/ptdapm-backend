import { Router } from "express";
import { reviewController } from '../controllers/index.js'

const reviewRouter = Router()
const orderPrefix = `/api/${process.env.API_VERSION}/reviews`

// GET: /api/v1/reviews
reviewRouter.get(`${orderPrefix}`, reviewController.getAllReview)

// POST: /api/v1/reviews/edit/:id
reviewRouter.post(`${orderPrefix}/edit/:id`, reviewController.updateReviewFeedback)

// DELETE: /api/v1/reviews/delete/:id
reviewRouter.delete(`${orderPrefix}/delete/:id`, reviewController.deleteReviewFeedback)

export default reviewRouter