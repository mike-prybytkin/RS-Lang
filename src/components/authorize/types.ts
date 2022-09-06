import { UserType, UserData } from '../../shared/shared';
import { LoginBodyType, NewUserType, UserAuthorizationType } from '../../service/user-service/types';

interface IAuthorizeView {
  clearFormElements(): void;
  registrationUser(handler: RegistrationHandler): void;
  logInUser(handler: LogInHandler): void;
  checkRegistrationForm(): void;
  checkLogInForm(): void;
  closeModalWindow(): void;
}

interface IAuthorizeController {
  init(): void;
}

interface IAuthorizeModel {
  createUser(email: string, password: string, name: string): Promise<NewUserType | null>;
  logInUser(email: string, password: string): Promise<UserAuthorizationType | null>;
  setLocalStorage(data: UserData): void;
  removeLocalStorage(): void;
  getLocalStorage(): UserData;
}

type RegistrationHandler = (this: void, data: UserType) => void;

type LogInHandler = (this: void, data: LoginBodyType) => void;

type RenderLogoutHendler = (this: void) => void;

export {
  IAuthorizeModel,
  IAuthorizeController,
  RenderLogoutHendler,
  LogInHandler,
  RegistrationHandler,
  IAuthorizeView,
};
