import ViewHtml from './main-html/main-html';

class View {
  private viewHtml;

  constructor() {
    this.viewHtml = new ViewHtml();
  }

  init() {
    this.viewHtml.initViewHtml();
  }
}

export default View;
