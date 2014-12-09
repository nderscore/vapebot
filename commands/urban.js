var request = require('superagent');

module.exports = {
    regex: /^!urban (\S+)\s?(\d+)?/,
    help: '**!urban someterm** does an urban dictionary lookup for someterm. **!urban someterm %23** gets the %23th definition.',
    run: function(data, bot){
        var parse = data.message.match(this.regex),
        term = parse[1],
        index = (parse[2] || 1) - 1;

        request.get('http://api.urbandictionary.com/v0/define?term=' + term).
            set('Accept', 'application/json').
            on('error', function(err){ }).
            end(function(result){
                try {
                    var output;
                    result = JSON.parse(result.text);
                    if(result.result_type == 'no_results')
                        output = 'No definition found for ' + term;
                    else if(index >= result.list.length)
                        output = 'There is no definition at index ' + (index + 1);
                    else
                        output = term + ': ' + result.list[index].definition;
                    bot.chatBack(data, output);
                } catch (e) { console.log(e); }
            });
    }
};