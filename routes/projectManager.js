const express = require('express');
const router = require('express-promise-router')();

const ProjectsController = require('../controllers/projectManager');

const { validateParam, validateBody , schemas } = require('../helpers/routesHelpers');

// 
router.route('/')
    .get(ProjectsController.index) // GET all the projects 
    .post(ProjectsController.newProject); // POST new project



console.log(ProjectsController.getProject.toString());

// projects/:id
router.route('/:projectId')
      .get(validateParam(schemas.idSchema, 'projectId'), ProjectsController.getProject) // GET specific project
      .patch(validateParam(schemas.idSchema, 'projectId'), ProjectsController.updateProject) // PATCH specific project
      .delete(validateParam(schemas.idSchema, 'projectId'), ProjectsController.deleteProject); // DELETE specific project


// Global error handler - route handlers/middlewares which throw end up here
router.use((err, req, res, next) => {
    // response to user with 403 error and details
});

module.exports = router;