var table = Titanium.UI.createTableView({
});
Titanium.UI.currentWindow.add(table);
table.addEventListener("click", function(event) {
   var new_window = Titanium.UI.createWindow({
       title: event.rowData.title,
       url: "web.js",
       link: event.rowData.link
   });
   Titanium.UI.currentTab.open(new_window, {animated : true});
});

Titanium.Yahoo.yql("select * from feed where url='http://developer.appcelerator.com/blog/feed'",
    function(e) {
        table.setData(e.data.item.map(function(i) {
            return({title: i.title, link: i.link});
        }));
    }
);