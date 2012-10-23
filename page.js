console.log("ska1");
chrome.extension.sendMessage({tab: "new"}, function(response) {});
$(window).load(function () {
  chrome.extension.sendMessage({tab: "new"}, function(response) {});
  console.log("ska2");
});

(function(history){
    history.pushState = function(state) {
        console.log("motorji");
        if (typeof history.onpushstate == "function") {
            console.log("motorji");
            history.onpushstate({state: state});
        }
    }
})(window.history);
window.history.pushState = function(state){
    console.log("ska");
};


window.onpopstate = history.onpushstate = function(e) {
    chrome.extension.sendMessage({tab: "new"}, function(response) {});
    console.log("ska3");
};

