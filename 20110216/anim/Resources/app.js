var window = Titanium.UI.createWindow({  
backgroundColor: "#fff"
});

var button = Titanium.UI.createButton({
	title: "食べたい",
	top: 350,
	left: 180,
	height: 50, width: 100
});
window.add(button);
button.addEventListener("click", function() {
    showHeart();
});

window.open();

function showHeart(){ 
    //=== 下から上へ移動するアニメーション（v1用）
    var anim_up = Ti.UI.createAnimation({
    	duration: 900,
    	transform: Ti.UI.create2DMatrix().translate(0, -40)
    });
    
    // 下から上へ移動するコンテナView
    var v1 = Ti.UI.createView({
    	width: 100,
    	height: 23
    });
    
    //=== v2 = フェードアウトするコンテナView
    var v2 = Ti.UI.createView();
    v1.add(v2);

    //=== フェードアウトアニメーション（v2用）
    var fadeout = Ti.UI.createAnimation({
    	delay: 700,
    	duration: 200,
    	opaque: true,
    	opacity: 0.0
    });
    
    //=== heart = 左右移動するハート本体View
    var heart = Ti.UI.createView({
    	backgroundImage: "mog_bottom_heart.png",
    	width: 25,
    	height: 23,
    	left: 100/2 - 25/2
    });
    v2.add(heart);
    
    //=== 左右移動アニメーション１（heart用）
    var anim_lr = Ti.UI.createAnimation({
    	duration: 300,
    	left: 100-25
    });
    anim_lr.addEventListener("complete", function(){
        //=== 左右移動アニメーション２（１が終わったら開始）（heart用）
        var anim3 = Ti.UI.createAnimation({
        	duration: 300,
        	autoreverse: true,
        	repeat: 1,
        	left: 0
        });
        //=== 終わったらRemove
        anim3.addEventListener("complete", function(){
        	window.remove(v1);
        });
        heart.animate(anim3);
    });

    v1.left = 175;
    v1.top = 348;
    window.add(v1);

    //=== それぞれのVeiwでアニメーション開始
    heart.animate(anim_lr);
    v1.animate(anim_up);
    v2.animate(fadeout);
};
