import AuthorizeView from './authorize.view';
import AuthorizeModel from './authorize.model';
import { UserType } from '../../shared/shared';
import { LoginBodyType } from '../../service/user-service/types';
import { IAuthorizeController } from './types';
import {
  SUCSESS_REGISTRATION_MESSAGE,
  FAILING_REGISTRATION_MESSAGE,
  SUCSESS_LOGIN_MESSAGE,
  FAILING_LOGIN_MESSAGE,
  SUCSESS_COLOR,
  FAILING_COLOR,
} from '../../constants/constants';
import { IAudioCallController } from '../audio-call/types';
import { ISprintController } from '../sprint/types';

class AuthorizeController implements IAuthorizeController {
  private view;

  private model;

  audioCall: IAudioCallController;

  sprint: ISprintController;

  constructor(audioCall: IAudioCallController, sprint: ISprintController) {
    this.view = new AuthorizeView();
    this.model = new AuthorizeModel();
    this.audioCall = audioCall;
    this.sprint = sprint;
  }

  init() {
    this.view.registrationUser(this.registrationUser);
    this.view.logInUser(this.logInUser);
    this.view.renderLogoutUser(this.logOutUser);
    this.view.checkRegistrationForm();
    this.view.checkLogInForm();
    this.view.updateFormElement();
    this.view.closeModalWindow();
    this.checkLogInUser();
  }

  private registrationUser = (data: UserType) => {
    const promise = this.model.createUser(data.email, data.password, data.name);
    promise.then((response) => {
      if (response) {
        this.view.showToastMessage(`${response.name}, ${SUCSESS_REGISTRATION_MESSAGE}`, `${SUCSESS_COLOR}`);
      } else {
        this.view.showToastMessage(`${FAILING_REGISTRATION_MESSAGE}`, `${FAILING_COLOR}`);
      }
    });
  };

  private logInUser = (data: LoginBodyType) => {
    const promise = this.model.logInUser(data.email, data.password);
    promise.then((response) => {
      if (response) {
        this.view.showToastMessage(`${SUCSESS_LOGIN_MESSAGE} ${response.name}!`, `${SUCSESS_COLOR}`);
        this.model.setLocalStorage(response);
        this.view.renderLoginUser(response.name);
        this.audioCall.model.userService.writeUserData(response);
        this.sprint.model.userService.writeUserData(response);
      } else {
        this.view.showToastMessage(`${FAILING_LOGIN_MESSAGE}`, `${FAILING_COLOR}`);
      }
    });
  };

  private logOutUser = () => {
    this.model.removeLocalStorage();
    this.audioCall.model.userService.removeUserData();
  };

  private checkLogInUser() {
    const userStorageData = this.model.getLocalStorage();
    if (userStorageData) {
      this.view.renderLoginUser(userStorageData.name);
    }
  }
}

export default AuthorizeController;
