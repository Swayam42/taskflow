import Project from "../models/Project.js";
import Task from "../models/Task.js";

const ensureProjectAccess = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

const getOwnedTask = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, assignedTo: userId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  await ensureProjectAccess(task.projectId, userId);
  return task;
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    if (!title || !projectId) {
      res.status(400);
      throw new Error("Task title and project are required");
    }

    await ensureProjectAccess(projectId, req.user._id);

    const task = await Task.create({
      title,
      description: description || "",
      status: status || "Todo",
      priority: priority || "Medium",
      projectId,
      assignedTo: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    const filter = { assignedTo: req.user._id };

    if (projectId) {
      await ensureProjectAccess(projectId, req.user._id);
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await getOwnedTask(req.params.id, req.user._id);
    const { title, description, status, priority } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await getOwnedTask(req.params.id, req.user._id);
    task.status = req.body.status ?? task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await getOwnedTask(req.params.id, req.user._id);
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
};
