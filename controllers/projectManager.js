const Project = require('../models/project');

//This form of controller (Without the reduant try/catch block is achivable using the 'express-promise-router' module
// All the functions here passed the validation of params nad body, and they are getting called only after that 
module.exports = {
    // Retrives all projects 
    index: async (req, res, next) => {
        const projects = await Project.find({});
        res.status(200).json(projects);
    },

    // Creates a new project
    newProject: async (req, res, next) => {
        console.log('req.value contents', req.body);
        const newProject = new Project(req.value.body);
        const project = await newProject.save();
        res.status(201).json(project);    
    },

    // Retrives specific project
    getProject: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await user.findById(userId);
        res.status(200).json(user);
    },

    // Updates current project 
    updateProject: async (req, res, next) => {
        const { projectId } = req.value.params; //using ES6 syntax
        const newProjct = req.body;
        const result = await User.findByIdAndUpdate(projectId, newProjct);
        res.status(200).json({ success:true });    
    }
}
