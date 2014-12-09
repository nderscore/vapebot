// ohms law calculator
module.exports = { 
    regex: /^!calc (\d*\.?\d*)(w|a|o|v|W|A|O|V)\D*(\d*\.?\d*)(w|a|o|v|W|A|O|V)/,
    help: '**!calc X X** performs ohms law calculations. ' +
          '**X**\'s can be replaced with any volt, ohm, watt, or amp value. Examples: ' +
          '**!calc 4.2v 1.6o !calc 10a 6v !calc 8w .6o**',
    run: function(data, bot){
        var values = {
            v: 0, a: 0, o: 0, w: 0
        },
        parse = data.message.match(this.regex);

        values[parse[2].toLowerCase()] = +parse[1];
        values[parse[4].toLowerCase()] = +parse[3];

        if(values.v && values.o){
            values.a = values.v / values.o;
            values.w = values.v * values.a;
        } else if(values.v && values.a){
            values.o = values.v / values.a;
            values.w = values.v * values.a;
        } else if(values.v && values.w){
            values.a = values.w / values.v;
            values.o = values.v / values.a;
        } else if(values.o && values.a){
            values.v = values.a * values.o;
            values.w = values.a * values.a * values.o;
        } else if(values.a && values.w){
            values.v = values.w / values.a;
            values.o = values.v / values.a;
        } else if(values.o && values.w){
            values.a = Math.sqrt((values.w / values.o), 2);
            values.v = values.a * values.o;
        } else {
            values = {
                v: 0, a: 0, o: 0, w: 0
            };
        }

        var output = '@' + data.username + ' {v}V {o}Ω {w}W {a}A'.replace(/\{[^}]+\}/g, function(x){
            return Math.round(values[x.slice(1,-1)] * 100) / 100;
        });

        bot.chatBack(data, output);
    }
};