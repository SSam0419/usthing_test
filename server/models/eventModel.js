//Posts model
module.exports = function (sequelize, DataTypes) {
    const Event= sequelize.define('Event', {
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventDesc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        eventImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });
    return Event;
}