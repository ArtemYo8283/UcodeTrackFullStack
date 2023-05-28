import jwt from 'jsonwebtoken';
import response from './response.middleware.js';

export const isAccessUserService = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAccess = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.user_id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAdmin = (req, res, next) => {
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
}

export const isAccessOrAdmin = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.user_id !== userData.userId && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
}

export const isAccessOrAdminUserService = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.id !== userData.userId && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAccessOrAdminProjectService = (Service) => async (req, res, next) => {
    const service = new Service();

    const userData = jwt.verify(req.params.token, 'jwt-key');
    const result = await service.selectByUserId(userData.userId);

    let check = false;
    result.forEach(async (element) => {
        console.log(element.id, req.params.id)
        if (element.id === +req.params.id) {
            check = true;
            console.log('jhgfd')
        }
    });
    if (check == false && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

