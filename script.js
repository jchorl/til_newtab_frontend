var BASE_URL = "https://til-newtab.appspot.com";

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync(BASE_URL + "/get_random_img", function(resp) {
	document.getElementById("bg").src = JSON.parse(resp).url;

	httpGetAsync(BASE_URL + "/get_all_img", function(resp) {
		parsed = JSON.parse(resp);
		var tempImg = [];
		for (var i = 0; i < parsed.length; ++i) {
			tempImg[i] = new Image();
			tempImg[i].src = parsed[i].url;
		}
	});
});

httpGetAsync(BASE_URL + "/get_random_til", function(resp) {
	parsed = JSON.parse(resp);
	document.getElementById("link").innerHTML = parsed.title;
	document.getElementById("link").href = parsed.url;
	document.getElementById("comments").href = parsed.permalink;
	document.getElementById("container").style.display = "flex";
});
