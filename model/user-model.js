import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'

const User = sequelize.define('Users', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        field: 'email',
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        field: 'first_name',
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        field: 'last_name',
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'is_admin',
        allowNull: true,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING(200),
        field: 'password',
        allowNull: false,
        }
    })

    module.exports = User
