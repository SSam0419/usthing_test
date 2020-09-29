let express = require('express');
let router = express.Router();

let events = require("../controllers/eventController");

/* GET events listing. */
router.get('/', function (req, res) {
    events.apiGet(req, res);
});
//GET specific event
router.get("/:id", function (req, res) {
    events.apiGetId(req, res);
});

//GET specific event attendees
router.get("/:id/users", function (req, res) {
    events.apiGetUsers(req, res);
});



// POST event data
router.post("/", function (req, res) {
    events.apiPost(req, res);
});

// POST event data
router.post("/:id/users", function (req, res) {
    events.apiPostUsers(req, res);
});

//update events
router.put("/:id",function (req, res) {
    events.apiPut(req, res);
});
//delete events
router.delete("/:id", function (req, res) {
    events.apiDelete(req, res);
});
//delete events
router.delete("/:id/users/:user_id", function (req, res) {
    events.apiDeleteUsers(req, res);
});

module.exports = router;