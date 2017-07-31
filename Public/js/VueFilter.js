Vue.filter("date", function(input) {
	var d = input.match(/\/Date\((\S+)\)\//)[1];
	var date = new Date(parseInt(d));
	var Y = date.getFullYear(),
		m = date.getMonth() + 1,
		d = date.getDate(),
		H = date.getHours(),
		i = date.getMinutes(),
		s = date.getSeconds();
	if (m < 10) {
		m = '0' + m;
	}
	if (d < 10) {
		d = '0' + d;
	}
	if (H < 10) {
		H = '0' + H;
	}
	if (i < 10) {
		i = '0' + i;
	}
	if (s < 10) {
		s = '0' + s;
	}
	
	return Y + '-' + m + "-" + d + ' ' + H + ":" + i
})