var MAX_SIZE = 100;
var DEFAULT_RETURN = 5;

var queue = (function () {
    var array = [];

    /**
     * push a string to the end of the queue
     * @param {message} data message input
     */
    function push(data) {
        array.push(data);
        if (array.length > MAX_SIZE) {
            array.splice(0, array.length - MAX_SIZE);
        }
    }

    /**
     * return most recent n messages (first)
     * @param [n] number of
     * @return {Array} messages
     */
    function head(n) {
        if (typeof n === 'undefined') { n = DEFAULT_RETURN; }

        var temp = [];
        for (var i = array.length - 1; (array.length - i) <= n && i >= 0; i--) {
            temp.push(array[i]);
        }
        return temp.reverse(); //return oldest element at temp[0]
    }

    return {
        push: push,
        head: head
    }

})();

module.exports = {
    regex: /^!replay ?(\d*)/,
    help: 'Replay the last [n] lines, or ' + DEFAULT_RETURN + ' by default, of chat',
    run: function (data, bot) {
        var args = data.message.match(this.regex);
        var n = (args[1] === '' ? DEFAULT_RETURN : args[1]);
        var messages = queue.head(n);
        for (var i = 0; i < messages.length; i++) {
            //delay messages to prevent out of order async bot.pm calls
            setTimeout(function (a, b) {
                bot.pm(a, b);
            }, 200 * i, data.username, messages[i].username + ": " + messages[i].message);
        }
    },
    init: function (bot) {
        bot.on('message', function (data) {
            queue.push(data);
        });
    }

};