let express = require('express');
let router = express.Router();
const faker = require('faker');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    next();
});

//GET random images
router.get("/getRandomEventImage", function (req, res) {
    //GET random image

    return res.status(200).json({
        "randomImageURL": faker.image.image(),
    });
});
module.exports = router;
