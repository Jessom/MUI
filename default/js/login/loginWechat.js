vm.goLogin = function() {
	if(vm.userName == "") {
		mui.toast('请输入用户名');
		return false;
	}
	if(vm.userPwd == "") {
		mui.toast('请输入密码');
		return false;
	}
	vm.loading = true;

	var data = {
		"loginInfo": {
			"loginMode": 4,
			"clientPlat": 4,
			"clientSystem": 1,
			"userName": vm.userName,
			"passWord": vm.userPwd,
			"identCode": "aaaaaaaaa",
			"pushCode": "",
		}
	}
	getUserInfo(data)
}
function getUserInfo(data) {
	mui.ajax({
		url: config.PC_URL + "UserLogin",
		type: "post",
		data: data,
		async: true,
		dataType: "json",
		success: function(data) {
			vm.loading = false;
			if(data.result > 0) {

				mui.toast('登陆成功');

				var verifyInfo = {
					uid: data.value.accountId,
					clientPlat: 4,
					ident: data.value.ident,
					verify: data.value.verify,
					token: ""
				};
				
				localStorage.setItem("verifyInfo", JSON.stringify(verifyInfo));
				localStorage.setItem("isLogin", 1);
				localStorage.setItem("uid", data.value.accountId);
				setTimeout(function() {
					mui.back();
				}, 1000);
			} else {
				mui.toast(data.attach);
			}
		},
		error: function(xhr) {
			vm.loading = false;
			mui.toast(xhr);
		},
	})
}