mui.init();
mui.plusReady(function() {
	// 解决IOS下position:fixed弹出问题
	plus.webview.currentWebview().setStyle({
	    softinputMode: "adjustResize"
	});
});
var options = null;
/********* 创建toolbar *********/
if(mui.os.plus) {
	options = [
		{ 'header': 5 },
		{ 'list': 'ordered'},
		{ 'indent': '+1'},
	];
} else {
	options = [
		{ 'header': 5 },
		{ 'list': 'ordered'},
		{ 'indent': '+1'},
		"image"
	]
}
var quill = new Quill('#editor', {
	modules: {
		toolbar: options
	},
	theme: 'snow'
});
/********* 创建toolbar *********/


$(function() {
	setImgWH();		// 设置图片的宽高

	/****** toolbar 功能按钮 ******/
	$(".ql-header").on("tap", function() {
		toolBarChange($(this),{ val1: '5', val2: '3', val3: '' });
	});
	$(".ql-list").on("tap", function(e) {
		/*console.log(e);*/
		toolBarChange($(this),{ val1: 'ordered', val2: 'bullet', val3: '' });
	});
	$(".ql-indent").on("tap", function() {
		toolBarChange($(this),{ val1: '+1', val2: '-1', val3: '+1' });
	});
	/****** toolbar 功能按钮 end ******/

	if(mui.os.plus) {
		var imgBtn = document.createElement('button');
		imgBtn.setAttribute('id', 'insertImg');
		imgBtn.innerHTML = '<i class="iconfont icon-image"></i>';
		$(".ql-formats").append(imgBtn);
	}

	/********* 插入image按钮 *********/
	$(".ql-header[value='5']").html('<i class="iconfont icon-hbiaoqian"></i>');
	/********* 插入image按钮 *********/
	
	mui("body").on("tap", "img[data-preview-src]", function() {
		document.activeElement.blur();
	})

	/********* 阻止键盘弹出 *********/
	mui(".ql-toolbar").on("tap", "button", function() {});	// 不让键盘收回
	mui(".ql-editor").on("tap", "img", function() {
		document.activeElement.blur();
	});
	/********* 阻止键盘弹出 *********/

	/**
	 * 页面展示光标位置
	 * 这里判断android是因为ios下监听了onselectionchange事件
	 */
	if(mui.os.android) {
		$(".ql-editor").on('tap', function(e) {
			var top = e.target.offsetTop;
			if(top === 44) {
				return false;
			}
			$(this).animate({scrollTop: top - 80+'px'}, 300);
		});
	}


	// 插入图片
	mui(".ql-formats").on("tap", "#insertImg", function() {
		document.activeElement.blur();

		if(mui.os.plus){
			var a = [{
				title: "拍照"
			}, {
				title: "从手机相册选择"
			}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: a
			}, function(b) {
				switch (b.index) {
					case 0:
						break;
					case 1:
						quillGetImage();
						break;
					case 2:
						quillGalleryImg();
						break;
					default:
						break;
				}
			})
		}
	});
});


// 记录下当前光标所在的标签，用于插入图片
var oSelection = document.getSelection();
var currentElem;
try{
	document.onselectionchange = function(e) {
		// 判断当前行的内容是否为空
		if(oSelection.anchorNode.textContent === '') {
			currentElem = oSelection.anchorNode.childNodes[0].parentElement;
		} else {
			currentElem = oSelection.anchorNode.parentElement;
		}
	};
}catch(e){
	console.log(e);
}



/********* 拍照 *********/
function quillGetImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(path) {
		var oElem = document.createElement("p");
		insertImages(path, oElem);
	}, function(err) {
		console.log("读取拍照文件错误：" + err.message);
	});
}


/********* 相册选择 *********/
function quillGalleryImg() {
	plus.gallery.pick(function(path) {
		var aURL = path.files;
		var oElem = document.createElement("p");
		// 遍历图片数组，插入图片
		aURL.forEach(function(val) {
			insertImages(val, oElem);
		});
	}, function(err) {
		console.log("读取本地图片错误：" + err.message);
	}, {multiple: true,system: false});
}


/**
 * 插图图片
 * @param path	图片路径
 * @param ele	插入一个p标签，用于解决ios下图片换行问题
 */
function insertImages(path, elem) {
	plus.io.resolveLocalFileSystemURL(path, function(entry) {
		var url = entry.toRemoteURL().split('file:///').join('');
//		var url = entry.toLocalURL();
		compress(url, {width:640, quality: 0.9}, function(res) {
			$(elem).append("<img src="+ res +" data-preview-src='' />");	
		});
		if($(currentElem).get(0).tagName.toLowerCase() === 'li') {
			$(currentElem).parent().after(elem);
		} else {
			$(currentElem).after(elem);
		}
	});
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL;
}

/********* 根据不同的分辨率计算出图片的宽高 *********/
function setImgWH() {
	var screenW = screen.width,		// 屏幕的宽度
		screenH = screen.height,	// 屏幕的高度
		lineImg = 4;				// 每行四张图片
	// 计算每张图片的宽度
	var imgW = screenW / (lineImg+1);
	var imgM = Math.floor(imgW / lineImg);
	var styleEl = document.createElement("style");
	// 计算编辑区域的padding值
	// (屏幕宽度 - (图片宽度 * 图片个数) + (图片边距 *(图片个数 - 1))) / 2
	var editorPad = (screenW-((imgW*lineImg)+imgM*(lineImg-1))) / 2;

	// 拼接图片样式，使用了es6的``语法

	var style = ".ql-editor img{height:"+imgW+"px !important; width:"+imgW+"px;margin-right:"+imgM+"px !important;} .ql-editor img:nth-of-type(4n){margin-right: 0 !important;}.ql-editor{padding:"+editorPad+"px;}";
	styleEl.innerHTML = style;
	document.getElementsByTagName("head")[0].appendChild(styleEl);
}


/**
 * toolbar选项按钮事件
 * @param obj		toolbar按钮对象
 * @param options	对象参数
 */
function toolBarChange(obj, options) {
	var val = obj.attr("value");
	if(val == options.val1) {
		obj.attr("value", options.val2);
	} else if(val == options.val2) {
		obj.attr("value", options.val3);
	} else if(val == options.val3) {
		obj.attr("value", options.val1);
	}
}
