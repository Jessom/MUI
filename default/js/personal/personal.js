mui.init()
var isLogin = 0;
if(localStorage.getItem("isLogin")) {
	isLogin = localStorage.getItem("isLogin");
}


var vm = new Vue({
	el: ".mui-content",
	data: {
		nick:"登录/注册",
		image:"default/images/userImg.png",
		uid:"未登录",
		href:"login.html"
	}
})

/*打开页面*/
mui(".mui-table-view").on("tap", "a", function() {
	var href = this.getAttribute("href");
	if(href == null) {
		return;
	}
	tools.openWindow({
		url: href
	})
})

if(mui.os.plus) {
	document.write('<script src="default/js/personal/personalOS.js" type="text/javascript"></s' + 'cript>');
} else {
	document.write('<script src="default/js/personal/personalWechat.js" type="text/javascript"></s' + 'cript>');
}