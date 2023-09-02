import React, { FormEvent } from 'react';
import './Popup.css';
import { parseMessage } from '../Content/modules/messages';

const Popup = () => {
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
    });
  };

  return (
    <main className="App">
      <section className="main-section pb-4 px-4 bg-slate-800 dark:text-white rounded-md">
        <h2 className="text-center my-4 text-2xl">Testing</h2>
        <form className="flex flex-col gap-4" onSubmit={sendDummyMessage}>
          <input
            className="text-slate-900 px-3 py-1.5 rounded-md"
            name="username"
            type="text"
            placeholder="Enter your name"
          />
          <button
            className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500"
            type="submit"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default Popup;
