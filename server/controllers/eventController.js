const {Sequelize} = require('sequelize');
const faker = require('faker');
const sequelize = require('../controllers/dbController');


//Load Models
const Event = require('../models/eventModel')(sequelize, Sequelize);

//Load Models
const User = require('../models/userModel')(sequelize, Sequelize);

//Load Models
const UserEvent = require('../models/userEventModel')(sequelize, Sequelize, User, Event);


//COUNTS random, user will always be more than events
const EVENT_COUNT = Math.round(Math.random()*(20-10)+10);
const USER_COUNT =  Math.round(Math.random()*(2*EVENT_COUNT-EVENT_COUNT)+EVENT_COUNT);

//Random Event data
let randomEventData = [];

//Random user data
let randomUserData = [];

//Create 30 random Event data

for (let i = 0; i < EVENT_COUNT; i++) {
    randomEventData.push({
        eventName: faker.lorem.words(),
        eventDesc: faker.lorem.paragraph(),
        eventImage: faker.image.nightlife(),
        eventStartDate: faker.date.future(),
    });
}

//Create 30 random user data and connect to events

for (let i = 0; i < USER_COUNT; i++) {
    randomUserData.push({
        userName: faker.internet.userName(),
        event_id: Math.round((Math.random() * USER_COUNT) + 1),
    });
}

let user;

//Create table at new DB
sequelize.sync({force: true})
    .then(() => {
        console.log("database created");
        return Event.bulkCreate(randomEventData).then(()=>console.log("event data inserted")).catch(err=>console.error(err));
    }).then(() => {
        return User.bulkCreate(randomUserData).then(()=>console.log("user data inserted")).catch(err=>console.error(err));
    }).then(()=>{
        return createRandomData();
});

async function createRandomData() {
    for(let i = 0; i < USER_COUNT; i++) {
        let userId = Math.round((Math.random()*(USER_COUNT-1))+1);
        let eventId = Math.round((Math.random()*(EVENT_COUNT-1))+1);

        let user = await User.findOne({where:{user_id: userId }});
        let event = await Event.findOne({where:{event_id: eventId}});
        event.addUser(user);
    }
}

module.exports = {
    //GET all Event data
    apiGet: function (req, res) {
        Event.findAll({include: User}).then(function (events) {
            return res.status(200).json(events);
        });
    },
    apiGetId: function (req, res) {
        Event.findOne({where: {event_id: req.params.id}, include: User}).then(function (events) {
            if(events != null) {
                return res.status(200).json(events);
            } else {
                return res.status(200).json({
                    "msg": "event not found"
                })
            }
        });
    },
    apiGetUsers: function (req, res) {
        Event.findOne({where: {event_id: req.params.id}, include: User}).then(event => {
            if(event != null) {
                return res.status(200).json(event.Users);
            } else {
                return res.status(200).json({
                    "msg": "event not found"
                })
            }
        })
    },
    //GET random image
    apiGetRandomImage: function (req, res) {
        return res.status(200).json({
            "randomImageURL": faker.image.image(),
        })
    },
    //POST create new event
    apiPost: function (req, res) {
        if (Object.keys(req.body).length) {

            Event.create({
                eventName: req.body.eventName,
                eventDesc: req.body.eventDesc,
                eventImage: req.body.eventImage,
                eventStartDate: faker.date.future(),
            }).then(
                function (event) {
                    let sent = {
                        "msg": "success",
                        "createdEvent": {
                            "event_id": event.event_id,
                            "eventName": event.eventName,
                            "eventImage": event.eventImage,
                            "eventDesc": event.eventDesc,
                        },
                    }
                    res.status(200).json(sent);
                }
            ).catch(function (err) {
                let sent = {
                    msg: "create event error: " + err,
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
    //POST assign user to event
    apiPostUsers: function (req, res) {
        if (Object.keys(req.body).length) {

            User.findOne({where:{
                user_id: req.body.user_id,
            }}).then(
                function (user) {
                    if(user != null) {
                        Event.findOne({where: {event_id: req.params.id}}).then(
                            function (event) {
                                event.addUser(user).then(user => {
                                    let sent = {
                                        "msg": "success",
                                        "addedUserToEvent": {
                                            "event_id": event.event_id,
                                            "eventName": event.eventName
                                        },
                                    }
                                    res.status(200).json(sent);
                                })
                            });
                    } else {
                        return res.status(200).json({
                            "msg": "user not found in database, create using POST /users endpoint!"
                        })
                    }
                }
            ).catch(function (err) {
                let sent = {
                    msg: "create event error: " + err,
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
    //PUT update event
    apiPut: function (req, res) {
        if (Object.keys(req.body).length) {
            Event.findByPk(req.params.id)
                .then(function (event) {
                    event.update({
                        eventName: req.body.eventName,
                        eventDesc: req.body.eventDesc,
                        eventStartDate: faker.date.future(),
                    }).then(event => {
                        let sent = {
                            "msg": "success",
                            "updatedEvent": {
                                "event_id": event.event_id,
                                "eventName": event.eventName,
                                "eventDesc": event.eventDesc,
                            },
                        }
                        res.status(200).json(sent);
                    }).catch(err => {
                        let sent = {
                            msg: "update event error: " + err,
                        }
                        return res.status(400).json(sent);
                    });
                })
                .catch(err => {
                    let sent = {
                        msg: "update event error: " + err,
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
    //DELETE delete event
    apiDelete: function (req, res) {
        if (Object.keys(req.body).length) {
            Event.findByPk(req.params.id).then(
                function (event) {
                    event.destroy().then(event => {
                        let sent = {
                            "msg": "success",
                            "deletedEvent": {
                                "event_id": event.event_id,
                                "eventName": event.eventName,
                                "eventDesc": event.eventDesc,
                            },
                        }
                        res.status(200).json(sent);
                    }).catch(err => {
                        let sent = {
                            msg: "delete event error: " + err,
                        }
                        return res.status(400).json(sent);
                    });
                }
            ).catch(err => {
                let sent = {
                    msg: "delete event error: " + err,
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

    //POST remove user from event
    apiDeleteUsers: function (req, res) {
        if (Object.keys(req.body).length) {
            User.findOne({where:{
                    user_id: req.body.user_id,
                }}).then(
                function (user) {
                    if(user != null) {
                        Event.findOne({where: {event_id: req.params.id}}).then(
                            function (event) {
                                event.removeUser(user).then(user => {
                                    if(user) {
                                        let sent = {
                                            "msg": "success",
                                            "removedUserFromEvent": {
                                                "event_id": event.event_id,
                                                "eventName": event.eventName
                                            },
                                        }
                                        res.status(200).json(sent);
                                    } else {
                                        res.status(200).json({
                                            "msg": "user not found in event"
                                        })
                                    }
                                })
                            });
                    } else {
                        return res.status(200).json({
                            "msg": "user not found in event"
                        })
                    }
                }
            ).catch(function (err) {
                let sent = {
                    msg: "create event error: " + err,
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