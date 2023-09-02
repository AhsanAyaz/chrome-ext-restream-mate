import { initCommandsListener } from "./modules/commands";
import { observeMessages } from "./modules/messages";

console.log('Content script for Restream Extension works 🚀!');

const main = () => {
  initCommandsListener();
  observeMessages();
}

main();