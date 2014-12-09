var request = require('superagent'),
    feed = require('feed-read'); // modified feed-read to add guid

module.exports = {
    regex: /^!deals\s?(\d+)?/,
    help: '**!deals** returns the latest 3 deals from vapor joes.',
    run: function(data, bot){
        feed('http://vaporjoes.com/blog/feed/', function(err, result){
            for(var i = 0; i < 3; i++){
                var deal = result[i];
                bot.chatBack(data, '**' + deal.title + '** : ' + deal.guid);
            }
        });
    }
};