const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
mongoose
  .connect("mongodb://127.0.0.1/kanban", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
    console.log("LISTENING...");
  })
  .catch((err) => console.log(err));

// routes
app.use(taskRoutes);
