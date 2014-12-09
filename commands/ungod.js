module.exports = {
    supergod: true,
    regex: /^!ungod (.+)/,
    help: '**!ungod username** removes username from the god list.',
    run: function(data, bot){
        var username = data.message.match(this.regex)[1];
        bot.brains.gods = bot.brains.gods.filter(function(x){ return x !== username; });
        bot.save();
        bot.chatBack(data, 'Removed ' + username + ' from the godlist', true);
        bot.whisper(username, data.username + ' has removed you from the god list.');
    }
};