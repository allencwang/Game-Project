// server/index.js

const { ObjectId } = require("bson");
const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(
  "mongodb+srv://paullee:L15OvEuNJMOwGBE7@gameproject.jjlux.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  var Comments = mongoose.model(
    "Comments",
    new mongoose.Schema({
      name: String,
      email: String,
      movieId: ObjectId,
      text: String,
    })
  );
  var commentsQuery = Comments.findOne({ name: "Mercedes Tyler" });
  commentsQuery.select("name email");
  commentsQuery.exec(function (err, result) {
    app.get("/databaseTest", (req, res) => {
      res.json({
        message:
          "Database connect successfully. Here is Mercedes Tyler's email " +
          result.email,
      });
    });
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
