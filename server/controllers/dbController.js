const {Sequelize} = require('sequelize');


//Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});
//Connect to DB
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection Established");
    })
    .catch(err => {
        console.error("unable to connect", err);
    });


module.exports = sequelize;