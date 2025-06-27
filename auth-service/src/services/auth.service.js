import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const authService = {
    register: async ({ email, password, role }) => {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password_hash: hashed, role });
        return { id: user.id, email: user.email, role: user.role };
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        return { token };
    },
};

export default authService;