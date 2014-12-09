module.exports = {
    supergod: true,
    regex: /^!refresh\b/,
    help: '**!refresh** reloads bot commands without restarting the bot.',
    run: function(data, bot){
        bot.refreshCommands();
        bot.chatBack(data, 'Commands refreshed.', true);
    }
};