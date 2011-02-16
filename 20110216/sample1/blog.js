// blog.js
var FeedView = require("feedview").FeedView;
var blogfeed = new FeedView(Titanium.UI.currentWindow, {hasDetail: true});

blogfeed.load = function(event) {
    var self = this;
    Titanium.Yahoo.yql("select * from feed where "+
        "url='http://developer.appcelerator.com/blog/feed'",
        function(e) {
            self.setData(e.data.item.map(function(i) {
                return({title: i.title, subtitle: i.creator, link: i.link});
            }));
        }
    );
};

blogfeed.onclick = function(event) {
   var new_window = Titanium.UI.createWindow({
       url: "web.js",
       title: event.rowData.data.title,
       link: event.rowData.data.link
   });
   Titanium.UI.currentTab.open(new_window, {animated : true});
};

blogfeed.load();