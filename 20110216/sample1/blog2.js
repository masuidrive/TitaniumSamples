var table = Titanium.UI.createTableView({
});
Titanium.UI.currentWindow.add(table);
table.addEventListener("click", function(event) {
   var new_window = Titanium.UI.createWindow({
       title: event.rowData.title_,
       url: "web.js",
       link: event.rowData.link
   });
   Titanium.UI.currentTab.open(new_window, {animated : true});
});

Titanium.Yahoo.yql("select * from feed where url='http://developer.appcelerator.com/blog/feed'",
    function(e) {
        table.setData(e.data.item.map(function(i) {
            var row = Titanium.UI.createTableViewRow({
                layout:"vertical",
                width: "auto",
                height: "auto",
                hasDetail: true
            });
            var textColor = "#000";
            if(Titanium.Platform.osname=="android") {
                textColor = "#fff";
            }
            var message = Titanium.UI.createLabel({
                text: i.title,
                color: textColor,
                textAlign: "left",
                font: { fontSize: 16, fontWeight: "bold" },
                height: "auto", top: 4,
                left: 8, right: 8
            });
            row.add(message);
            var author = Titanium.UI.createLabel({
                text: i.creator,
                color: "#888",
                textAlign: "left",
                font: { fontSize: 12 },
                height: "auto", bottom: 4,
                left: 8, right: 8
            });
            row.add(author);
        	row.title_ = i.title;
        	row.link = i.link;
            return(row);
        }));
    }
);