// run when page loads
chrome.storage.sync.get(null, function(wordsDict) {
  var parentArray = [];
  if ( wordsDict['wordsList'] !== "undefined" ) {
    parentArray = wordsDict['wordsList'];
  }
  for(var i = 0; i < parentArray.length; i++){
    var fromWord = parentArray[i][0], toWord = parentArray[i][1];
    console.log(fromWord, toWord);
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(fromWord, 'g'), toWord);
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(request.fromWord, request.toWord);
    console.log(request.type);
    if (request.type == "addWords"){
      addWord(request.fromWord, request.toWord);
    }
    else if (request.type == "clear"){
      clearStorage();
    }
    else if (request.type == "displayAll"){
      displayAll()
    }
  });

function addWord(fromWord, toWord) {
  console.log(fromWord, toWord);
  var allWords = [];
  chrome.storage.sync.get(null, function(wordsDict) {
    if (wordsDict['wordsList'] !== "undefined" ) {
      allWords = wordsDict['wordsList'];
      allWords.push([fromWord, toWord]);
    }
  });
  clearStorage();
  chrome.storage.sync.set({wordsList: allWords}, function() {
  });
}

function clearStorage() {
  chrome.storage.sync.clear();
}

// for debugging
function displayAll() {
  // run when page loads
  console.log("displayAll fired");
  chrome.storage.sync.get(null, function(wordsDict) {
    console.log(wordsDict['wordsList']);
    var parentArray = wordsDict['wordsList'];
    for(var i = 0; i < parentArray.length; i++){
      var fromWord = parentArray[i][0], toWord = parentArray[i][1];
      console.log(fromWord, toWord);
    }
  });
}

// console.log(typeof document.body.textContent);
// document.body.innerHTML = document.body.innerHTML.replace('online', '昨日');
