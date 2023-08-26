import { PopupActions } from "../../actions";

console.log('Content script works with Typescript!');
console.log('Must reload extension for modifications to take effect.');

type PopupAction = {
  action: PopupActions,
  payload: any
}

const messagesElQuery = '[class^=styles_scrollable-div] > .MuiGrid-item';

let observeTimer: ReturnType<typeof setInterval> | null = null;

const parseMessageEl = (messageEl: HTMLDivElement) => {
  console.log({ messageEl });
}

const observeMessages = () => {
  observeTimer = setInterval(() => {
    const allMessages: NodeListOf<HTMLDivElement> = document.querySelectorAll(messagesElQuery);
    allMessages.forEach(parseMessageEl);
  }, 1500)
}

const stopObservingMessages = () => {
  if (observeTimer !== null) {
    clearInterval(observeTimer);
  }
}

chrome.runtime.onMessage.addListener(function (request: PopupAction, sender, sendResponse) {
  console.log(request);
  switch (request.action) {
    case PopupActions.StartObservingMessages:
      observeMessages();
      break;
    case PopupActions.StopObservingMessages:
      stopObservingMessages();
      break;
    default:
      break;
  }
});
