import prisma from "../config/prisma.js";

// ➕ Create a Study Plan
export const createStudyPlan = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    const plan = await prisma.studyPlan.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: req.user.id,
      },
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Failed to create study plan", error });
  }
};

// 📄 Get all Study Plans for the logged-in user
export const getStudyPlans = async (req, res) => {
  try {
    const plans = await prisma.studyPlan.findMany({
      where: { userId: req.user.id },
      include: { tasks: true },
    });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch study plans", error });
  }
};

// ✏️ Update Study Plan
export const updateStudyPlan = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;

  try {
    const updated = await prisma.studyPlan.update({
      where: { id: Number(id) },
      data: { title, description, startDate, endDate },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update study plan", error });
  }
};

// ❌ Delete Study Plan
export const deleteStudyPlan = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.studyPlan.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Study plan deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete study plan", error });
  }
};
