mui.init()

/*页面跳转*/
mui(".mui-table-view").on("tap", "a", function() {
	var href = this.getAttribute("href");
	if(!href) {
		return;
	}
	tools.openWindow({ url: href });
})

if(mui.os.plus) {
	document.write('<script src="default/js/setting/settingOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/setting/settingWechat.js" type="text/javascript"></s'+'cript>');
}