vm.goLogin = function() {
	var uuid;		// 保存设备唯一标识
	var system;		// 当前设备操作系统
	mui.plusReady(function() {
		// 获取设备唯一标识
		uuid = plus.device.uuid;
		if(mui.os.ios) {
			system = 2;
		} else {
			system = 3;
		}
	})
	
	if(vm.userName == "") {
		mui.toast('请输入用户名');
		return false;
	}
	if(vm.userPwd == "") {
		mui.toast('请输入密码');
		return false;
	}
	vm.loading = true;
	
	/*拼接提交请求数据*/
	var data = {
		"loginInfo": {
			"loginMode": 4,
			"clientPlat": 2,
			"clientSystem": system,
			"userName": vm.userName,
			"passWord": vm.userPwd,
			"identCode": uuid,
			"pushCode": "",			
		}
	}
	
	/*发起请求*/
	mui.ajax({
		url: config.OS_URL + "UserLogin",
		type: "POST",
		headers: {"Content-Type":"application/json"},
		dataType: "json",
		data: data,
		success: function(res) {
			vm.loading = false;
			console.log(JSON.stringify(res));
			
			/*登录成功*/
			if(res.result>0) {
				mui.toast('登陆成功');
				var val = res.value;
				var verifyInfo = {
					uid: val.accountId,		// 会员号
					clientPlat: 2,			// 平台，2代表手机
					ident: val.ident,		// 设备唯一表示
					verify: val.verify,		// 用户唯一表示
					userName: val.userName	// 用户名
				};
				var userInfo = {
					avatar: val.image,		// 头像
					phone: val.phone,		// 手机号
					sex: val.sex,			// 性别
					sign: val.sign			// 个性签名
				}
				
				localStorage.setItem("verifyInfo", JSON.stringify(verifyInfo));
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				
				mui.back();
			} else {	// 登录失败
				mui.toast(res.attach);				
			}
		},
		error: function(err) {
			vm.loading = false;
			mui.toast(res.attach);
		}
	})
}