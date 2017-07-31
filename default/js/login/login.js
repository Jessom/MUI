mui.init({
	beforeback: function() {	// OS登录成功后，返回personal页面并刷新页面
		if(mui.os.plus) {
			if(localStorage.getItem("verifyInfo")) {
				var login = plus.webview.getWebviewById("personal.html");
				mui.fire(login,'isLogin');
			}			
		}
		return true;
	}
});
var vm = new Vue({
	el: 'body',
	data: {
		userName: "",
		userPwd: "",
		loading: false,
	}
})

/*页面跳转*/
mui(".mui-content").on("tap", "a", function() {
	var href = this.getAttribute("href");
	if(href == null) return;
	tools.openWindow({url: href})
})

if(mui.os.plus) {
	document.write('<script src="default/js/login/loginOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/login/loginWechat.js" type="text/javascript"></s'+'cript>');
}


