var FeedView = function(window, options) {
	this.window = window;
    this.options = (options || {});
	this.table = Titanium.UI.createTableView({});
	this.window.add(this.table);
    
	var self = this;
	this.table.addEventListener("click", function(event) {
        self.onclick(event);
	});
    this.load = function() {
        Titanium.API.info("Require implement load();");
    };
    this.onclick = function(event) {};
    
    if(Titanium.Platform.osname=="iphone") {
        var r = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
        });
        r.addEventListener('click',function() {
            self.load();
        });
        self.window.setRightNavButton(r);
    }
    else if(Titanium.Platform.osname=="android") {
    	var activity = Ti.Android.currentActivity;
    	activity.onCreateOptionsMenu = function(e) {
    		var r = e.menu.add({title : 'Reload'});
    		r.addEventListener('click', function() {
    		    self.load();
    		});
    	};
    }
};
exports.FeedView = FeedView;

FeedView.prototype.setData = function(rows) {
    var self = this;
    var hasDetail = this.options.hasDetail || false;
    this.table.setData(rows.map(function(data) {
        var row = Titanium.UI.createTableViewRow({
            layout:"vertical",
            width: "auto",
            height: "auto",
            hasDetail: hasDetail
        });
        var textColor = "#000";
        if(Titanium.Platform.osname=="android") {
            textColor = "#fff";
        }
        var title = Titanium.UI.createLabel({
            text: data.title,
            color: textColor,
            textAlign: "left",
            font: self.options.titleFont || { fontSize: 16, fontWeight: "bold" },
            height: "auto", top: 4,
            left: 8, right: 8
        });
        row.add(title);
        
        var subtitle = Titanium.UI.createLabel({
            text: data.subtitle,
            color: "#888",
            textAlign: "left",
            font: self.options.subtitleFont || { fontSize: 12 },
            height: "auto", bottom: 4,
            left: 8, right: 8
        });
        row.add(subtitle);
    	row.subtitle = data.subtitle;
    	row.data = data;
    	return(row);
    }));
};
