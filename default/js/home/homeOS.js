// ajax请求所需参数
var data = {
	"clientPlatform": 2,
	"viewLite": {
		"viewName": "AfficleTable",
		"tableName": "AfficleTable",
		"frameName": "AfficleFrame"
	},
	"searchInfo": {
		"pageCount": 20,
		"pageIndex": 1,
		"sortInfo": {
			"sortType": 6
		}
	}
};
mui.ajax({
	url: config.OS_URL + "ReadDatasBySearchInfo",
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

var webview_detail = null;
var titleNView = { //详情页原生导航配置
	backgroundColor: '#CE4292', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#FFFFFF', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true //自动绘制返回箭头
}


mui("#pullrefresh").on("tap", "div.mui-card", function() {
	var id = this.getAttribute("data-id");
	var title = this.getAttribute("Data-title");
	open_detail(id, title);
})

mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
		url: 'detail.html',
		id: 'detail.html',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4",
			"titleNView": titleNView
		}
	});
})


/**
 * 打开详情
 * @param {String} id	 详情id
 * @param {String} title  标题
 */
function open_detail(id, title) {
	//若详情页尚未预加载完成，则延时等待再执行
	if(!webview_detail) {
		setTimeout(function() {
			open_detail(id);
		}, 100);
	}
	//触发子窗口变更新闻详情
	mui.fire(webview_detail, 'get_detail', {
		id: id,
		title:title
	});

	//更改详情页原生导航条信息
	titleNView.titleText = title;
	webview_detail.setStyle({
		"titleNView": titleNView
	});
	setTimeout(function () {
		webview_detail.show("slide-in-right", 300);
	},150);
}