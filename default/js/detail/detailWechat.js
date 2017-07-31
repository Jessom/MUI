//向服务端请求文章详情内容
var data = {
	"viewName": "AfficleTable",
	"tableName": "AfficleTable",
	"frameName": "AfficleFrame",
	id: getUrlParam("id")
}
mui.ajax({
	url: config.PC_UR + "ById",
	type: "POST",
	dataType: "json",
	data: data,
	success: function(res) {
		var val = JSON.parse(res.value).values;
		vm.banner = JSON.parse(val.x_images).aimg;
		vm.title = val.x_title;
		quill.setContents(JSON.parse(val.x_content).editor);
	},
	error: function(err) {
		console.log(err);
	}
})

/**
 * 获取url中参数
 * @param {Object} name	需要获取参数的key
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]); 
    return null;
}