var history =  chrome.extension.getBackgroundPage().history;
var images =  chrome.extension.getBackgroundPage().data;
console.log(images);
//http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts
var imag = images;

function addImageDom(img){
	if(imag[img]){
		var image = new Image();
		image.src = imag[img];
		console.log(img);
		console.log(image.src);
		$('#image').html(image);
	}
}


addImageDom("i" + history[0].id);

for(var item = 0; item < history.length; item++){
	var id = history[item].id;
	console.log(images);
	if(images["i" + id]){
		console.log(images["i" + id])
		var active = "";
		if(item == 0){
			active = " active";
		}
		var link = '<li id="' + history[item].id + '" class="item' + active + '"><a href="' + history[item].url + '">' + history[item].title + '</a></li>';
		$('#links').append(link);
	}
}

function next() {
    var active = $('#links .item.active');
    var next = active.prev(); 
    if(!($(next).attr("id"))){
    	next = $('#links .item:last-child');
    }
    var nextImg = $(next).attr("id"); 
    
    next.addClass('active');
    
    active.removeClass('active');
    addImageDom("i" + 	nextImg);
}

function eback() {
    var active = $('#links .item.active');
    var next = active.next();
    if(!($(next).attr("id"))){
    	next = $('#links .item:first-child');
    	console.log(next);
    }
    var nextImg = $(next).attr("id"); 
    
    next.addClass('active');
    
    active.removeClass('active');
    addImageDom("i" + 	nextImg);
}

$("#next").on("click", function(event){
	next();
});
$("#back").on("click", function(event){
	eback();
})
$('a').live('click', function(e) {
  var href = e.currentTarget.href;
  chrome.tabs.getSelected(null,function(tab) {
  	console.log(tab);
    chrome.tabs.update(tab.id, {url: href});
  });
});