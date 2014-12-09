var ICHC = require('./ICHC.js'),
    request = require('superagent'),
    storage = require('node-persist');

var bot = ICHC({
    user: 'vapebot',
    apiKey: require('./apiKey.json').apiKey,
    room: 'ecrvaperoom',
    debug: false
});

/* brains */

storage.initSync({
    dir: __dirname + '/brains'
});

bot.brains = storage.getItem('brains');

bot.save = function(){
    storage.setItem('brains', bot.brains);
};

if(!bot.brains){
    bot.brains = {
        seenUsers: [],
        gods: [],
        superGods: []
    };
    bot.save();
}

/* helper functions */

bot.chatBack = function(data, message, privacy){
    if(data.eventType == 'message' && privacy)
        bot.whisper(data.username, message);
    else if(data.eventType == 'message')
        bot.send(message);
    else 
        bot[data.eventType](data.username, message);
};

/* commands and permissions */

bot.refreshCommands = function(){
    bot.commands = {};
    require('fs').readdirSync(__dirname + '/commands').
        forEach(function(file){
            var cmd = file.match(/(.+)\.js/);
            if(cmd)
                bot.commands[cmd[1]] = require('./commands/' + cmd[0]);
        });
};
bot.refreshCommands();

/* permissions */

bot.isGod = function(username){
    return ~bot.brains.superGods.indexOf(username) || ~bot.brains.gods.indexOf(username);
};

bot.isSupergod = function(username){
    return ~bot.brains.superGods.indexOf(username);
};

bot.hasPermission = function(command, data){
    var username = data.username;
    if(command.supergod && bot.isSupergod(username))
        return true;
    if(command.god && bot.isGod(username))
        return true;
    if(!command.god && !command.supergod)
        return true;
    return false;
};

/* events */

bot.on('message whisper pm', function(data){
    var username = data.username;
    for(var cmd in bot.commands){
        var command = bot.commands[cmd];
        if(command.regex.test(data.message)){
            console.log('['+ data.eventType + '] '+ data.username + ': ' + data.message);
            if(bot.hasPermission(command, data))
                command.run(data, bot);
        }
    }
}).
on('userJoin', function(data){
    var username = data.username,
        firstJoinMsg = 'Welcome to the vape room @' + username + '! Say !help for a list of commands. ' +
                       'We can be a bunch of idlers here sometimes, so don\'t freak out if no one responds to you right away.',
        normalJoinMsg = 'Welcome back to the vape room @' + username + '! Say !help for a list of commands.',
        isFirstTimer = !~bot.brains.seenUsers.indexOf(username);

    if(isFirstTimer){
        bot.brains.seenUsers.push(username);
        bot.save();
        this.whisper(data.username, firstJoinMsg);
    } else {
        this.whisper(data.username, normalJoinMsg);
    }
    
}).
on('error', function(data){
    console.log('ERROR: ' + data.message);
}).
on('send', function(data){
    console.log('-> ' + data.message);
}).
connect(function(data){
    this.send('/color 6EBCCA');
    this.whisper('nderscore','Happy birthday!');
});