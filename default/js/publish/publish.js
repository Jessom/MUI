mui.init();

mui(".mui-table-view").on("tap", "a", function() {
	var href = this.getAttribute("href");
	
	tools.openWindow({url: href});
})
