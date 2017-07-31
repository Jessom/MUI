mui.init();
	
var vm = new Vue({
	el: "body",
	data: {
		lastTime: '',
		banner: null,		// 轮播图
		title: '',			// 标题
		content: null,		// 内容
	},
	methods: {
		
	}
})
/*初始化编辑器插件*/
var quill = new Quill('.content-container', { readOnly: true })

if(mui.os.plus) {
	document.write('<script src="default/js/detail/detailOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/detail/detailWechat.js" type="text/javascript"></s'+'cript>');
}