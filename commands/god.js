module.exports = {
    supergod: true,
    regex: /^!god (.+)/,
    help: '**!god username** adds username to the god list.',
    run: function(data, bot){
        var username = data.message.match(this.regex)[1];
        bot.brains.gods.push(username);
        bot.save();
        bot.chatBack(data, 'Added ' + username + ' to the godlist', true);
        bot.whisper(username, data.username + ' just added you to the god list. You have access to more commands now.');
    }
};