import React, { FormEvent, useEffect, useState } from 'react';
import './Popup.css';
import { PopupActions } from '../../core/actions';
import { parseMessage } from '../Content/modules/messages';

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
      if (!popupState) {
        return;
      }
      setIsObserving(popupState.isObserving || false);
    });
  }, []);

  const sendDummyMessage = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;
    const inputEl = target.elements.namedItem('username') as HTMLInputElement;
    const username = inputEl.value;
    const imageUrl = `https://ui-avatars.com/api/?name=${username}`;
    parseMessage({
      imageUrl,
      text: '!drop me',
      username,
    })
  }

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
      <section className='main-section mt-4 pb-4 px-4 bg-slate-800 dark:text-white rounded-md'>
        <h2 className='text-center my-4 text-2xl'>Testing</h2>
        <form className='flex flex-col gap-4' onSubmit={sendDummyMessage}>
          <input className='text-slate-900 px-3 py-1.5 rounded-md' name='username' type='text' placeholder='Enter your name' />
          <button className='px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500' type='submit'>Send</button>
        </form>
      </section>
    </main>
  );
};

export default Popup;
