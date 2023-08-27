export enum MessageCommandKey {
  DROP = 'Drop'
}

export const MESSAGE_COMMANDS: Record<MessageCommandKey, RegExp> = {
  [MessageCommandKey.DROP]: /^!drop/
}