import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'

const Trip = sequelize.define('Trip', {
    // Model attributes are defined here
    tripId: {
        type: DataTypes.INTEGER,
        field: 'trip_id',
        allowNull: false,
        primaryKey: true
    },
    busId: {
        type: DataTypes.STRING(20),
        field: 'bus_id',
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING(50),
        field: 'origin',
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING(50),
        field: 'destination',
        allowNull: false
    },
    tripDate: {
        type: DataTypes.DATE,
        field: 'trip_date',
        allowNull: false
    },
    fare: {
        type: DataTypes.STRING(10),
        field: 'fare',
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT,
        field: 'status',
        defaultValue: 'incomplete',
        allowNull: false
        }
    })

    module.exports = Trip
