import { Message } from "../../core/message";
import { PopupActions } from "../../core/actions";

console.log('Content script works with Typescript!');
console.log('Must reload extension for modifications to take effect.');

const OBSERVE_INTERVAL_IN_MS = 3000;

type PopupAction = {
  action: PopupActions,
  payload: any
}

let restreamMessages: Message[] = [];

const messagesElQuery = '[class^=styles_scrollable-div] > .MuiGrid-item:not([data-uuid])';

let observeTimer: ReturnType<typeof setInterval> | null = null;

const observeMessages = () => {
  observeTimer = setInterval(() => {
    const allMessagesElements: NodeListOf<HTMLDivElement> = document.querySelectorAll(messagesElQuery);
    allMessagesElements.forEach((el) => {
      const message = new Message(el);
      restreamMessages.push(message);
    });
  }, OBSERVE_INTERVAL_IN_MS)
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
