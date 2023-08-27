import React from 'react';
import './Popup.css';
import { PopupActions } from '../../core/actions';

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
    <main className="App">
      <section className="main-section">
        <div className="flex flex-col items-center gap-4">
          <button className="action-button" onClick={startObservingMessages}>
            Start Observing Messages
          </button>
          <button className="action-button" onClick={stopObservingMessages}>
            Stop Observing Messages
          </button>
        </div>
      </section>
    </main>
  );
};

export default Popup;
