/*关闭publish页面，避免用户返回publish页面*/
mui.plusReady(function() {
	setTimeout(function() {
		var publish = plus.webview.getWebviewById("publish.html");
		plus.webview.close(publish);
	}, 500)
})



/*点击添加图片*/
vm.addImg = function() {
	var a = [{
		title: "拍照"
	}, {
		title: "从手机相册选择"
	}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: a
	}, function(b) {
		switch (b.index) {
			case 0:
				break;
			case 1:
				getImage();
				break;
			case 2:
				galleryImg();
				break;
			default:
				break
		}
	})
}


/**
 * 拍照
 */
getImage = function() {
	var c = plus.camera.getCamera();
	c.captureImage(function(path) {
		changeToLocalUrl(path);
	}, function(err) {
		console.log("读取拍照文件错误：" + err.message);
	});
}

/**
 * 相册选择
 */
galleryImg = function() {
	plus.gallery.pick(function(path) {
		changeToLocalUrl(path);
	}, function(err) {
		console.log("读取本地图片错误：" + err.message)
	})
}

/**
 * 处理图片具体操作
 * @param {Object} path	图片路径
 */
changeToLocalUrl = function(path) {
	plus.io.resolveLocalFileSystemURL(path, function(entry) {
		oImg.attr("src", entry.toLocalURL());		
		initCropper();		// 初始化裁切控件
		
		vm.isCropper = true;	// 更改为裁切状态
   });
}
