var afkList = (function () {

    /**
     * Internal array containing afk objects
     * @type {Array} of objects
     * @typedef {Object} afk object
     * @property {String} username
     * @property {String} message
     */
    var array = [];

    /**
     * Add username to afk list
     * @param {String} username to add to away list
     * @param {String} [message] optional message
     */
    function add(username, message) {
        message = message || "Away From Keyboard";
        if (contains(username) == -1) {
            array.push({
                username: username,
                message: message
            });
        }
    }

    /**
     * Remove a username from afk list
     * @param {String} username
     */
    function remove(username) {
        var position = contains(username);
        if (position > -1) {
            array.splice(position, 1); //remove object from list
        }
    }

    /**
     * Searches the list for the username object
     * @param {String} username
     * @returns {number} position of user's object, -1 if not found.
     */
    function contains(username) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]['username'] === username) {
                return i;
            }
        }
        return -1; //name not found
    }

    /**
     * Return an away message for a specific user
     * @param username
     * @return {String} message
     */
    function getMessage(username) {
        var position = contains(username);
        if (position > -1) {
            return array[position].message;
        } else {
            return username + " is not away.";
        }
    }

    return {
        add: add,
        remove: remove,
        contains: contains,
        getMessage: getMessage
    }

})();

module.exports = {
    regex: /^!afk ?(.*)/,
    help: 'Set status as afk, with [message]',
    run: function (data, bot) {
        afkList.add(data.username, data.message.match(this.regex)[1]);
    },
    init: function (bot) {
        bot.on('message', function (data) {
            if (afkList.contains(data.username) > -1) {
                afkList.remove(data.username);
            }

            //search for any user mention, e.g. @zifu
            var userRe = /(\@\w+)/g;
            var result;

            while ((result = userRe.exec(data.message)) != null) {
                var username = result[0].slice(1); //remove @ sign
                if (afkList.contains(username) > -1) {
                    bot.send(username + ' is afk: ' + afkList.getMessage(username));
                }
            }

        }).on('userJoin', function (data) {
            if (afkList.contains(data.username) > -1) {
                afkList.remove(data.username);
            }
        })
    }

};