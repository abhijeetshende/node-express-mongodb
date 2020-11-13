const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.iphosts = require("./ip_host.model.js")(mongoose);
db.machosts = require("./mac_host.model")(mongoose);

module.exports = db;
