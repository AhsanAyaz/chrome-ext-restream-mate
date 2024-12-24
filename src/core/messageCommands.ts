export enum MessageCommandKey {
  DROP = 'Drop',
  REDEEM = 'Redeem',
}

export const MESSAGE_COMMANDS: Record<MessageCommandKey, RegExp> = {
  [MessageCommandKey.DROP]: /^!drop/,
  [MessageCommandKey.REDEEM]: /^!dontredeem|!sad|!clap|!pfft|!scream/,
};
