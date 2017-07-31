mui.init({
	beforeback: function() {	// OS登录成功后，返回personal页面并刷新页面
		if(mui.os.plus) {
			if(!localStorage.getItem("verifyInfo")) {
				var login = plus.webview.getWebviewById("personal.html");
				mui.fire(login,'isLogin');
			}	
			if(!vm.isCropper) {
				vm.isCropper = true;
				$(".cropper-img").cropper("destroy");
				return false;
			}
		}
		return true;
	}
})


// 判断是否登录
var isLogin = 0;
if(localStorage.getItem("isLogin")) {
	isLogin = localStorage.getItem("isLogin");
}

var vm = new Vue({
	el: "body",
	data: {
		isCropper:true,
		isOS: true,
		nick:"",
		image:"default/images/userImg.png",
		uid:"",
		sex:"",
		phone:"",
		sign:"",
	}

})

// 未登录，跳转登录页面
if(isLogin==0) {
	tools.openWindow({ url: "login.html" });
}

var initCropper = function() {
    var options = {
    	aspectRatio: 1 / 1,
		dragCrop: false
    };
    $(".cropper-img").on({}).cropper(options);
}

if(mui.os.plus) {
	document.write('<script src="default/js/userinfo/userinfoOS.js" type="text/javascript"></s' + 'cript>');
} else {
	document.write('<script src="default/js/userinfo/userinfoWechat.js" type="text/javascript"></s' + 'cript>');
}

