var Network = require("../models/Network");

var functions = {
  //create a new sponsor
  createNetwork: function (req, res) {
    if (!req.body.parent || !req.body.fullname) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newNetwork = Network({
        parent: req.body.parent, //user sponsor
        _id: req.body.fullname, //user fullname
      });
      newNetwork.save(function (err, newNetwork) {
        if (err) {
          res.json({ success: false, msg: "Failed to save Network user" });
        } else {
          res.json({ success: true, msg: "successfully saved Network user" });
        }
      });
    }
  },

  //find a specific network
  getSpecificNetwork: async function (req, res) {
    try {
      const networks = await Network.aggregate([
        {
          $match: {
            _id: req.params.fullname,
          },
        },
        {
          $graphLookup: {
            from: "networks",
            startWith: "$_id",
            connectFromField: "connects",
            connectToField: "parent",
            as: "downlines",
          },
        },
      ]);
      // const sponsors = await Sponsorship.findOne({ parent: "MD" });
      res.json(networks);
    } catch (err) {
      res.json({ message: "failed to find network tree " });
    }
  },
  //find a specific network
  getSpecificNetworkTwo: async function (req, res) {
    try {
      const networks = await Network.aggregate([
        {
          $match: {
            parent: req.params.fullname,
          },
        },
        {
          $graphLookup: {
            from: "networks",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            depthField: "level",
            as: "downlines",
          },
        },
        {
          $unwind: {
            path: "$downlines",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            "downlines.level": -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            parent: {
              $first: "$parent",
            },
            // name: {
            //   $first: "$_id",
            // },
            // type: {
            //   $first: "$type",
            // },
            // category: {
            //   $first: 1,
            // },
            downlines: {
              $push: "$downlines",
            },
          },
        },
        {
          $addFields: {
            downlines: {
              $reduce: {
                input: "$downlines",
                initialValue: {
                  level: -1,
                  presentChild: [],
                  prevChild: [],
                },
                in: {
                  $let: {
                    vars: {
                      prev: {
                        $cond: [
                          {
                            $eq: ["$$value.level", "$$this.level"],
                          },
                          "$$value.prevChild",
                          "$$value.presentChild",
                        ],
                      },
                      current: {
                        $cond: [
                          {
                            $eq: ["$$value.level", "$$this.level"],
                          },
                          "$$value.presentChild",
                          [],
                        ],
                      },
                    },
                    in: {
                      level: "$$this.level",
                      prevChild: "$$prev",
                      presentChild: {
                        $concatArrays: [
                          "$$current",
                          [
                            {
                              $mergeObjects: [
                                "$$this",
                                {
                                  downlines: {
                                    $filter: {
                                      input: "$$prev",
                                      as: "e",
                                      cond: {
                                        $eq: ["$$e.parent", "$$this._id"],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          ],
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $addFields: {
            downlines: "$downlines.presentChild",
          },
        },
      ]);
      // const sponsors = await Sponsorship.findOne({ parent: "MD" });
      res.json(networks);
    } catch (err) {
      res.json({ message: "failed to find sponsors " });
    }
  },
};

module.exports = functions;
