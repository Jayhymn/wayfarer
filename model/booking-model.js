import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'

const Bookings = sequelize.define('Booking', {
    // Model attributes are defined here
    bookingId: {
        type: DataTypes.INTEGER,
        field: 'booking_id',
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false
    },
    tripId: {
        type: DataTypes.INTEGER,
        field: 'trip_id',
        allowNull: false
    },
    busId: {
        type: DataTypes.STRING(20),
        field: 'bus_id',
        allowNull: false
    },
    tripDate: {
        type: DataTypes.DATE,
        field: 'trip_date',
        allowNull: false
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        field: 'seat_number',
        allowNull: false,
    },
    tripStatus: {
        type: DataTypes.TEXT,
        field: 'trip_status',
        allowNull: false
        }
    })

    module.exports = Bookings
