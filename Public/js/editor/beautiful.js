mui.init();

$(document).ready(function() {
	
	// 编辑区域
	$(".ql-editor").attr("contenteditable", "false");
	$(".ql-editor").on("tap", function() {		
		editorArea(true);
		$(".ql-editor").focus();
		if(!mui.os.plus) {
			$(window).scrollTop(0);
		}
		$("header.mui-bar").hide();
	});
	
	insertSuccess();	// 插入完成编辑按钮
	
	// 完成编辑
	$("#success").on("tap", function() {
		document.activeElement.blur();
		editorArea(false);
		$("header.mui-bar").show();
	});
	
	//返回
	/*var oldBack = mui.back;
	mui.back = function() {
		if() {
			alert(1)
			return;
		}
		oldBack();
	}*/
	
	// 弹出收回键盘 编辑器大小控制
	if(!mui.os.plus) {
		$(".ql-editor").on("focus", function() {
			var $this = $(this);
			setTimeout(function() {
				$this.css({"height":"45%"});						
			}, 100);
		});
		$(".ql-editor").on("blur", function() {
			$(this).css({"height":"100%"});
		});
		/*$("header.mui-bar").hide();*/
		/*$(".mui-content").css({"padding-top":"0px"});*/
		$(".ql-toolbar").css({"position": "static"});
	}
})

// 插入完成编辑按钮
function insertSuccess() {
	var previewBtn = document.createElement('button');
	previewBtn.setAttribute('id', 'success');
	$(previewBtn).css({"padding":"0px 10px", "position":"absolute", "top":"0px","right":"0px"});
	previewBtn.innerHTML = '完成编辑';
	$(".ql-toolbar").append(previewBtn);
}

// 编辑区域相关操作
function editorArea(contented) {
	$(".ql-editor").attr("contenteditable", contented);
	if(contented) {
		$(".ql-toolbar").show()
		$(".text-area").siblings("div").hide();
		
		if(mui.os.plus) {
			$(".text-area").css({"height":"auto", "margin":"0px"});
			$(".ql-editor").parent().css({"position": "absolute","top":"0px","padding-top":"50px"});			
		} else {
			$(".text-area").css({"position":"absolute","top":"0","margin-top":"0","height":"90%"});
		}
	} else {
		$(".ql-toolbar").hide()
		$(".text-area").siblings("div").show().siblings("div.mui-preview-image, div.img-container").hide();
		
		if(mui.os.plus) {
			$(".text-area").css({"height":"220px", "margin-top":"20px"});
			$(".ql-editor").parent().css({"position": "static","top":"0px","padding-top":"0px"});			
		} else {
			$(".text-area").css({"position":"static","top":"0","margin-top":"20px","height":"220px"});
		}
	}
}
