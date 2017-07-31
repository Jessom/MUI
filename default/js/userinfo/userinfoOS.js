// 退出登录
document.querySelector(".loginout").addEventListener("tap", function() {
	mui.toast("退出成功");
	localStorage.removeItem("verifyInfo");
	localStorage.removeItem("userInfo");
	mui.back();
})

/*渲染数据*/
if(localStorage.getItem("userInfo")) {
	var verify = JSON.parse(localStorage.getItem("verifyInfo"));
	var user = JSON.parse(localStorage.getItem("userInfo"));
	if(user.avatar === null || user.avatar === '') {
		user.avatar = "default/images/userImg.png";
	}
	if(user.sex == 0) {
		user.sex = "女";
	} else {
		user.sex = "男";
	}
	vm.nick = verify.userName;	// 昵称
	vm.image = user.avatar;		// 头像
	vm.uid = verify.uid;		// 会员号
	vm.sex = user.sex;			// 性别
	vm.phone = user.phone;		// 手机号
	vm.sign = user.sign;		// 个性签名
} else {
	mui.alert("您还没有登录", "提示", "确定", function() {
		mui.back();
	})
}


/*更换头像*/
vm.upimage = function() {
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
		$(".cropper-img").attr("src", entry.toLocalURL());		
		initCropper();		// 初始化裁切控件
		
		vm.isCropper = false;	// 更改为裁切状态
		vm.isOS = false;
   });
}

/**
 * 上传图片，更改头像
 */
vm.goUpimage = function() {
	alert(1);
	vm.isOS = true;
	mui.back();
	$(".cropper-img").cropper("destroy");		// 注销裁切插件
}
