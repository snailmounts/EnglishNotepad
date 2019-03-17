
function getSelectText() {
  var txt = "";
  if (window.getSelection) {
      txt = window.getSelection()
  } else if (document.getSelection) {
      txt = document.getSelection()
  } else if (document.selection) {
      txt = document.selection.createRange().text;
  }
  return txt;
}

// window.onload=function(){
//   HotKeyHandler.Init(); 
// }
var HotKeyHandler={ 
  currentMainKey:null,
  currentValueKey:null,
  Init:function(){
    console.error("Init:function(){");
      HotKeyHandler.Register(0,"S",
      function(){
          var msg = {
            command:"article",
            word:getSelectText()
          };
          browser.runtime.sendMessage(msg);
          alert(getSelectText());
      }
      );
  },
  Register:function(tag,value,func){
      var MainKey="";
      switch(tag){
      case 0:
          MainKey=17;//Ctrl
      break;
      case 1:
          MainKey=16; //Shift
      break;
      case 2:
          MainKey="18"; //Alt
      break;
  }
  document.onkeyup=function(e) {
      HotKeyHandler.currentMainKey=null;
  }
  document.onkeydown=function(event){
      var keyCode= event.keyCode ;
      var keyValue = String.fromCharCode(event.keyCode);
      if(HotKeyHandler.currentMainKey!=null){
          if(keyValue==value){
              HotKeyHandler.currentMainKey=null;
              if(func!=null) {
                  func();
              }
          }
      }
      if(keyCode==MainKey)
          HotKeyHandler.currentMainKey=keyCode;
  }
  }
}

(function() {

  console.error("init");

  if (window.running) {
    return
  }
  window.running = true;

  function send_article() {
    var msg = {
      command:"article"
    };
    browser.runtime.sendMessage(msg);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "get-article") {
      send_article();
    }
  });

  HotKeyHandler.Init(); 
})();
