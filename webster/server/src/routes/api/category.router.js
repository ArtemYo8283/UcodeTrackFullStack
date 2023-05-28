import { Router } from "express";
import { tryCatch } from "../../utils/tryCacth.utils.js";

import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";

import categoryController from "../../controllers/categoryController.js";
import CategoryService from "../../services/category.service.js";

import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import { checkCategoryChainMethod } from "../../validations/category.validation.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";


const categoryRouter = Router();

//Select All(For All)
categoryRouter.get(
    '/',
    tryCatch(categoryController.selectAll.bind(categoryController))
);

//Select By Id(For All)
categoryRouter.get(
    '/:id',
    isNotExistById(CategoryService),
    tryCatch(categoryController.selectById.bind(categoryController))
);

//Create (Only for admin)
categoryRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    checkCategoryChainMethod,
    validateRequestSchema,
    tryCatch(categoryController.create.bind(categoryController))
);

//Update (Only for admin)
categoryRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAdmin,
    checkCategoryChainMethod,
    validateRequestSchema,
    isNotExistById(CategoryService),
    isSameTitle(CategoryService),
    tryCatch(categoryController.update.bind(categoryController))
);

//Delete by id (Only for admin)
categoryRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(CategoryService),
    tryCatch(categoryController.deleteById.bind(categoryController))
);

export default categoryRouter;