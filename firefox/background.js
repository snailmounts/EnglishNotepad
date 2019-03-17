browser.contextMenus.create({
  id: "auto-bet",
  title: "自动下单"
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "auto-bet") {
    browser.tabs.executeScript({
      file: "auto_bet.js"
    });
  }
});

