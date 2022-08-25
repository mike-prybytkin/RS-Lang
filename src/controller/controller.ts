import View from '../view/view';

class Controller {
  private view;

  constructor() {
    this.view = new View();
  }

  init() {
    this.view.init();
  }
}

export default Controller;
