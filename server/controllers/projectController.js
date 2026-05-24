import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getOwnedProject = async (projectId, userId) =>
  Project.findOne({ _id: projectId, createdBy: userId });

export const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Project title is required");
    }

    const project = await Project.create({
      title,
      description: description || "",
      createdBy: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({
      updatedAt: -1
    });

    const taskCounts = await Task.aggregate([
      { $match: { assignedTo: req.user._id } },
      {
        $group: {
          _id: "$projectId",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "Done"] }, 1, 0] }
          }
        }
      }
    ]);

    const countsByProject = taskCounts.reduce((acc, item) => {
      acc[item._id.toString()] = {
        totalTasks: item.totalTasks,
        completedTasks: item.completedTasks
      };
      return acc;
    }, {});

    res.json(
      projects.map((project) => ({
        ...project.toObject(),
        metrics: countsByProject[project._id.toString()] || {
          totalTasks: 0,
          completedTasks: 0
        }
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await getOwnedProject(req.params.id, req.user._id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await getOwnedProject(req.params.id, req.user._id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await getOwnedProject(req.params.id, req.user._id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    await Task.deleteMany({ projectId: project._id, assignedTo: req.user._id });
    await project.deleteOne();

    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};
