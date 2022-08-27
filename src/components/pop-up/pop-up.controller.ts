import PopUpView from './pop-up.view';

class PopUpController {
  private view;

  constructor() {
    this.view = new PopUpView();
  }

  init() {
    this.view.registrationUser();
    this.view.logInUser();
    this.view.checkRegistrationForm();
    this.view.checkLogInForm();
    this.view.updateFormElement();
    this.view.closeModalWindow();
  }
}

export default PopUpController;
