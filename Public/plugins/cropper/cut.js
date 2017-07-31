mui.init();

mui.plusReady(function() {
	var ws = plus.webview.currentWebview();
	document.getElementById("img").src = ws.imgURL;
	handleImg(ws.x, ws.y);
	var viewId = ws.viewId;

	// 完成按钮
	var flag = true;
	mui(".mui-bar-nav").on("tap", "#handlerSubmit", function(e) {
		if(flag) {
			flag = false;
			var view=plus.webview.getWebviewById(viewId);
			var canvas = $(".img-container > img").cropper("getCroppedCanvas");
			var base = canvas.toDataURL("image/png");
			mui.fire(view,'doit',{
				imgSrc: base
			});
			mui.back();
		}
	})
});

/**
 * 裁切图片参数配置
 * @param x,y	裁切比例
 */
function handleImg(x,y) {
	(function () {
	    var $image = $('.img-container > img'),
	        options = {
	        	aspectRatio: x / y,
    			dragCrop: false
	        };
	    $image.on({
	    	/*
	    	 * 生命周期函数
	    	 */
	    	/*'build.cropper': function (e) {		// 初始化之前
		        console.log(e.type);
		    },
		    'built.cropper': function (e) {			// 初始化之后
		        console.log(e.type);
		    },
		    'dragstart.cropper': function (e) {		// 手指点击裁切区域
		        console.log(e.type, e.dragType);
		    },
		    'dragmove.cropper': function (e) {		// 手指在裁切区域移动
		        console.log(e.type, e.dragType);
		    },
		    'dragend.cropper': function (e) {		// 手指离开裁切区域
		        console.log(e.type, e.dragType);
		    },
		    'zoomin.cropper': function (e) {		// 双指放大
		        console.log(e.type);
		    },
		    'zoomout.cropper': function (e) {		// 双指缩小
		        console.log(e.type);
		    }*/
	    }).cropper(options);
	}());
}
