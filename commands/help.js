module.exports = {
    regex: /^!help\b(?: \!?(\S+))?/,
    help: '**!help** for a list of commands. **!help commandname** for help on a specific command.',
    run: function(data, bot){
        var match = data.message.match(this.regex);
        if(match[1]){
            var cmd = match[1]
            if(bot.commands[cmd] && bot.hasPermission(bot.commands[cmd], data)){
                bot.pm(data.username, bot.commands[cmd].help);
            } else {
                bot.pm(data.username, 'Command **' + cmd + '** not found.')
            }
        } else {
            var cmds = [],
            username = data.username;
            for(var cmd in bot.commands){
                var command = bot.commands[cmd];
                if(command.supergod && bot.isSupergod(username))
                    cmds.push('***!' + cmd + '***');
                if(command.god && bot.isGod(username))
                    cmds.push('*!' +cmd + '*');
                if(!command.god && !command.supergod)
                    cmds.push('!' + cmd);
            }
            bot.pm(username, '**Commands available to you:**', function(){
                bot.pm(username, cmds.join(' '), function(){
                    bot.pm(username, 'Run **!help commandname** for help on a specific command.');
                });
            });
        }
    }
};