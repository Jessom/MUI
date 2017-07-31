mui.init();
var vm = new Vue({
	el: 'body',
	data: {
		userName: "",
		userPwd: "",
		userPwdAgain: "",
		loading: false,
	},
	methods: {
		goRegister: function() {
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
			vm.loading = true;
			var data = {
				"userName": vm.userName,
				"passWord": vm.userPwd
			}

			goRegister(data)

		}

	}
})


if(mui.os.plus) {
	document.write('<script src="default/js/reg/regOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/reg/regWechat.js" type="text/javascript"></s'+'cript>');
}
