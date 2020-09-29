const {Sequelize} = require('sequelize');
const faker = require('faker');

const sequelize = require('../controllers/dbController');

//Load Models
const Event = require('../models/eventModel')(sequelize, Sequelize);

//Load Models
const User = require('../models/userModel')(sequelize, Sequelize);

//Load Models
const UserEvent = require('../models/userEventModel')(sequelize, Sequelize, User, Event);

module.exports = {
    //GET all user data
    apiGet: function (req, res) {
        User.findAll({include: Event}).then(function (users) {
            return res.status(200).json(users);
        });
    },
    apiGetId: function (req, res) {
        User.findOne({where:{user_id: req.params.id},include: Event}).then(function (users) {
            if(users != null) {
                return res.status(200).json(users);
            } else {
                return res.status(200).json({
                    "msg": "user not found"
                })
            }
        });
    },
    apiPost: function (req, res) {
        if (Object.keys(req.body).length) {

            User.create({
                userName: req.body.userName,
            }).then(
                function (user) {
                    let sent = {
                        "msg": "success",
                        "createdUser": {
                            "user_id": user.user_id,
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
                        userName: req.body.userName,
                    }).then(user =>{
                        let sent = {
                            "msg": "success",
                            "updatedUser": {
                                "user_id": user.user_id,
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

            User.findByPk(req.params.id).then(
                function(user) {
                    user.destroy().then(user =>{
                        let sent = {
                            "msg": "success",
                            "deletedUser": {
                                "user_id": user.user_id,
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

    }
    ,

}