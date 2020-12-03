// run when page loads
chrome.storage.sync.get(null, function(wordsDict) {
  console.log(wordsDict['wordsList']);
  var parentArray = wordsDict['wordsList'];
  for(var i = 0; i < parentArray.length; i++){
    var fromWord = parentArray[i][0], toWord = parentArray[i][1];
    console.log(fromWord, toWord);
    // var ful = document.body.innerHTML;
    console.log(document.title);
    document.body.innerHTML = document.body.innerHTML.replace(fromWord, toWord);
    console.log("done");
    // console.log(ful == document.body.innerHTML);
  }
  // for(item in wordsDict['wordsList']){
  //   // fromWord = item[0]
  //   // toWord = item[1]
  //   // console.log(fromWord, toWord);
  //   console.log(JSON.stringify(item[0][0]));
  //   // document.body.innerHTML = document.body.innerHTML.replace(fromWord, toWord);
  // }
  // console.log(typeof result.key);
  // console.log(object)
  // console.log(result);
  // document.body.innerHTML = document.body.innerHTML.replace('extension', '昨');
  // document.body.innerHTML = "This is it."
  // console.log(document.body.innerHTML);
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
  // var tempDict = {fromWord: toWord}
  chrome.storage.sync.set({wordsList: [['hemmer', '昨日'], ['card', '日'], ['extensions', '昨'], ['now', '日']]}, function() {
    // console.log('Value is set to ' + value);
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
