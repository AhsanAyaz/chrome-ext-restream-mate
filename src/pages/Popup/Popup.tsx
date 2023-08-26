import React from 'react';
import './Popup.css';
import { PopupActions } from '../../actions';

const Popup = () => {
  const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log({
      activeTab: tab,
    });
    return tab;
  };
  const startObservingMessages = async () => {
    const tab = await getCurrentTab();
    const response = await chrome.tabs.sendMessage(tab.id!, {
      action: PopupActions.StartObservingMessages,
    });
    console.log(response);
  };

  const stopObservingMessages = async () => {
    const tab = await getCurrentTab();
    const response = await chrome.tabs.sendMessage(tab.id!, {
      action: PopupActions.StopObservingMessages,
    });
    console.log(response);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={startObservingMessages}>
          Start Observing Messages
        </button>
        <button onClick={stopObservingMessages}>Stop Observing Messages</button>
      </header>
    </div>
  );
};

export default Popup;
