function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync("https://til-newtab.appspot.com/get_random_img", function(resp) {
	document.getElementById("bg").src = JSON.parse(resp).url;
});

httpGetAsync("https://til-newtab.appspot.com/get_random_til", function(resp) {
	document.getElementById("link").innerHTML = JSON.parse(resp).title;
	document.getElementById("link").href = JSON.parse(resp).url;
	document.getElementById("comments").href = JSON.parse(resp).permalink;
	document.getElementById("container").style.display = "flex";
});
