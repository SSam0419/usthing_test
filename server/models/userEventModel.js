//UserEvent model
module.exports = function (sequelize, DataTypes, User, Event) {

    const UserEvent = sequelize.define('UserEvent', {}, {timestamps: false});
    User.belongsToMany(Event, {through: UserEvent});
    Event.belongsToMany(User, {through: UserEvent});

    return UserEvent;
}