
document.addEventListener('get_detail', function(event) {
	var id = event.detail.id;
	if(!id) {
		return;
	}
	vm.title = event.detail.title;
	//向服务端请求文章详情内容
	var data = {
		clientPlatform: 2,
		viewLite: {
			"viewName": "AfficleTable",
			"tableName": "AfficleTable",
			"frameName": "AfficleFrame"
		}, 
		id: id
	}
	mui.ajax({
		url: config.OS_URL + "ReadDataById",
		type: "POST",
		dataType: "json",
		headers: {"Content-Type": "application/json"},
		data: data,
		success: function(res) {
			var val = JSON.parse(res.value).values;
			vm.banner = JSON.parse(val.x_images).aimg;
			vm.title = val.x_title;
			quill.setContents(JSON.parse(val.x_content).editor);
		},
		error: function(err) {
			alert(err);
		}
	})
});