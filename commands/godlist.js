module.exports = {
    supergod: true,
    regex: /!godlist\b/,
    help: '**!godlist** for a list of current god users.',
    run: function(data, bot){
        bot.chatBack(data, '**Current gods:** ' + bot.brains.gods.join(' '), true);
    }
};