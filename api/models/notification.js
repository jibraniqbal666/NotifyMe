// Notification.js

const mongoose = require("mongoose");
mongoose.plugin(require('../plugins/added'));
const Schema = mongoose.Schema;

// Define collection and schema for Notification
let Notification = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    },
    kind: {
      type: String
    },
    email: {
      type: String
    }
  },
  {
    collection: "notifications"
  }
);

module.exports = mongoose.model("Notification", Notification);
