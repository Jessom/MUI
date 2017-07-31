var tools = {
	/**
	 * 打开新页面
	 * @param {Object} options	参数对象
	 * 	url	连接url
	 * 	aniShow	动画效果
	 */
	openWindow: function(options) {
		mui.openWindow({
			url: options.url,
			id: options.url,
			show: {
				aniShow: options.aniShow
			},
			styles: {
				statusbar: {
					background: '#CE4292'
				}
			},
			waiting: {
				autoShow: false
			}
		})
	},
	/**
	 * 从数组中删除特定元素
	 * @param {Object} arr	数组对象
	 * @param {Object} val
	 */
	arrRemove: function(arr, index) {
		console.log(arr instanceof Array);
		arr.forEach(function(val, ind) {
			if(index === ind) {
				arr.splice(index, 1);
			}
		})
	}
}
