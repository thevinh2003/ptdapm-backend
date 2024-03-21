import { reportService } from "../services/index.js";

const reportController = {
  getRevenueReport: async (req, res) => {
    try {
      // const { startDate, endDate } = req.query;
      const report = await reportService.getRevenueReport();
      console.log('check: ', report);
      // if (report.length === 0)
      //   return res.status(404).json({ message: "No report found" });
      // const totalRevenue = report?.reduce(
      //   (acc, curr) => +acc + +curr.Order.TotalAmount,
      //   0
      // );
      // res.status(200).json({ totalRevenue, analysis: report });

      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      const month = [
        'Tháng 1', 
        'Tháng 2', 
        'Tháng 3', 
        'Tháng 4', 
        'Tháng 5', 
        'Tháng 6', 
        'Tháng 7', 
        'Tháng 8', 
        'Tháng 9', 
        'Tháng 10', 
        'Tháng 11', 
        'Tháng 12', 
      ] 
      const arr = []
      month.forEach((item, index) => {
        let total = 0
        let stockPrice = 0
        let id = null
        report.forEach(e => {
          if (e.month === index+1) {
            if (id !== e?.Order?.id) {
              total += +e?.Order?.TotalAmount
              id = e?.Order?.id
            }
            stockPrice += +e?.Order?.Products?.StockPrice
          }
        })
        arr.push({  
          month: index+1,
          expand: total-stockPrice,
          totalStockPrice: stockPrice,
          total: total
        })
      })
      res.status(200).json({ report: arr })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductReport: async (req, res) => {
    try {
      const report = await reportService.getProductReport();
      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      return res.status(200).json({ analysis: report });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  },
  getOrderReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const report = await reportService.getOrderReport(startDate, endDate);
      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      res.status(200).json({ analysis: report });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getInventoryReport: async (req, res) => {
    try {
      const report = await reportService.getInventoryReport();
      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      res.status(200).json({ analysis: report });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getShippingReport: async (req, res) => {
    try {
      const report = await reportService.getShippingReport();
      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      res.status(200).json({ analysis: report });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getRevenueReportToday: async (req, res) => {
    try {
      const report = await reportService.getRevenueReportToday();
      let total = 0 
      report?.forEach(item => {
        total += +item?.Order?.TotalAmount
      })
      if (report.length === 0)
        return res.status(404).json({ message: "No report found" });
      res.status(200).json({ report, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default reportController;
