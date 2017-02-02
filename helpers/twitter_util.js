const OAuth = require('oauth')
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/'+process.env.ACCESS_TOKEN_SECRET,
    'https://api.twitter.com/oauth/'+process.env.ACCESS_TOKEN,
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

module.exports = {
  getTweet: function(keyword, cb)
  {
    oauth.get(
       'https://api.twitter.com/1.1/search/tweets.json?q='+keyword,
       process.env.ACCESS_TOKEN, //test user token
       process.env.ACCESS_TOKEN_SECRET, //test user secret
       function (e, data, res){
         if (e) console.error(e);
          cb(data);
       });
  },
  getRecent: function(cb)
  {
    oauth.get(
       'https://api.twitter.com/1.1/statuses/user_timeline.json',
       process.env.ACCESS_TOKEN, //test user token
       process.env.ACCESS_TOKEN_SECRET, //test user secret
       function (e, data, res){
         if (e) console.error(e);
          cb(data);
       });
  },
  tweet: function(req, res)
  {
    client.post('statuses/update', {status: req.params.tweet})
  .then(function (tweet) {
    res.send({tweet})
  })
  .catch(function (error) {
    throw error;
  })
  }
}
