import { Router } from "express";
import { tryCatch } from "../../utils/tryCacth.utils.js";

import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";

import formatController from "../../controllers/formatController.js";
import FormatService from "../../services/format.service.js";

import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import { checkFormatValidateChainMethod } from "../../validations/format.validation.js";
import { isNotExistById, isTitleExist } from "../../scripts/roleChecking.script.js";

const formatRouter = Router();

//Select All(For All)
formatRouter.get(
    '/',
    tryCatch(formatController.selectAll.bind(formatController))
);

//Select By Id(For All)
formatRouter.get(
    '/:id',
    isNotExistById(FormatService),
    tryCatch(formatController.selectById.bind(formatController))
);

//Create (Only for admin)
formatRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    checkFormatValidateChainMethod,
    validateRequestSchema,
    isTitleExist(FormatService),
    tryCatch(formatController.create.bind(formatController))
);

//Update (Only for admin)
formatRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAdmin,
    isNotExistById(FormatService),
    checkFormatValidateChainMethod,
    validateRequestSchema,
    isSameTitle(FormatService),
    tryCatch(formatController.update.bind(formatController))
);

//Delete by id (Only for admin)
formatRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(FormatService),
    tryCatch(formatController.deleteById.bind(formatController))
);

export default formatRouter;