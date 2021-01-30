
/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "result"}, function(response) {
      console.log(response.farewell);
      //notify popup.js
    });
  });


  chrome.runtime.onMessage.addListener(
    function(request, sender, generateSummary) {

      if (request.message == "generate")
        generateSummary();//{farewell: "goodbye"});
        //extract the URL of the current tab and
        //make a GET HTTP request using XMLHTTPRequest Web API to the backend to receive summarized text as a response.
    }
  );

function generateSummary(){
  console.log("Inside contentScript.js");
}
*/
//var txt;
/*
function sendx(){
  chrome.runtime.sendMessage({action: "summaryt",summary:"text"},function(response){
    console.log("blahblah");
  });
}
*/


function reqListener () {
  // console.log(this.responseText);
   localStorage.setItem("text", this.responseText);

}

//console.log("contentScript running...");
function replaceText(){

      //  console.log('REPLACED GENERATED SUMMARY');
      //  console.log(window.location.href);
        var current_url=window.location.href;
        var url="http://127.0.0.1:5000/api/summarize?youtube_url="+current_url;
       var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);

      oReq.open("GET", url);
       oReq.send();
    //   console.log("ABV");
    //   console.log(typeof oReq);

  }



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === 'GENERATE'){
      //console.log(request);
        replaceText();
        //console.log(localStorage.getItem("text"));
          var text1=localStorage.getItem("text");
          console.log(text1);
            chrome.runtime.sendMessage({"msg": "RESULT","data":text1},function(response){
              //console.log("blahblah");
            });

    }

});
