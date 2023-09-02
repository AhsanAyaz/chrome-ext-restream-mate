import { ExtensionState } from "./state";
import { getCurrentTab } from "./utils";

export enum PopupActionType {
  StartObservingMessages,
  StopObservingMessages
};

export interface PopupAction {
  action: PopupActionType,
  payload: any
}

export const startObservingMessages = async () => {
  const tab = await getCurrentTab();
  syncStateToStorage({
    isObservingMessages: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id!, {
    action: PopupActionType.StartObservingMessages,
  });
  console.log(response);
};

export const stopObservingMessages = async () => {
  const tab = await getCurrentTab();
  syncStateToStorage({
    isObservingMessages: false,
  });
  const response = await chrome.tabs.sendMessage(tab.id!, {
    action: PopupActionType.StopObservingMessages,
  });
  console.log(response);
};

const syncStateToStorage = (state: ExtensionState) => {
  chrome.storage.session
    .set({
      popupState: {
        ...state,
      },
    })
    .then(() => {
      console.log('Extension state is saved');
    });
};
