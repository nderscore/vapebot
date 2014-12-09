module.exports = {
    god: true,
    regex: /^!say (.+)/,
    help: '**!say some text** makes the bot say *some text* in chat.',
    run: function(data, bot){
        var msg = data.message.match(this.regex)[1];
        var preventCommands = msg.match(/^\s*\/(\w+)/);
        if(preventCommands && preventCommands[1] != 'me')
            bot.chatBack(data, 'Nice try, ' + data.username + '!');
        else
            bot.send(msg);
    }
};