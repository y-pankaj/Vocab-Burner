// run when page loads, substute the words
chrome.storage.sync.get(null, (wordsDict) => {
  var parentArray = wordsDict['wordsList'];
  if ( parentArray === undefined ) {
    parentArray = []
  }
  for(var i = 0; i < parentArray.length; i++){
    var fromWord = parentArray[i][0], toWord = parentArray[i][1];
    console.log(fromWord, toWord);
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(fromWord, 'gi'), toWord);
  }
});

// listen for messages from the popup
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
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

async function addWord(fromWord, toWord) {
  // fetch allWords using chrome storage api
  var allWords = await getStorageValue("wordsList");
  allWords = allWords["wordsList"];
  // clear all words
  await clearStorage();
  // set new list of words (made using previous words and current input from popus)
  await setStorageValue(allWords, fromWord, toWord);
}

async function getStorageValue(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, (value) => {
        resolve(value);
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

async function setStorageValue(allWords, fromWord, toWord) {
  new Promise((resolve, reject) => {
    if ( allWords === undefined ) {
      allWords = []
    }
    allWords = [...allWords, [fromWord, toWord]]
    chrome.storage.sync.set({wordsList: allWords});
  });
}

async function clearStorage() {
  new Promise((resolve, reject) => {
    chrome.storage.sync.clear();
  });
}

// for debugging
async function displayAll() {
  // run when page loads
  var allWords = await getStorageValue("wordsList");
  var parentArray = allWords["wordsList"];
  if ( parentArray === undefined ) {
    parentArray = [];
  }
  for(var i = 0; i < parentArray.length; i++){
    var fromWord = parentArray[i][0], toWord = parentArray[i][1];
    console.log(fromWord, toWord);
  }
}

// TODO: display all currently logs in console, print it in new page or in the popup.
