mui.init({
	beforeback: function() {	// 
		if(vm.isCropper) {
			vm.isCropper = false;
			return false;
		}
		if(vm.isEditor) {
			document.querySelector(".ql-editor").setAttribute("contenteditable", "false");
			vm.isEditor = false;
			return false;
		}
		return true;
	}
});
// 全局定义裁切图片对象
var oImg = $(".cropper-img");
var vm = new Vue({
	el: "body",
	data: {
		headlines: [],		// 头图数组
		maxLength: 3,		// 头图最大个数
		isCropper: false,	// 是否裁切状态
		isEditor: false,	// 是否编辑状态
		title: '',			// 标题
	},
	methods: {
		getBgimg: function(val) {
			console.log(val);
			return "background-image: url("+val+")";
		},
		/*删除图片*/
		deleteImg: function(val) {
			tools.arrRemove(vm.headlines, val);
		},
		/**
		 * 点击完成按钮， 获取图片信息
		 */
		getImg: function() {
			var c = oImg.cropper("getCroppedCanvas", {width:640,height:360});
			var base = c.toDataURL("image/jpeg");
			vm.headlines.push(base);
			vm.isCropper = false;
			oImg.cropper("destroy");
			console.log(vm.headlines.length);
		},
		/**
		 * 编辑
		 */
		editorContent: function() {
			document.querySelector(".ql-editor").setAttribute("contenteditable", "true");
			vm.isEditor = true;
			$(".ql-toolbar").show();
			$(".ql-container").height("100%")
		},
		/**
		 * 完成编辑
		 */
		editorSuccess: function() {
			document.querySelector(".ql-editor").setAttribute("contenteditable", "false");
			vm.isEditor = false;
			$(".ql-toolbar").hide();
			$(".ql-container").height("220px");
		},
		/**
		 * 预览
		 */
		preview: function() {
			if(this.headlines.length < 1) {
				mui.toast("请至少选择一张头图");
				return;
			}
			if(this.title === '') {
				mui.toast("请输入标题");
				return;
			}
			if(quill.getContents().ops.length <= 1) {
				mui.toast("请输入内容");
				return;
			}
			console.log(JSON.stringify(quill.getContents()));
			
			var editorInfo = {
				banner: this.headlines,			// 头图
				title: this.title,				// 标题
				content: quill.getContents()	// 编辑内容
			}
			
			localStorage.setItem("editorInfo", JSON.stringify(editorInfo));
			
			tools.openWindow({url: "preview.html"});
		}
	},
	ready: function() {
		document.querySelector(".ql-editor").setAttribute("contenteditable", "false");
	}
})


/**
 * 初始化裁图插件
 */
var initCropper = function() {
    var options = {
    	aspectRatio: 16 / 9,
		dragCrop: false
    };
    $(".cropper-img").on({}).cropper(options);
}


if(mui.os.plus) {
	document.write('<script src="default/js/editor/editorOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/editor/editorWechat.js" type="text/javascript"></s'+'cript>');
}