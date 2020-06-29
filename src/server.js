const express = require("express");
const logger = require("./logger");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(logger());

app.get("/", (req, res) => {
  const appointments = db.get("appointments").value();
  if (!appointments || !appointments.length) {
    res.status(404).json({ message: "No appointments found" });
  } else {
    res.json(appointments);
  }
});

app.post("/appointments", (req, res) => {
  const date_time = req.body.queryResult.parameters["date-time"].date_time
  const fulfillmentMessages = req.body.queryResult.fulfillmentMessages
  
  db.get("appointments").push({ date_time: date_time}).write()
  res.status(200).json({fulfillmentMessages})
})

module.exports = app;
