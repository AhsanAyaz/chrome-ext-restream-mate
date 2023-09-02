import { IMessage, Message } from "../../../core/message";
import { MESSAGE_COMMANDS, MessageCommandKey } from "../../../core/messageCommands";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from "./firebase";

const firestore = getFirestore(firebaseApp);
const messagesCollectionRef = collection(firestore, '/messages');

const OBSERVE_INTERVAL_IN_MS = 3000;

let restreamMessages: Message[] = [];

const messagesElQuery = '[class^=styles_scrollable-div] > .MuiGrid-item:not([data-uuid])';

let observeTimer: ReturnType<typeof setInterval> | null = null;

export const observeMessages = () => {
  observeTimer = setInterval(() => {
    const allMessagesElements: NodeListOf<HTMLDivElement> = document.querySelectorAll(messagesElQuery);
    allMessagesElements.forEach((el) => {
      const message = new Message(el);
      restreamMessages.push(message);
      parseMessage(message);
    });
  }, OBSERVE_INTERVAL_IN_MS)
}

export const stopObservingMessages = () => {
  if (observeTimer !== null) {
    clearInterval(observeTimer);
  }
}

const getCommandKey = (text: string) => {
  const command = Object.keys(MESSAGE_COMMANDS).find(key => {
    const matchStr = MESSAGE_COMMANDS[key as MessageCommandKey];
    return text.match(matchStr);
  });
  return command;
}

export const parseMessage = async ({ imageUrl, text, username }: IMessage) => {
  const command = getCommandKey(text);
  switch (command) {
    case MessageCommandKey.DROP:
      await addDoc(messagesCollectionRef, { imageUrl, text, username })
      break;

    default:
      break;
  }
}