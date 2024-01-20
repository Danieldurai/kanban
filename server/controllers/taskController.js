const Tasks = require("../models/Task");
const uuid = require("uuid");

module.exports.tasks_get = async (req, res) => {
  const tasks = await Tasks.find();

  // Send the products as JSON
  res.json(tasks);
};

module.exports.tasks_post = async (req, res) => {
  const { title, status } = req.body;
  // Generate a new UUID
  const newId = uuid.v4();

  // Create a new document with the generated UUID
  const newTask = new Tasks({
    id: newId,
    title: title,
    status: status,
  });

  console.log(newTask);
  await newTask.save();
  const tasks = await Tasks.find();
  // Send the products as JSON
  res.json(tasks);
};
