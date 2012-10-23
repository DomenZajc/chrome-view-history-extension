var history = [];
var data = {};

chrome.windows.onRemoved.addListener(function(windowId){
    chrome.storage.local.clear(function (){
        chrome.storage.local.get(null, function(items){
            chrome.storage.local.set(data, function(){})
        });
    });
});

chrome.history.search({"text": "", "maxResults" : 100}, function(historyItems){
    history = historyItems;
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.tab == "new"){
            getTab();
        }
});

function localDelOld(){
    var storage = Object.create(data);

    for(var i in data){
        for(var k = 0; k < history.length; k++){
            if(i === "i" + history[k].id){
                delete storage[i];
            }
        }
    }

    for(var i in storage){
        //delete data[i];
    }
    console.log(data);
    
}

function localSave(imgObj){
    data["i" + imgObj.historyId] = imgObj.image;
    console.log(imgObj);
    localDelOld();
}

function bindImage(imgObj){
    chrome.history.search({"text": "", "maxResults" : 100}, function(historyItems){
        history = historyItems;
        for(var i = 0; i < historyItems.length; i++){
            if(historyItems[i].url == imgObj.url){
                imgObj.historyId = historyItems[i].id;
                localSave(imgObj);
                break;
            }
        }
    });
}

function getImage(tabUrl){
    chrome.tabs.captureVisibleTab(null, {"quality" : 13, format : "jpeg"}, function(image){
        imgObj = {"url" : tabUrl, "image" : image}
        bindImage(imgObj);
    });
}

function getTab(){
    console.log("let start!");
    chrome.tabs.getSelected(null, function (tab) {
        getImage(tab.url);
    });
};