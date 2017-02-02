var express = require('express');
var router = express.Router();

var searchTweet = require('../helpers/twitter_util')
/* GET home page. */
router.get('/tweet/:tweet', searchTweet.tweet);

module.exports = router;
