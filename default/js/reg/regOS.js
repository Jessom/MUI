vm.goRegister = function() {
	if(vm.userName == "") {
		mui.toast('请输入用户名');
		return false;
	}
	if(!/^[a-zA-Z][a-zA-Z0-9]{1,18}$/.test(vm.userName)) {
		mui.toast('用户名必须字母开头，长度2到19位哦！');
		return false;
	}
	if(vm.userPwd == "") {
		mui.toast('请输入密码');
		return false;
	}
	if(!/^([A-Za-z0-9]){5,15}$/.test(vm.userPwd)) {
		mui.toast('密码只能是大小写字母和数字，长度6到16位哦！');
		return false;
	}
	if(vm.userPwdAgain == "") {
		mui.toast('请输入确认密码');
		return false;
	}
	if(vm.userPwdAgain !== vm.userPwd) {
		mui.toast('确认密码与密码不符');
		return false;
	}
	vm.loading = true;		// 禁用注册按钮
	var data = {	// 提交注册信息
		"userName": vm.userName,
		"passWord": vm.userPwd
	}
	
	submit(data);
}

var submit = function(data) {
	mui.ajax({
		url: config.OS_URL + "UserRegister",
		type: "POST",
		dataType: "json",
		headers: {"Content-Type":"application/json"},
		data: data,
		success: function(res) {
			vm.loading = false;		// 启用注册按钮
			//console.log("成功： "+ JSON.stringify(res));
			if(res.result > 0) {
				mui.toast("注册成功");
				mui.back();
			} else {
				mui.toast(res.attach);
			}
		},
		error: function(err) {
			vm.loading = false;		// 启用注册按钮
			mui.toast(res.attach);
		}
	})
}
