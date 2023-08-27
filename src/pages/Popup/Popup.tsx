import React, { useEffect, useState } from 'react';
import './Popup.css';
import { PopupActions } from '../../core/actions';

type PopupState = {
  isObserving: boolean;
};

const Popup = () => {
  const [isObserving, setIsObserving] = useState(false);
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
    setIsObserving(true);
    syncStateToStorage({
      isObserving: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id!, {
      action: PopupActions.StartObservingMessages,
    });
    console.log(response);
  };

  const stopObservingMessages = async () => {
    const tab = await getCurrentTab();
    setIsObserving(false);
    syncStateToStorage({
      isObserving: false,
    });
    const response = await chrome.tabs.sendMessage(tab.id!, {
      action: PopupActions.StopObservingMessages,
    });
    console.log(response);
  };

  const syncStateToStorage = (state: PopupState) => {
    chrome.storage.session
      .set({
        popupState: {
          ...state,
        },
      })
      .then(() => {
        console.log('Popup state was set');
      });
  };

  useEffect(() => {
    chrome.storage.session.get('popupState').then((state) => {
      const popupState: PopupState = state.popupState;
      setIsObserving(popupState.isObserving || false);
    });
  }, []);

  return (
    <main className="App">
      <section className="main-section">
        <div className="flex flex-col items-center gap-4">
          <button
            disabled={isObserving}
            className="action-button"
            onClick={startObservingMessages}
          >
            Start Observing Messages
          </button>
          <button
            disabled={!isObserving}
            className="action-button"
            onClick={stopObservingMessages}
          >
            Stop Observing Messages
          </button>
        </div>
      </section>
    </main>
  );
};

export default Popup;
