const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/getDay", (req, res) => {
  const { date } = req.query;

  if (!date || !isValidDate(date)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use DD/MM/YYYY." });
  }

  const dayOfWeek = getDayOfWeek(date);
  res.json({ dayOfWeek });
});

function isValidDate(date) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
}

function getDayOfWeek(date) {
  const formattedDate = moment(date, "DD/MM/YYYY", true);
  if (formattedDate.isValid()) {
    return formattedDate.format("dddd");
  } else {
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
