var Sponsorship = require("../models/Sponsorship");

var functions = {
  //create a new sponsor
  createSponsorship: function (req, res) {
    if (!req.body.parent || !req.user.username) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newSponsorship = Sponsorship({
        parent: req.body.parent, //user sponsor
        _id: req.user.username, //user username
      });
      newSponsorship.save(function (err, newSponsorship) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },

  //find a specific sponsor
  getSpecificSponsorship: async function (req, res) {
    try {
      const sponsors = await Sponsorship.aggregate([
        {
          $match: {
            _id: "MD",
          },
        },
        {
          $graphLookup: {
            from: "sponsorships",
            startWith: "$_id",
            connectFromField: "parent",
            connectToField: "parent",
            as: "sponsorsUser",
          },
        },
      ]);
      // const sponsors = await Sponsorship.findOne({ parent: "MD" });
      res.json(sponsors);
    } catch (err) {
      res.json({ message: "failed to find sponsors " });
    }
  },
};

module.exports = functions;
