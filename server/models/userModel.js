//User model
module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define('Users', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });
    return User;
}
