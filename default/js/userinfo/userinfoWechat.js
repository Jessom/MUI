if(isLogin == 1) {
	var conditions = [{
		columnName: "accountId",
		conditionKind: 1,
		columnValue: localStorage.getItem("uid")
	}]
	var ProfileTable_data = {
		"verifyInfo": JSON.parse(localStorage.getItem("verifyInfo")),
		"conditions": conditions,
		"viewName": "ProfileTable",
		"tableName": "ProfileTable",
		"frameName": "EcrpBase",

	}

	mui.ajax({
		url: config.PC_URL + "ByConditions",
		type: "post",
		data: ProfileTable_data,
		async: true,
		dataType: "json",
		success: function(data) {

			if(data.result > 0) {
				data.value.values.forEach(function(el) {
					if(el.Key == 'x_sign') {
						vm.sign = el.Value;
					}
					if(el.Key == 'x_sex') {
						if(el.Value == 0) {
							vm.sex = "女";
						} else {
							vm.sex = "男";
						}

					}
					if(el.Key == 'x_phone') {

						vm.phone = el.Value;
					}

				})
				vm.image = localStorage.getItem("userTX");
				vm.nick = localStorage.getItem("userNick");
				vm.uid = localStorage.getItem("uid");

			} else {
				mui.toast(data.attach);
			}
			vm.loading = false;
		},
		error: function(xhr) {

		},

	})

	vm.upimage = function() {

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
				dataURL = windowURL.createObjectURL(fileInput.files[0]);

				$(".cropper-img").attr("src", dataURL);
				vm.isCropper = false;
				initCropper();

			})
		}
		fileInput.click();
	}
	vm.cancelUp = function() {

		vm.isCropper = true;
		$(".cropper-img").cropper("destroy");
	}
	vm.goUpimage = function() {
		//		var loading = layer.open({
		//			type: 2,
		//			shadeClose: false
		//		});
		var c = $(".cropper-img").cropper("getCroppedCanvas", {
			width: 50,
			height: 50
		});
		var base = c.toDataURL("image/jpeg");
		var uploadImgdata = {
			"img": base,
			"folder": "userImg/" + localStorage.getItem("uid"),

		}

		mui.ajax({
			url: config.PC_URL + "uploadImg",
			type: "post",
			data: uploadImgdata,
			async: true,
			dataType: "json",
			success: function(data) {

				if(data.result > 0) {
					var mytx = config.IMG_URL + data.value;

					mui.ajax({
						url: config.PC_URL + "ByConditions",
						type: "post",
						data: ProfileTable_data,
						async: true,
						dataType: "json",
						success: function(data) {

							if(data.result > 0) {

								var updata = {
									"id": data.value.id,
									"uid": data.value.uid,
									"cid": data.value.cid,
									"lastTime": data.value.lastTime,
									"values": {
										"image": mytx
									},
									"viewName": "ProfileTable",
									"tableName": "ProfileTable",
									"frameName": "EcrpBase"
								}

								mui.ajax({
									url: config.PC_URL + "ExecuteDataUpdate",
									type: "post",
									data: updata,
									async: true,
									dataType: "json",
									success: function(data) {
										console.log(data);
										if(data.result > 0) {

										} else {
											mui.toast(data.attach);
											setTimeout(function() {
												vm.isCropper = true;

											}, 1000);
										}

									},
									error: function(xhr) {
										mui.toast(data.attach);
										setTimeout(function() {
											vm.isCropper = true;

										}, 1000);
									},

								})

							} else {
								mui.toast(data.attach);
								setTimeout(function() {
									vm.isCropper = true;

								}, 1000);
							}

						},
						error: function(xhr) {
							mui.toast(data.attach);
							setTimeout(function() {
								vm.isCropper = true;

							}, 1000);
						},

					})

				} else {
					mui.toast(data.attach);
					setTimeout(function() {
						vm.isCropper = true;

					}, 1000);
				}
				vm.loading = false;
			},
			error: function(xhr) {
				setTimeout(function() {
					vm.isCropper = true;

				}, 1000);
			},

		})

		//		layer.close(loading);
		$(".cropper-img").cropper("destroy");
	}

}