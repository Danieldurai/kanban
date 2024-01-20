const { Router } = require("express");
const taskController = require("../controllers/taskController");

const router = Router();

router.get("/tasks", taskController.tasks_get);
router.post("/tasks", taskController.tasks_post);

module.exports = router;
