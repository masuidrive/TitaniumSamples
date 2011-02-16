var table = Titanium.UI.createTableView({
});
Titanium.UI.currentWindow.add(table);

var load = function() {
    var http = Ti.Network.createHTTPClient({
        onload: function(response) {
            var json = JSON.parse(http.responseText);
            table.setData(json.map(function(i) {
                var row = Titanium.UI.createTableViewRow({
                    layout:"vertical",
                    width: "auto",
                    height: "auto"
                });
                var textColor = "#000";
                if(Titanium.Platform.osname=="android") {
                    textColor = "#fff";
                }
                var message = Titanium.UI.createLabel({
                    text: i.text,
                    color: textColor,
                    textAlign: "left",
                    font: { fontSize: 14 },
                    height: "auto", top: 4,
                    left: 8, right: 8
                });
                row.add(message);
                var timestamp = Titanium.UI.createLabel({
                    text: i.created_at,
                    color: '#888',
                    font: { fontSize: 12 },
                    height: 'auto', bottom: 4,
                    left: 8, right: 8
                });
                row.add(timestamp);
                return(row);
            }));
        }
    });
    http.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=appcelerator_ja");
    http.send();
};
load();

if(Titanium.Platform.osname=="iphone") {
    var r = Titanium.UI.createButton({
        systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
    });
    r.addEventListener('click',function() {
        load();
    });
    Titanium.UI.currentWindow.setRightNavButton(r);
}
else if(Titanium.Platform.osname=="android") {
	var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
		var r = e.menu.add({title : 'Reload'});
		r.addEventListener('click', function() {
		    load();
		});
	};
}
