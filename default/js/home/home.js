mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			color:'#ff6600',
			offset: '0px',
			height: "50px",
			range: "100px",
			auto: true,
			callback: pullupRefresh
		},
		up : {
	    	height: 50,//可选.默认50.触发上拉加载拖动距离
	    	contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	    	contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	    	callback: pullupRefreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	}
});

// 下拉刷新具体操作
function pullupRefresh() {
	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();				
}
function pullupRefreshUp() {
	mui('#pullrefresh').pullRefresh().refresh(true);
}

var vm = new Vue({
	el: "body",
	data: {
		dataList: []
	},
	methods: {
		getImg: function(val) {
			return JSON.parse(val).aimg[0]
		},
		getSrc: function(id) {
			return "detail.html?id="+id;
		}
	}
})

if(mui.os.plus) {
	document.write('<script src="default/js/home/homeOS.js" type="text/javascript"></s'+'cript>');
} else {
	document.write('<script src="default/js/home/homeWechat.js" type="text/javascript"></s'+'cript>');
}