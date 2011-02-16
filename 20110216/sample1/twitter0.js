var table = Titanium.UI.createTableView({
});
Titanium.UI.currentWindow.add(table);

var load = function() {
    var http = Ti.Network.createHTTPClient({
        onload: function(response) {
            var json = JSON.parse(http.responseText);
            table.setData(json.map(function(i) {
                return({title: i.text});
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
