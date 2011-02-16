var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title: "My Blog",
    url: "blog.js"
});
var tab1 = Titanium.UI.createTab({  
    title: "My Blog",
    icon: "database-36.png",
    window: win1
});
tabGroup.addTab(tab1);  

var win2 = Titanium.UI.createWindow({  
    title: "@appcelerator_ja",
    url: "twitter.js"
});
var tab2 = Titanium.UI.createTab({  
    title: "Twitter",
    icon: "dialog-36.png",
    window: win2
});
tabGroup.addTab(tab2);  

var win3 = Titanium.UI.createWindow({  
    title: "Web site",
    url: "web.js",
    link: "http://www.appcelerator.com"
});
var tab3 = Titanium.UI.createTab({  
    title: "Web",
    icon: "laptop-36.png",
    window: win3
});
tabGroup.addTab(tab3);  

tabGroup.open();
