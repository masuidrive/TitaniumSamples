// twitter.js
var FeedView = require("feedview").FeedView;
var twitterfeed = new FeedView(Titanium.UI.currentWindow, {titleFont: { fontSize: 14 }});

twitterfeed.load = function(event) {
    var self = this;
    var http = Ti.Network.createHTTPClient({
        onload: function(response) {
            var json = JSON.parse(http.responseText);
            self.setData(json.map(function(i) {
                return({title: i.text, subtitle: i.created_at});
            }));
        }
    });
    http.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=appcelerator_ja");
    http.send();
};

twitterfeed.load();