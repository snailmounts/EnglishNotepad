

// function listenForClicks() {
//   document.addEventListener("click", (e) => {
//     function auto_bet(tabs) {
//       browser.tabs.sendMessage(tabs[0].id, {
//         command: "auto-bet",

//         select_type:parseInt(document.getElementById("select-type").value),
//         ball_id:parseInt(document.getElementById("ball-id").value),
//         max_bet_count:parseInt(document.getElementById("max-bet-count").value),

//         bets:[
//           parseInt(document.getElementById("bet-1").value),
//           parseInt(document.getElementById("bet-2").value),
//           parseInt(document.getElementById("bet-3").value),
//           parseInt(document.getElementById("bet-4").value),
//           parseInt(document.getElementById("bet-5").value),
//           parseInt(document.getElementById("bet-6").value),
//           parseInt(document.getElementById("bet-7").value)
//         ],

//         multiple_count:parseInt(document.getElementById("multiple-count").value),
//         stop_loss_limit:parseInt(document.getElementById("stop-loss-limit").value),
//         stop_loss_limit_total:parseInt(document.getElementById("stop-loss-limit-total").value),

//         bet_type:[
//           parseInt(document.getElementById("bet-type-1").value),
//           parseInt(document.getElementById("bet-type-2").value),
//           parseInt(document.getElementById("bet-type-3").value),
//           parseInt(document.getElementById("bet-type-4").value)
//         ],
//         reset_type:parseInt(document.getElementById("reset-type").value)
//       });
//     }

//     function stop_auto_bet(tabs) {
//       browser.tabs.sendMessage(tabs[0].id, {
//         command: "stop-auto-bet"
//       });
//     }

//     function output_info(tabs) {
//       browser.tabs.sendMessage(tabs[0].id, {
//         command: "output-info"
//       });
//     }

//     function reportError(error) {
//     }

//     if (e.target.classList.contains("auto-bet")) {
//       browser.tabs.query({active: true, currentWindow: true})
//         .then(auto_bet)
//         .catch(reportError);
//     } else if (e.target.classList.contains("stop-auto-bet")) {
//       browser.tabs.query({active: true, currentWindow: true})
//       .then(stop_auto_bet)
//       .catch(reportError);
//     } else if (e.target.classList.contains("output-info")) {
//       browser.tabs.query({active: true, currentWindow: true})
//       .then(output_info)
//       .catch(reportError);
//     }
//   });
// }

// function reportExecuteScriptError(error) {
//   console.error(`Failed to execute content script: ${error.message}`);
// }

browser.tabs.executeScript({file: "/content_scripts/notepad_inject.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

browser.runtime.onMessage.addListener(notify);
function notify(message) {
  if (message.command == "article") {
    console.error(message.article);
  } else if (message.command == "get-word") {
    //todo
    console.error(message.world);
  }
}

function get_article(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "get-article"
  });
}
browser.tabs.query({active: true, currentWindow: true})
.then(get_article);

