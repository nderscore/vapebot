var MAX_SIZE = 100;
var DEFAULT_RETURN = 5;

var queue = (function () {
    var array = [];

    /**
     * push a string to the front of the queue
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
        if (typeof n !== 'undefined') { n = DEFAULT_RETURN; }
        var temp = [];
        for (var i = 0; i < n && i < array.length; i++) {
            temp.push(array[i]);
        }
        return temp.reverse(); //return last element at array[0]
    }

    return {
        push: push,
        head: head
    }

})();

module.exports = {
    regex: /^!replay|^!replay (\d*)/,
    help: 'Replay the last [n] lines, or ' + DEFAULT_RETURN + ' by default, of chat',
    run: function (data, bot) {
        var args = data.message.match(this.regex)
        var n = (typeof args[1] === 'undefined' ? DEFAULT_RETURN : args[1]);
        var messages = queue.head(n);
        for(var i = 0; i < messages.length; i++){
            bot.pm(data.user, messages[i].username + ": " + messages[i].message);
        }
    },
    init: function (bot) {
        bot.on('message', function (data) {
            queue.push(data);
        });
    }

};