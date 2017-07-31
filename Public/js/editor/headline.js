(function(w, m, $, undefined) {
	var headLine = function(targetDOM, options) {
		var o = {
			maxLength: 3,
			x: 16,
			y: 9,
			w: 800,
			h: 450,
			el: "#img"
		};
		$options = $.extend({}, o, options);
		
		this.succ = null;			// pc完成按钮
		this.cancel = null;			// pc取消按钮
		this.cf = null;				// 没有头图显示内容
		this.container = null;		// 有头图显示
		this.add = null;			// 添加按钮
		
		this.targetDOM = $(targetDOM);
		this.imgSrcArr = new Array();		// 头图数组
		
		this.init();
	}
	
	headLine.prototype = {
		init: function() {
			this.creatDom();
		},
		creatDom: function() {
			var _this = this;
			this.setHeight();
			
			this.container = document.createElement("div");
			$(this.container).addClass("cover-uploader");
			
			$(this.container).append(this.createCf());
			$(this.container).append(this.imageContainer());
			
			this.targetDOM.append(this.container);
			if(mui.os.plus) {
				_this.backLinstener();
			}
		},
		// 没有图片的情况
		createCf: function() {
			var _this = this,
				f = _this.cf;
			f = document.createElement("div");
			$(f).addClass("cover-file clearfix");
			f.innerHTML = '<span class="icon-camera"></span>';
			
			$(f).on("tap", function() {
				if(mui.os.plus) {
					_this.addImgOS();
				} else {
					_this.addImgPc();					
				}
			});
			
			return f;
		},
		// 有图片的情况
		imageContainer: function() {
			var _this = this,
				c = _this.container;
			c = document.createElement("div");
			$(c).addClass("cover-image-container clearfix");
			c.innerHTML = '<div class="image-view"></div>';
			
			$(c).append(_this.addBtn());
			
			return c;
		},
		preview: function(url) {
			var _this = this,
				preview = document.querySelector(".headline-preview");
			if(preview === null) {
				preview = document.createElement("div");
				preview.className = "headline-preview";
				preview.innerHTML = "<img src='"+url+"' /><div class='preview-dele'><i class='mui-icon mui-icon-trash'></i></div>";
			} else {
				
			}
			
			$(preview).parent("div").siblings().hide();
			
			$(".preview-dele").on("tap", function(e) {
				e.stopPropagation();
			});
			$(preview).on("tap", function() {
				preview.style.display = "none";
				$(preview).parent("div").siblings("div").show();
				$($options.el).parent().hide();
			});
			
			return preview;
		},
		// 添加图片按钮
		addBtn: function() {
			var _this = this,
				a = _this.add;
			a = document.createElement("div");
			$(a).addClass("cover-addImg");
			
			$(a).on("tap", function() {
				if(mui.os.plus) {
					_this.addImgOS();
				} else {
					_this.addImgPc();					
				}
			})
			
			return a;
		},
		// 底部的完成取消工具栏
		createToolBar: function() {
			var _this = this,
				t = document.querySelector(".success-container"),
				oDiv = null;
			if(t === null) {
				oDiv = document.createElement("div");
				oDiv.innerHTML = "<div class='success-container'><a class='mui-btn mui-btn-link mui-pull-left headline-cancel'>取消</a><a class='mui-btn mui-btn-link mui-pull-right headline-success'>完成</a></div>"
				$($options.el).parent().append(oDiv);
				
				_this.pcSuccessBtnListener();
				_this.pcCancelBtnLinstener();
			}
		},
		// PC完成按钮事件
		pcSuccessBtnListener: function() {
			var _this = this,
				cf = document.querySelector(".cover-file"),
				co = document.querySelector(".cover-image-container"),
				add = document.querySelector(".cover-addImg"),
				arr = _this.imgSrcArr,
				c = null,
				flag = true;
				
			if(flag) {
				$(".headline-success").on("tap", function() {
					document.activeElement.blur();
					c = $($options.el).cropper("getCroppedCanvas", {width:$options.w,height:$options.h});
				
					var base = c.toDataURL("image/jpeg");
					arr.push(base);
				
					if(arr.length > 0) {
						$(cf).css({"display":"none"});
						$(co).css({"display":"block"});
						_this.insertImg(base);
					} else {
						$(cf).css({"display":"block"});
						$(co).css({"display":"none"});
					}
				
					if(arr.length == $options.maxLength) {
						$(add).css({"display":"none"});
					}
					
					//if(mui.os.plus) {
						$(this).hide();
					//}
					
					$(".preview").show();
					console.log("添加头图后： "+arr.length);
					$($options.el).parent("div").hide().siblings("div").show().siblings(".mui-preview-image").hide();
					
					$($options.el).cropper("destroy");		// 销毁cropper
					flag = false;
				})
			}
		},
		// PC取消按钮事件
		pcCancelBtnLinstener: function() {
			var _this = this;
			document.querySelector(".headline-cancel").addEventListener("tap", function() {
				$(this).parent("div").parent("div").parent("div").hide().siblings("div").show();
				
				$($options.el).cropper("destroy");		// 销毁cropper
			});
		},
		// 移动端完成按钮
		osSuccessBtnLinstener: function() {
			var _this = this,
				s = document.querySelector(".headline-success");
			if(s === null) {
				s = document.createElement("a");
				s.innerHTML = "完成";
				$(s).addClass("mui-btn mui-btn-link mui-pull-right headline-success");
				
				$(".preview").hide();
				
				$("header.mui-bar").append(s);
				
				_this.pcSuccessBtnListener();
			}
		},
		// 插入头图
		insertImg: function(path) {
			var _this = this,
				view = document.querySelector(".image-view");
			
			var item = document.createElement("div");
			$(item).addClass("image-item");
			$(item).append(_this.removeImg(path));
			$(item).css({"background-image":"url("+path+")"});
			
			/*$(item).on("tap", function() {
				var p = document.querySelector(".headline-preview");
				if(p === null) {
					_this.targetDOM.append(_this.preview(path));					
				} else {
					$(_this.preview(path)).show();
					$(_this.preview(path)).parent("div").siblings().hide();
				}
			})*/
			
			view.appendChild(item);
		},
		// PC端添加图片
		addImgPc: function() {
			var _this = this,
				fileInput = document.querySelector(".headline-file-input"),
				windowURL = window.URL || window.webkitURL,
				dataURL = null;
				
			if(fileInput === null) {
				fileInput = document.createElement("input");
				$(fileInput).attr("type", "file");
				$(fileInput).attr("accept", "image/png, image/gif, image/jpeg, image/jpg, image/bmp, image/x-icon");
				$(fileInput).attr("style", "display:none");
				$(fileInput).addClass("headline-file-input");
				
				$(fileInput).on("change", function(e) {
					if (fileInput.files != null && fileInput.files[0] != null) {
						
		            	dataURL = windowURL.createObjectURL(fileInput.files[0]);
		            	$($options.el).attr("src", dataURL);
		            	$($options.el).parent("div").show().siblings("div").hide();
		            	
						_this.handleImg();
						
						$(".preview").hide();
						$(".headline-success").show();
						_this.osSuccessBtnLinstener();
						//_this.createToolBar();
	            	}
				})
			}
			
			fileInput.click();
		},
		// 移动端添加图片
		addImgOS: function() {
			var _this = this;
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
						_this.getImage();
						break;
					case 2:
						_this.galleryImg();
						break;
					default:
						break
				}
			})
		},
		// 拍照
		getImage: function() {
			var _this = this,
				c = plus.camera.getCamera();
			c.captureImage(function(path) {
				_this.changeToLocalUrl(path);
			}, function(err) {
				console.log("读取拍照文件错误：" + err.message);
			});
		},
		// 相册选择
		galleryImg: function() {
			var _this = this;
			plus.gallery.pick(function(path) {
				_this.changeToLocalUrl(path);
			}, function(err) {
				console.log("读取本地图片错误：" + err.message)
			})
		},
		changeToLocalUrl: function(path) {
			var _this = this;
			plus.io.resolveLocalFileSystemURL(path, function(entry) {
				$($options.el).attr("src", entry.toLocalURL());
				console.log($($options.el).attr("src"));
				$($options.el).parent("div").show().siblings("div").hide();
				_this.osSuccessBtnLinstener();
				$(".headline-success").show();
				$(".preview").hide();
				
				_this.handleImg();		// 初始化裁切图片插件
				
           });
		},
		removeImg: function(url) {
			var _this = this,
				oSpan = document.createElement("sapn"),
				cf = document.querySelector(".cover-file"),
				co = document.querySelector(".cover-image-container"),
				add = document.querySelector(".cover-addImg"),
				arr = _this.imgSrcArr;
			oSpan.className = "delete-btn";
			oSpan.setAttribute("data-del", url);
			
			$(oSpan).on("tap", function() {
				var src = this.getAttribute("data-del"),
					ele = this.parentNode;
				// arr.remove(src);
				_this.arrRemove(arr, src);
				this.parentNode.parentNode.removeChild(ele);
				
				if(arr.length <= 0) {
					$(cf).css({"display": "block"});
					$(co).css({"display":"none"});
				} else if(arr.length < $options.maxLength) {
					$(add).css({"display":"block"});
				}
				
				console.log("删除后头图： "+arr.length);				
			});
			
			return oSpan;
		},
		
		// 计算并设置头图的高度
		setHeight: function() {
			var screenW = screen.width,
				screenH = screen.height - 104,
				eleH = Math.floor(screenW / 6),
				oStyle = document.createElement("style");

			oStyle.innerHTML = ".img-container, .cropper-container,.cropper-drag-box{height: "+screenH+"px} .cover-file{height:"+eleH+"px;line-height:"+eleH+"px;} .image-item{height:"+eleH+"px} .cover-addImg{height:"+eleH+"px}";
			$("head").append(oStyle);
		},
		// 初始化裁切图片工具
		handleImg: function() {
			var _this = this;
		    var $image = $($options.el),
		        options = {
		        	aspectRatio: $options.x / $options.y,
	    			dragCrop: false
		        };
		    $image.on({}).cropper(options);
		},
		// app端重写放回按钮事件
		backLinstener: function() {
			var old = mui.back,
				el = document.querySelector($options.el),
				s = document.querySelector(".headline-success");
			mui.back = function() {
				if(el.parentNode.style.display == "block") {
					$(".headline-success").hide();
					$(".preview").show();
					$($options.el).cropper("destroy");
					$($options.el).parent().hide().siblings("div").show();
				} else {
					old();					
				}
			}
		},
		// 获取头图内容
		getContents: function() {
			return this.imgSrcArr;
		},
		setContents: function(arr) {
			var _this = this,
				view = document.querySelector(".image-view"),
				cf = document.querySelector(".cover-file"),
				co = document.querySelector(".cover-image-container"),
				add = document.querySelector(".cover-addImg");	
			
			if(arr.length > 0) {
				_this.imgSrcArr = arr;
				cf.style.display = "none";
				co.style.display = "block";
				
				if(arr.length >= $options.maxLength) {
					add.style.display = "none";
				}
				
				for(var i in arr) {
					var item = document.createElement("div");
					item.className = "image-item";
					item.appendChild(_this.removeImg(arr[i]));
					$(item).attr("style", "background-image: url("+arr[i]+")");
					view.appendChild(item);					
				}		
			}
		},
		// 数组操作，查询数组元素
		arrIndex: function(arr,val) {
			for (var i = 0; i < arr.length; i++) {
		        if (arr[i] == val) return i;
		    }
		    return -1;
		},
		// 从数组中删除特定元素
		arrRemove: function(arr, val) {
			var index = arr.indexOf(val);
		    if (index > -1) {
		        arr.splice(index, 1);
		    }
		}
	}
	
	window.headLine = headLine
})(window, mui, jQuery)
