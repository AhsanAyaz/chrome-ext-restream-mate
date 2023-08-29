import { IMessage } from "../../../core/message";
import { MESSAGE_COMMANDS, MessageCommandKey } from "../../../core/messageCommands";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from "./firebase";

const firestore = getFirestore(firebaseApp);
const messagesCollectionRef = collection(firestore, '/messages');

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