mui.init({
	subpages: [{
		url: "home.html",
		id: "home.html"
	}]
})
var pages = ["home.html", "resele.html", "personal.html"];

var activeTab = pages[0];		//当前激活选项卡

mui("nav.mui-bar").on("tap", "a", function() {
	var href = this.getAttribute("href");
	if(href === 'release.html') {
		mui.openWindow({
			url: 'publish.html',
			id: 'publish.html'
		})
	}
	if(activeTab === href) {
		return;
	}
	document.querySelector(".mui-iframe-wrapper iframe").setAttribute("src", href);
	document.querySelector(".mui-iframe-wrapper iframe").setAttribute("id", href);
	document.querySelector(".mui-iframe-wrapper iframe").setAttribute("name", href);
	activeTab = href;
})
