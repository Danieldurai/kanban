const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please enter an id"],
    unique: true,
  },

  title: {
    type: String,
    required: [true, "Please enter a title"],
  },

  status: {
    type: String,
    required: [true, "Please enter a status"],
  },
});

const Tasks = mongoose.model("task", taskSchema);

module.exports = Tasks;
