import { paymentService } from "../services/index.js";

const paymentController = {
  getPaymentByOrderID: async (req, res) => {
    try {
      const { orderId } = req.params;
      const payment = await paymentService.getPaymentByOrderID(orderId);
      if (!payment)
        return res.status(404).json({ message: "No payment found" });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updatePaymentStatusByOrderID: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const payment = await paymentService.updatePaymentStatusByOrderID({
        orderId,
        status,
      });
      if (!payment)
        return res.status(404).json({ message: "No payment found" });
      res.status(200).json({ message: "Payment updated", payment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deletePaymentByOrderID: async (req, res) => {
    try {
      const { orderId } = req.params;
      const payment = await paymentService.deletePaymentByOrderID(orderId);
      if (!payment)
        return res.status(404).json({ message: "No payment found" });
      res.status(200).json({ message: "Payment deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;
