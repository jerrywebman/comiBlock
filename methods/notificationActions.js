var Notification = require("../models/Notification");

var functions = {
  //CREATE A NEW NOTIFICATION
  createNotification: function (req, res) {
    if (!req.body.message) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newNotification = Notification({
        message: req.body.message,
      });
      newNotification.save(function (err, newNotification) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },

  //DELETE
  deleteNotification: async function (req, res) {
    try {
      const removedNotification = await Notification.remove({
        _id: req.params.id,
      });
      res.json({ success: true, Message: "Notification Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE PLAN
  getSingleNotification: async function (req, res) {
    try {
      const singleNotification = await Notification.findById({
        _id: req.params.id,
      });
      res.json(singleNotification);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //UPDATE Notification
  updateNotification: async function (req, res) {
    try {
      const updatedNotification = await Notification.updateOne(
        { _id: req.params.id },
        {
          $set: {
            message: req.body.message,
            status: req.body.status,
          },
        }
      );
      res.json({ success: true, Message: "Notification Successfully updated" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET ALL Notification
  getAllNotification: async function (req, res) {
    try {
      const notification = await Notification.find();
      res.json(notification);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
