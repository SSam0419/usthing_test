let express = require('express');
let router = express.Router();

let user = require("../controllers/userController");

/* GET users listing. */
router.get('/', function (req, res) {
    user.apiGet(req, res);
});
// POST user data
router.post("/", function (req, res) {
    user.apiPost(req, res);
});
router.put("/:id",function (req, res) {
   user.apiPut(req, res);
});
router.delete("/:id", function (req, res) {
    user.apiDelete(req, res);
});

module.exports = router;
