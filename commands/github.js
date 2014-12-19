module.exports = {
    regex: /^!github\b/,
    help: '**!github** gives you this link to the bot\'s source code: https://github.com/nderscore/vapebot',
    run: function(data, bot){
        bot.chatBack(data, 'You can find my source code here: https://github.com/nderscore/vapebot');
    }
}