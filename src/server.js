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

app.post("/mood", (req, res) => {
  const mood = req.body.queryResult.parameters.mood
  const fulfillmentMessages = req.body.queryResult.fulfillmentMessages
  console.log({fulfillmentMessages})
  let text = "";

  switch(mood) {
  case "tired":
    text = "When you are feeling tired, you should wear pyjamas and go to bed.";
    break;
  case "happy":
    text = "If you're happy, you should wear a crown!";
    break;
  case "flamboyant":
    text = "If you are feeling flamboyant, you should wear sequins!";
    break;
  case "sad":
    text = "If you are feeling sad, you should never wear tracksuits - it just makes you more sad.";
    break;
  case "shy":
    text = "If you are feeling shy, wear beige to blend into the background.";
    break;
  case "normal":
    text = "Wear jeans and a T-shirt cos you ain't special.";
    break;
  case "hungry":
    text = "Wear loose trousers, you're about to feast!";
    break;
  case "hungover":
    text = "Wear a cone of shame.";
    break;
  case "drunk":
    text = "Wear whatever you like, but wear something or you'll get arrested!";
    break;
  case "serious":
    text = "If you are feeling serious, you're talking to the wrong chatbot.";
    break;
  case "casual":
    text = "Don't think too much about what you're wearing. It's caj...";
    break;
  case "athletic":
    text = "If you're considering exercise, perhaps reconsider your life choices.";
    break;
  case "grumpy":
    text = "Wear a funny hat to cheer yourself up.";
    break;
  default:
    text = "I have never heard of that mood...";
  }
  
  res.status(200).json({
    "fulfillmentMessages": [
      {
        "text": {
          "text": [text]
        }
      }
    ]
  })
})

module.exports = app;
