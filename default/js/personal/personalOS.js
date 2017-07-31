// 监听是否登录状态，刷新页面
window.addEventListener("isLogin", function() {
	plus.webview.getWebviewById('personal.html').reload();
})

if(localStorage.getItem("verifyInfo")) {
	var verify = JSON.parse(localStorage.getItem("verifyInfo"));
	var user = JSON.parse(localStorage.getItem("userInfo"));
	if(user.avatar === null || user.avatar === '') {
		user.avatar = "default/images/userImg.png";
	}
	vm.image = user.avatar;
    vm.nick = verify.userName;
    vm.uid = verify.uid;
    vm.href = "userinfo.html";
}
