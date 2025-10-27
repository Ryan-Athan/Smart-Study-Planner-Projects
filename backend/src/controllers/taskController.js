import prisma from "../config/prisma.js";

// ➕ Create Task
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, studyPlanId } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        userId: req.user.id,
        studyPlanId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// 📄 Get all Tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// ✏️ Update Task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed, priority } = req.body;

  try {
    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, dueDate, completed, priority },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// ❌ Delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
