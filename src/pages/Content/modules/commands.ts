import { PopupAction, PopupActionType } from "../../../core/actions";
import { observeMessages, stopObservingMessages } from "./messages";

export const initCommandsListener = () => {
  chrome.runtime.onMessage.addListener(function (request: PopupAction, sender, sendResponse) {
    switch (request.action) {
      case PopupActionType.StartObservingMessages:
        observeMessages();
        break;
      case PopupActionType.StopObservingMessages:
        stopObservingMessages();
        break;
      default:
        break;
    }
  });
}