// ajax请求所需参数
var data = {
	"viewName": "AfficleTable",
	"tableName": "AfficleTable",
	"frameName": "AfficleFrame",
	"searchInfo": {
		"pageCount": 20,
		"pageIndex": 1,
		"sortInfo": {
			"sortType": 6
		}
	}
};

mui.ajax({
	url: config.PC_UR + "BySearchInfo",
	type: "POST",
	dataType: "json",
	headers: {"Content-Type": "application/json"},
	data: data,
	success: function(res) {
		console.log(res.value);
		if(res.result > 0) {
			vm.dataList = JSON.parse(res.value);
		}
	},
	error: function(err) {
		alert(err);
	}
})

// 页面跳转
mui("#pullrefresh").on("tap", "div.mui-card", function() {
	var href = this.getAttribute("data-src");
	
	mui.openWindow({
		url: href,
		id: href,
		waiting: {
			autoShow: false
		}
	})
})