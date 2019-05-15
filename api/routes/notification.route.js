// notification.route.js

const express = require("express");
const app = express();
const notificationRoutes = express.Router();
const connection = require("../realtime");

// Require Notification model in our routes module
let Notification = require("../models/Notification");

// Defined store route
notificationRoutes.route("/add").post(function(req, res) {
  let notification = new Notification(req.body);
  notification
    .save()
    .then(notification => {
      res
        .status(200)
        .json({ notification: "notification in added successfully" });

      const con = connection.connection();
      if (con.getUser() === notification.email)
        con.sendEvent("added", notification);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
notificationRoutes.route("/").get(function(req, res) {
  Notification.find(function(err, notifications) {
    if (err) {
      console.log(err);
    } else {
      res.json(notifications);
    }
  });
});

// Defined edit route
notificationRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  Notification.findById(id, function(err, notification) {
    res.json(notification);
  });
});

//  Defined update route
notificationRoutes.route("/:email").get(function(req, res) {
  Notification.find({ email: req.params.email }, function(err, notifications) {
    if (!notifications) res.status(404).send("no document found");
    else {
      res.status(200).send(notifications);
    }
  });
});

//  Defined update route
notificationRoutes.route("/update/:id").post(function(req, res) {
  Notification.findById(req.params.id, function(err, notification) {
    if (!notification) res.status(400).send("no document found");
    else {
      if (req.body.title) notification.title = req.body.title;
      if (req.body.body) notification.body = req.body.body;
      if (req.body.kind) notification.kind = req.body.kind;

      notification
        .save()
        .then(notification => {
          res.status(200).send("update the database");
        })
        .catch(err => {
          console.log("in error", err);
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
notificationRoutes.route("/delete/:id").get(function(req, res) {
  Notification.findByIdAndRemove({ _id: req.params.id }, function(
    err,
    notification
  ) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = notificationRoutes;
// module.exports = function(io) {
//   this.io = io;
// };
