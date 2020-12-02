// console.log(typeof document.body.textContent);
// document.body.innerHTML = document.body.innerHTML.replace('hello', '昨日');

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//       console.log('Received the object');
// });


chrome.storage.sync.set({'KEY':'VAL'}, function() {
  // console.log('Value is set to ' + value);
});

chrome.storage.sync.clear();

chrome.storage.sync.get(null, function(result) {
  // console.log('Value currently is ' + result['key']);
  for(item in result){
    console.log(item, result[item]);
  }
  // console.log(typeof result.key);
  // console.log(object)
  // console.log(result);
});




