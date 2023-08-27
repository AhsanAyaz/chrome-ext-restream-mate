export class Message {
  private el: HTMLDivElement;
  text!: string;
  imageUrl!: string;
  username!: string;
  constructor(el: HTMLDivElement) {
    this.el = el;
    this.parseMessage(this.el);
  }

  parseMessage(el: HTMLDivElement) {
    const imageEl = el.querySelector('.MuiAvatar-circle img') as HTMLImageElement;
    this.imageUrl = imageEl.src;
    const usernameEl = el.querySelector('.MuiTypography-subtitle2') as HTMLDivElement;
    this.username = usernameEl.textContent || '';
    const textEl = el.querySelector('.chat-text-normal');
    this.text = textEl?.textContent || '';
    this.el.dataset.uuid = crypto.randomUUID();
  }
}