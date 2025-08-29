// api/bfhl.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "preksha_sangal";  
const DOB = "09032004"; // ddmmyyyy
const EMAIL = "preksha@xyz.com";
const ROLL_NUMBER = "22BCE8803";

app.post("/api/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const alphaConcat = alphabets.join("");
    let concat_string = "";
    let toggle = true;
    for (let i = alphaConcat.length - 1; i >= 0; i--) {
      concat_string += toggle
        ? alphaConcat[i].toUpperCase()
        : alphaConcat[i].toLowerCase();
      toggle = !toggle;
    }

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error", error: error.message });
  }
});

module.exports = app;
