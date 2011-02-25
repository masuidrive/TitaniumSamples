// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel({
text: "TEXT"
});
window.add(label);
window.open();

// TODO: write your module tests here
var CustomImage = require('jp.masuidrive.it.customimage');
Ti.API.info("module is => " + CustomImage);

CustomImage.savejpeg(window.toImage(), Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'compressed10.jpg').nativePath, 0.1);
CustomImage.savejpeg(window.toImage(), Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'compressed100.jpg').nativePath, 1);

