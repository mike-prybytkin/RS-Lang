import { UserType } from '../../shared/shared';

interface IAuthorizeView {
  updateFormElement(): void;
  registrationUser(handler: IContextHandler): void;
  logInUser(): void; // потом поменять
  checkRegistrationForm(): void;
  checkLogInForm(): void;
  closeModalWindow(): void;
}

type IContextHandler = (this: void, data: UserType) => void;

export { IContextHandler, IAuthorizeView };
