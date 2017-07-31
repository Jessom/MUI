if (isLogin == 1) {

  var conditions = [
    {
      columnName: "accountId",
      conditionKind: 1,
      columnValue: localStorage.getItem("uid")
    }
  ]
  var data = {
    "verifyInfo": JSON.parse(localStorage.getItem("verifyInfo")),
    "conditions": conditions,
    "viewName": "ProfileTable",
    "tableName": "ProfileTable",
    "frameName": "EcrpBase"
  }

  mui.ajax({
    url: config.PC_URL + "ByConditions",
    type: "post",
    data: data,
    async: true,
    dataType: "json",
    success: function(data) {

      if (data.result > 0) {
        data.value.values.forEach(function(el) {
          if (el.Key == 'x_nick') {
            localStorage.setItem("userNick", el.Value);
          }
          if (el.Key == 'x_image') {

            if (el.Value == null || el.Value == "") {
              el.Value = "default/images/userImg.png";
            }
            localStorage.setItem("userTX", el.Value);
          }

        })
        vm.image = localStorage.getItem("userTX");
        vm.nick = localStorage.getItem("userNick");
        vm.uid = localStorage.getItem("uid");
        vm.href = "userinfo.html";

      } else {
        mui.toast(data.attach);
      }
      vm.loading = false;
    },
    error: function(xhr) {}
  })
}