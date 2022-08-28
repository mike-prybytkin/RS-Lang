import IAuthorizeControllerView from './authorize.view';
import AuthorizeModel from './authorize.model';
import { UserType } from '../../shared/shared';

class AuthorizeController {
  private view;

  private model;

  constructor() {
    this.view = new IAuthorizeControllerView();
    this.model = new AuthorizeModel();
  }

  init() {
    this.view.registrationUser(this.registrationUser);
    this.view.logInUser();
    this.view.checkRegistrationForm();
    this.view.checkLogInForm();
    this.view.updateFormElement();
    this.view.closeModalWindow();
  }

  registrationUser = (data: UserType) => {
    const promise = this.model.createUser(data.email, data.password, data.name);
    promise.then((response) => {
      if (response) {
        this.view.showToastMessage(`${response.name} Вы успешно зарегистрировались!`, 'green');
      } else {
        this.view.showToastMessage('Извините, такой email уже зарегистрирован', 'red');
      }
    });
  };
}

export default AuthorizeController;
