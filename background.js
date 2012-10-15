var history = [];
var data = {};

chrome.storage.local.get(null, function(items){
    data = items;
});
chrome.history.search({"text": "", "maxResults" : 20}, function(historyItems){
    history = historyItems;
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.tab == "new"){
            getTab();
        }
});

function localDelOld(){
    chrome.storage.local.get(null, function(items){data = items;});

    chrome.storage.local.get(null, function(items){
        var storage = items;

        for(var i in storage){
            for(var k = 0; k < history.length; k++){
                if(i === history[k].id){
                    delete items[i];
                }
            }
        }
        var itemsKeys = [];

        for(var i in items){
            itemsKeys.push(i);
        }

        if(itemsKeys){
            console.log("itemsKeys");
            chrome.storage.local.remove(itemsKeys, null);
        }
    });
}

function localSave(imgObj){
    var newObject = {};
    newObject[imgObj.historyId] = imgObj.image;
    chrome.storage.local.set(newObject);

    localDelOld();
}

function bindImage(imgObj){
    chrome.history.search({"text": "", "maxResults" : 20}, function(historyItems){
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