/**
 * 
 * @param {Object} path			图片url
 * @param {Object} options		配置信息
 * 						width		压缩后图片的宽度	默认图片宽度
 * 						height		压缩后图片的高度    默认图片高度
 * 						quality		压缩图片的质量  取值 0~1 默认0.5
 * 						pixels		图片最大像素 默认四百万(4000000)
 * @param {Object} callback		压缩完成后的回调，返回压缩后图片的base64信息
 * 						
 */
function compress(path, options, callback) {
	var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        
        // 默认按比例压缩
	    var w = that.width,
	        h = that.height,
	        pixels = options.pixels || 4000000,
			ratio;
		if((ratio = w * h / pixels)>1) {		// 大于四百万像素的时候，将图片处理为四百万以下
			ratio = Math.sqrt(ratio);
			w /= ratio;
			h /= ratio;
		} else {
			ratio = 1;
		}
	    var scale = w / h;
	        w = options.width || w;
	        h = options.height || parseInt(w / scale);
	
	    var quality = 0.5;  // 默认图片质量为0.5
	    //生成canvas
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	    // 创建属性节点
	    var anw = document.createAttribute("width");
	    anw.nodeValue = w;
	    var anh = document.createAttribute("height");
	    anh.nodeValue = h;
	    canvas.setAttributeNode(anw);
	    canvas.setAttributeNode(anh);
	    ctx.drawImage(that, 0, 0, w, h);
	    // 图像质量
	    if(options.quality && options.quality <= 1 && options.quality > 0){
	        quality = options.quality;
	    }
	    // quality值越小，所绘制出的图像越模糊
	    var base64 = canvas.toDataURL('image/jpeg', quality );
	    // 回调函数返回base64的值
	    callback(base64);
	}
}
