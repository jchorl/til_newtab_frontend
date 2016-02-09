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

httpGetAsync(BASE_URL + "/get_all_img", function(resp) {
	// parse the response
	var parsed = JSON.parse(resp);
	var imageIndex = Math.floor(Math.random() * parsed.length);
	var localImgs = localStorage.getItem("til_new_tab_imgs");
	// if the response has been updated
	if (resp != localImgs) {
		// if there is anything in local storage
		if (localImgs != null) {
			// parse the local imgs
			var parsedLocal = JSON.parse(localImgs);
			// throw the urls into a dict
			var urls = {};
			for (var i = 0; i < parsedLocal.length; ++i) {
				urls[parsedLocal[i].url] = 1;
			}

			// check to see if any of the new imgs are in the old
			for (var i = 0; i < parsed.length; ++i) {
				if (parsed[i].url in urls) {
					imageIndex = i;
					break;
				}
			}
		}
	} else if (localStorage.getItem("til_last_used_index") != null) {
		imageIndex = (JSON.parse(localStorage.getItem("til_last_used_index")) + 1) % parsed.length;
	}

	// set the url
	document.getElementById("bg").src = parsed[imageIndex].url;

	// save
	localStorage.setItem("til_new_tab_imgs", resp);
	localStorage.setItem("til_last_used_index", imageIndex);

	// cache the other ones
	var tempImg = [];
	for (var i = 0; i < parsed.length; ++i) {
		tempImg[i] = new Image();
		tempImg[i].src = parsed[i].url;
	}
});

httpGetAsync(BASE_URL + "/get_random_til", function(resp) {
	parsed = JSON.parse(resp);
	document.getElementById("link").innerHTML = parsed.title;
	document.getElementById("link").href = parsed.url;
	document.getElementById("comments").href = parsed.permalink;
	document.getElementById("container").style.display = "flex";
});
