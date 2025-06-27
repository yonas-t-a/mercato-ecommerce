import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => createId(),
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
    },
    reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reset_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default User;