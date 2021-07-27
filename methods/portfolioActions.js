var Portfolio = require("../models/Portfolio");

var functions = {
  //CREATE A NEW Portfolio
  createPortfolio: function (req, res) {
    if (
      !req.body.name ||
      !req.body.intro ||
      !req.body.briefing ||
      !req.body.strategySnapshot ||
      !req.body.portfolioStrategy ||
      !req.body.portfolioType ||
      !req.body.subscription ||
      !req.body.subscriptionAmount
    ) {
      res.json({
        success: false,
        msg: "Please Provide all required Field",
      });
    } else {
      var newPortfolio = Portfolio({
        name: req.body.name,
        intro: req.body.intro,
        briefing: req.body.briefing,
        strategySnapshot: req.body.strategySnapshot,
        holdings: [req.body.btc, req.body.eth, req.body.usdt],
        portfolioStrategy: req.body.portfolioStrategy,
        portfolioType: req.body.portfolioType,
        subscription: req.body.subscription,
        subscriptionAmount: req.body.subscriptionAmount,
      });
      newPortfolio.save(function (err, Portfolio) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create Portfolio",
          });
        } else {
          res.json({
            success: true,
            msg: "successfully created Portfolio",
          });
        }
      });
    }
  },

  // GET ALL Portfolio
  getAllPortfolio: async function (req, res) {
    try {
      const allPortfolio = await Portfolio.find();
      res.json(allPortfolio);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //DELETE a Portfolio
  deletePortfolio: async function (req, res) {
    try {
      const removedPortfolio = await Portfolio.remove({
        _id: req.params.id,
      });
      res.json({ success: true, Message: "Portfolio Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  // GET A Portfolio
  getSinglePortfolio: async function (req, res) {
    try {
      const singlePortfolio = await Portfolio.findById({
        _id: req.params.id,
      });
      res.json(singlePortfolio);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
