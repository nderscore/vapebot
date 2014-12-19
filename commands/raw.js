module.exports = {
    supergod: true,
    regex: /^!raw (.+)/,
    help: '**!raw whatever** runs raw comands',
    run: function(data, bot){
        var cmd = data.message.match(this.regex)[1];
        bot.send(cmd);
    }
};