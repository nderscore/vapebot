module.exports = {
    regex: /^!hi\b/,
    help: '**!hi** makes the bot say hi to you',
    run: function(data, bot){
        bot.chatBack(data, 'Oh, hi @' + data.username + '!');
    }
};