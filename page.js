console.log("avtoa");
chrome.extension.sendMessage({tab: "new"}, function(response) {});

console.log(window.history);
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
    console.log("vono");

};

