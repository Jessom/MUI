mui.init();
var vm = new Vue({
	el: "body",
	data: {
		lastTime: '',
		banner: null,		// 轮播图
		title: '',			// 标题
	},
	ready: function() {
		/*初始化编辑器插件*/
		var quill = new Quill('.content-container', { readOnly: true })
		
		if(localStorage.getItem("editorInfo")) {
			var val = JSON.parse(localStorage.getItem("editorInfo"));
			this.banner = val.banner;
			this.title = val.title;
			quill.setContents(val.content);
		} else {
			mui.alert("暂无相关内容", "提示", "确定", function() {
				mui.back();
			})
		}
	}
})


if(mui.os.plus) {
	document.write('<script src="default/js/preview/previewOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/preview/previewWechat.js" type="text/javascript"></s'+'cript>');
}