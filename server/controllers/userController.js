const {Sequelize} = require('sequelize');
const faker = require('faker');

//Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

//Load Models
const User = require('../models/userModel')(sequelize, Sequelize);


//Random user data
let randomUserData = [];


//Create 30 random user data

for (let i = 0; i < 30; i++) {
    randomUserData.push({
        name: faker.name.findName(),
        userName: faker.internet.userName(),
    });
}

//Connect to DB
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection Established");
    })
    .catch(err => {
        console.error("unable to connect", err);
    });

//Create table at new DB
sequelize.sync({force: true})
    .then(() => {
        console.log("database created");
        User.bulkCreate(randomUserData).then(function () {
            console.log("Initial data inserted");
        });
    });


module.exports = {
    //GET all user data
    apiGet: function (req, res) {
        User.findAll().then(function (users) {
            return res.status(200).json(users);
        });
    },
    apiPost: function (req, res) {
        if (Object.keys(req.body).length) {

            User.create({
                name: req.body.name,
                userName: req.body.userName,
            }).then(
                function (user) {
                    let sent = {
                        "msg": "success",
                        "createdUser": {
                            "id": user.id,
                            "name": user.name,
                            "userName": user.userName,
                        },
                    }
                    res.status(200).json(sent);
                }
            ).catch(function (err) {
                let sent = {
                    msg: "create user error: " + err,
                }
                return res.status(400).json(sent);
            });
        } else {
            let sent = {
                msg: "No body content!",
            }
            return res.status(400).json(sent);
        }
    }
    ,
    apiPut: function (req, res) {
        if (Object.keys(req.body).length) {
            User.findByPk(req.params.id)
                .then(function(user){
                    user.update({
                        name: req.body.name,
                        userName: req.body.userName,
                    }).then(user =>{
                        let sent = {
                            "msg": "success",
                            "updatedUser": {
                                "name": user.name,
                                "userName": user.userName,
                            },
                        }
                        res.status(200).json(sent);
                    }).catch(err =>{
                        let sent = {
                            msg: "update user error: " + err,
                        }
                        return res.status(400).json(sent);
                    });
            })
                .catch( err=>{
                let sent = {
                    msg: "update user error: " + err,
                }
                return res.status(400).json(sent);
            });
        }  else {
            let sent = {
                msg: "No body content!",
            }
            return res.status(400).json(sent);
        }

    }
    ,
    apiDelete: function (req, res) {
        if (Object.keys(req.body).length) {
            User.findByPk(req.params.id).then(
                function(user) {
                    user.destroy().then(user =>{
                        let sent = {
                            "msg": "success",
                            "deletedUser": {
                                "name": user.name,
                                "userName": user.userName,
                            },
                        }
                        res.status(200).json(sent);
                    }).catch(err =>{
                        let sent = {
                            msg: "delete user error: " + err,
                        }
                        return res.status(400).json(sent);
                    });
                }
            ).catch( err=>{
                let sent = {
                    msg: "delete user error: " + err,
                }
                return res.status(400).json(sent);
            });
        } else {
            let sent = {
                msg: "No body content!",
            }
            return res.status(400).json(sent);
        }
    }
    ,

}