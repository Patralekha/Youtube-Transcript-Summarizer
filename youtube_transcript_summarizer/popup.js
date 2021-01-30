/*
document.getElementById("summarize").addEventListener("click", function() {
    //document.getElementById("demo").innerHTML = "Hello World";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {message: "generate"}, function(response) {
      console.log(response.farewell);
      //notify contentScript.js
    });
  });
  });



  chrome.runtime.onMessage.addListener(
    function(request, sender, outputSummary) {

      if (request.message == "result")
        outputSummary();//{farewell: "goodbye"});
      //  In callback function, display the summary in the div element programmatically using Javascript.
    }
  );

*/


const replacelyForm = document.getElementById("replacely-form");
const generatedSummary=document.getElementById('summarytext');

replacelyForm.onsubmit =function (e){
    e.preventDefault();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "GENERATE"},function(response) {console.log('response')});

			//	window.close();
    });
};


chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
         if (request.msg === "RESULT"){
                      //   console.log("Msg received");
                      //  console.log(request.data);
            document.getElementById('summarytext').innerHTML+=request.data;
                         //sendResponse({status: true});
        }
                    //  return true;
    }
);
