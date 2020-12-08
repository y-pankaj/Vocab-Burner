document.addEventListener('DOMContentLoaded', function () {
  var addBtn = document.getElementById('addWord');
  var clearBtn = document.getElementById('clearWords');
  var displayBtn = document.getElementById('displayWords');
  var vocabSize = 0;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "vocabSize"}
    , (response) => {
      vocabSize = response.vocabSize;
      setVocabSize(vocabSize);
    });
  });

  // event listener for adding words button
  addBtn.addEventListener('click', function() {
    var fromWord = document.getElementById('fromWord').value;
    var toWord = document.getElementById('toWord').value;
    console.log(fromWord, toWord);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "addWords", fromWord: fromWord, toWord: toWord}
      , (response) => {
        vocabSize = response.vocabSize;
        // setVocabSize(vocabSize);
        window.location = location;
      });
    });
  });

  // event listener for cleaning chrome storage
  clearBtn.addEventListener('click', function() {
    // send message to contentScipt to clear storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "clear"});
    });
    vocabSize = 0;
    setVocabSize(0);
  });

  // for debugging
  displayBtn.addEventListener('click', function() {
    // send message to contentScipt to clear storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "displayAll"});
    });
  });

});

function setVocabSize( vocabSize ) {
  document.querySelector(".vocab-size").innerText = " Vocabulary Size : " + vocabSize;
}
