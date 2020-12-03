document.addEventListener('DOMContentLoaded', function () {
  var addBtn = document.getElementById('addWord');
  var clearBtn = document.getElementById('clearWords');
  var displayBtn = document.getElementById('displayWords');

  // event listener for adding words button
  addBtn.addEventListener('click', function() {
    var fromWord = document.getElementById('fromWord').value;
    var toWord = document.getElementById('toWord').value;
    console.log(fromWord, toWord);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "addWords", fromWord: fromWord, toWord: toWord});
    });
  });

  // event listener for cleaning chrome storage
  clearBtn.addEventListener('click', function() {
    // send message to contentScipt to clear storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "clear"});
    });
  });

  // for debugging
  displayBtn.addEventListener('click', function() {
    // send message to contentScipt to clear storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "displayAll"});
    });
  });

});

