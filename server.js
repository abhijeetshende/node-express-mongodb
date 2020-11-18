const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};
var tutorialRouter = require('./app/routes/turorial.routes');
var iphostRouter = require('./app/routes/iphost.routes');
var machostRouter = require('./app/routes/machost.routes');
var scheduleRouter = require('./app/routes/schedule.routes');
var fqdnRouter = require('./app/routes/fqdn.routes');
var zoneRouter = require('./app/routes/zone.routes');
var fqdnlistRouter = require('./app/routes/fqdnlist.routes');

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ngess mock server application." });
});

//tutorial
app.use('/api/tutorials', tutorialRouter);
app.use('/api/iphosts', iphostRouter);
app.use('/api/machosts',machostRouter );
app.use('/api/schedule',scheduleRouter );
app.use('/api/fqdn',fqdnRouter );
app.use('/api/zones',zoneRouter );
app.use('/api/fqdnlist',fqdnlistRouter );

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
