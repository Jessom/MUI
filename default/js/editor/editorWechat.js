vm.addImg = function() {
	var fileInput = document.querySelector(".headline-file-input"),
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
            	oImg.attr("src", dataURL);
            	initCropper();
            	vm.isCropper = true;
        	}
		})
	}
	fileInput.click();
}
