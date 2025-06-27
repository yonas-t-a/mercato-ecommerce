import authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const requestPasswordReset = async (req, res, next) => {
    try {
        const result = await authService.requestPasswordReset(req.body.email);
        res.json({ message: 'Reset token generated', ...result });
    } catch (error) {
        next(error);
    }
};
