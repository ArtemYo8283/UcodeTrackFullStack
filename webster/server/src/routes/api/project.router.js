import { Router } from "express";
import { tryCatch } from "../../utils/tryCacth.utils.js";
import projectController from "../../controllers/projectController.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import ProjectService from "../../services/project.service.js";
import UserService from "../../services/user.service.js"
import { isTitleExist, isNotExistById } from "../../scripts/roleChecking.script.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { projectValidationChainMethod } from "../../validations/project.validation.js";
import { isAccessOrAdminProjectService } from "../../middleware/isAccess.middleware.js";

const projectRouter = Router();

//Select All
projectRouter.get(
    '/',
    tryCatch(projectController.selectAll.bind(projectController))
);

//Select By Id
projectRouter.get(
    '/:id',
    isNotExistById(ProjectService),
    tryCatch(projectController.selectById.bind(projectController))
);

//Select content By Id
projectRouter.get(
    '/content/:id/:token',
    isNotExistById(ProjectService),
    isAutorised,
    tryCatch(projectController.selectContentById.bind(projectController))
);

//Select By User Id
projectRouter.get(
    '/user/:id',
    isNotExistById(UserService),
    tryCatch(projectController.selectByUserId.bind(projectController))
);

//Create (For Authorized)
projectRouter.post(
    '/:token',
    isAutorised,
    //projectValidationChainMethod,
    validateRequestSchema,
    tryCatch(projectController.create.bind(projectController))
);

//Update (For Self or Admin)
projectRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAccessOrAdminProjectService(ProjectService),
    isNotExistById(ProjectService),
    projectValidationChainMethod,
    validateRequestSchema,
    tryCatch(projectController.update.bind(projectController))
);

//Save By project Id
projectRouter.patch(
    '/save/:id/:token',
    isNotExistById(ProjectService),
    tryCatch(projectController.save.bind(projectController))
);

//Delete by id (For Self or Admin)
projectRouter.delete(
    '/:id/:token',
    isAutorised,
    isNotExistById(ProjectService),
    isAccessOrAdminProjectService(ProjectService),
    tryCatch(projectController.deleteById.bind(projectController))
);

export default projectRouter;