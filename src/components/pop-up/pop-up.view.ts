import {
  REGISTRATON_BUTTON,
  USER_NAME,
  EMAIL_REGISTRATION,
  PASSWORD_REGISTRATION,
  PASSWORD_REGISTRATION_CONFIRM,
  LOG_IN_BUTTON,
  EMAIL_LOG_IN,
  PASSWORD_LOG_IN,
  MODAL_LOG_IN,
  CLOSE_POP_UP_BUTTON,
} from '../../constants/constants';

class PopUpView {
  private userName;

  private emailRegistration;

  private passwordRegistration;

  private passwordRegistrationConf;

  private emailLogIn;

  private passwordLogIn;

  constructor() {
    this.userName = document.getElementById(USER_NAME) as HTMLFormElement;
    this.emailRegistration = document.getElementById(EMAIL_REGISTRATION) as HTMLFormElement;
    this.passwordRegistration = document.getElementById(PASSWORD_REGISTRATION) as HTMLFormElement;
    this.passwordRegistrationConf = document.getElementById(PASSWORD_REGISTRATION_CONFIRM) as HTMLFormElement;
    this.emailLogIn = document.getElementById(EMAIL_LOG_IN) as HTMLFormElement;
    this.passwordLogIn = document.getElementById(PASSWORD_LOG_IN) as HTMLFormElement;
  }

  updateFormElement() {
    const modalWindow = document.getElementById(MODAL_LOG_IN) as HTMLElement;
    modalWindow.addEventListener('focusout', () => {
      this.userName = document.getElementById(USER_NAME) as HTMLFormElement;
      this.emailRegistration = document.getElementById(EMAIL_REGISTRATION) as HTMLFormElement;
      this.passwordRegistration = document.getElementById(PASSWORD_REGISTRATION) as HTMLFormElement;
      this.passwordRegistrationConf = document.getElementById(PASSWORD_REGISTRATION_CONFIRM) as HTMLFormElement;
      this.emailLogIn = document.getElementById(EMAIL_LOG_IN) as HTMLFormElement;
      this.passwordLogIn = document.getElementById(PASSWORD_LOG_IN) as HTMLFormElement;
    });
  }

  registrationUser() {
    const registrationButton = document.querySelector(REGISTRATON_BUTTON) as HTMLElement;
    registrationButton.addEventListener('click', () => {
      console.log('fdfdfdf');
      this.clearRegistrationForm();
    });
  }

  checkRegistrationForm() {
    const modalWindow = document.getElementById(MODAL_LOG_IN) as HTMLElement;
    const registrationButton = document.querySelector(REGISTRATON_BUTTON) as HTMLElement;

    modalWindow.addEventListener('focusout', () => {
      if (
        this.userName.classList.contains('valid') &&
        this.emailRegistration.classList.contains('valid') &&
        this.passwordRegistration.classList.contains('valid') &&
        this.passwordRegistrationConf.value === this.passwordRegistration.value
      ) {
        registrationButton.classList.remove('disabled');
      } else {
        registrationButton.classList.add('disabled');
      }
    });
  }

  checkLogInForm() {
    const modalWindow = document.getElementById(MODAL_LOG_IN) as HTMLElement;
    const logInButton = document.querySelector(LOG_IN_BUTTON) as HTMLElement;

    modalWindow.addEventListener('focusout', () => {
      if (this.emailLogIn.classList.contains('valid') && this.passwordLogIn.classList.contains('valid')) {
        logInButton.classList.remove('disabled');
      } else {
        logInButton.classList.add('disabled');
      }
    });
  }

  private clearLogInForm() {
    this.emailLogIn.value = '';
    this.passwordLogIn.value = '';
    this.emailLogIn.classList.remove('valid');
    this.passwordLogIn.classList.remove('valid');
    this.emailLogIn.classList.remove('invalid');
    this.passwordLogIn.classList.remove('invalid');
  }

  private clearRegistrationForm() {
    this.userName.value = '';
    this.emailRegistration.value = '';
    this.passwordRegistration.value = '';
    this.passwordRegistrationConf.value = '';
    this.passwordRegistration.value = '';
    this.userName.classList.remove('valid');
    this.emailRegistration.classList.remove('valid');
    this.passwordRegistration.classList.remove('valid');
    this.passwordRegistrationConf.classList.remove('valid');
    this.passwordRegistration.classList.remove('valid');
    this.userName.classList.remove('invalid');
    this.emailRegistration.classList.remove('invalid');
    this.passwordRegistration.classList.remove('invalid');
    this.passwordRegistrationConf.classList.remove('invalid');
    this.passwordRegistration.classList.remove('invalid');
  }

  closeModalWindow() {
    const closeModalButton = document.querySelector(CLOSE_POP_UP_BUTTON) as HTMLElement;
    closeModalButton.addEventListener('click', () => {
      this.clearRegistrationForm();
      this.clearLogInForm();
    });
  }
}

export default PopUpView;
