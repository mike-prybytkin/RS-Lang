const BODY = '.body';
const MAIN_WRAPPER = '.main-wrapper';
const LOGIN_BUTTON_HEADER = '.login-button-header';
const REGISTRATON_BUTTON = '.registration-button';
const USER_NAME_SELECTOR = 'user_name';
const EMAIL_REGISTRATION = 'email-registration';
const PASSWORD_REGISTRATION = 'password-registration';
const PASSWORD_REGISTRATION_CONFIRM = 'password-registration-confirm';
const LOG_IN_BUTTON = '.log-in-button';
const EMAIL_LOG_IN = 'email-log-in';
const PASSWORD_LOG_IN = 'password-log-in';
const REGISTRATION_SWIPE = 'registration-swipe';
const MODAL_LOG_IN = 'modal-log-in';
const CLOSE_POP_UP_BUTTON = '.modal-close-footer-btn';
const MODAL_TRIGGER = 'modal-trigger';
const LOGOUT_USER = 'logout-user';
const TOOLTIPPED = 'tooltipped';
const LOGOUT_TEMPLATE_BUTTON = '<i class="material-icons left">account_box</i>выход';
const LOGOUT_MESSAGE = 'Вы хотите выйти?';
const SUCSESS_REGISTRATION_MESSAGE = 'Вы успешно зарегистрировались!';
const FAILING_REGISTRATION_MESSAGE = 'Извините, такой email уже зарегистрирован';
const SUCSESS_LOGIN_MESSAGE = 'Здравствуйте';
const FAILING_LOGIN_MESSAGE = 'Упс, такого пользователя не существует...';
const SUCSESS_COLOR = 'green';
const FAILING_COLOR = 'red';
const TOAST = '.toast';
const SWITCH_TO_HOME_PAGE = '.switch-to-home-page';
const SWITCH_THEME_BUTTON = '.switch-theme-button';
const THEME_ICON = '.theme-icon';
const LIGHT_THEME_ICON = 'wb_sunny';
const DARK_THEME_ICON = 'brightness_3';
const LIGHT_THEME_TEXT = 'text-darken-4';
const DARK_THEME_TEXT = 'text-lighten-2';
const APP_TEXT = 'grey-text';
const NAV_AND_BURGER_WRAPPERS = 'app-navigation';
const NAV_AND_BURGER_LIGHT = ['red', 'lighten-5'];
const NAV_AND_BURGER_DARK = ['brown', 'lighten-1'];
const DARK_THEME = 'dark-theme';
const GAMES_BUTTON = '.games';
const AUDIO_CHALLENGE_GAME_BTN = 'audio-challenge-game';
const SPRINT_GAME_BTN = 'sprint-game';

export {
  DARK_THEME,
  NAV_AND_BURGER_DARK,
  NAV_AND_BURGER_LIGHT,
  NAV_AND_BURGER_WRAPPERS,
  APP_TEXT,
  DARK_THEME_TEXT,
  LIGHT_THEME_TEXT,
  THEME_ICON,
  LIGHT_THEME_ICON,
  DARK_THEME_ICON,
  SWITCH_THEME_BUTTON,
  BODY,
  MAIN_WRAPPER,
  LOGIN_BUTTON_HEADER,
  REGISTRATON_BUTTON,
  USER_NAME_SELECTOR,
  EMAIL_REGISTRATION,
  PASSWORD_REGISTRATION,
  PASSWORD_REGISTRATION_CONFIRM,
  LOG_IN_BUTTON,
  EMAIL_LOG_IN,
  PASSWORD_LOG_IN,
  REGISTRATION_SWIPE,
  MODAL_LOG_IN,
  CLOSE_POP_UP_BUTTON,
  MODAL_TRIGGER,
  LOGOUT_USER,
  TOOLTIPPED,
  LOGOUT_TEMPLATE_BUTTON,
  LOGOUT_MESSAGE,
  SUCSESS_REGISTRATION_MESSAGE,
  FAILING_REGISTRATION_MESSAGE,
  SUCSESS_LOGIN_MESSAGE,
  FAILING_LOGIN_MESSAGE,
  SUCSESS_COLOR,
  FAILING_COLOR,
  TOAST,
  SWITCH_TO_HOME_PAGE,
  GAMES_BUTTON,
  AUDIO_CHALLENGE_GAME_BTN,
  SPRINT_GAME_BTN,
};

export enum Selector {
  Body = '.body',
  MainWrapper = '.main-wrapper',
  TEXT_VARIANT = '.text-variant',
  TEXT_VARIANT_CONTAINER = '.text-variant-container',
  AUDIO_PLAYER = '.audio-player',
  IMAGE_WORD_CONTAINER = '.image-word-container',
  AUDIO_ICON_CONTAINER = '.audio-icon-container',
  TEXT_ANSWER = '.text-answer',
  IMAGE_WORD = '.image-word',
  ImageAudio = '.image-audio',
  CorrectAnswerContainer = '.correct-answer-container',
  Navigation = '.navigation',
  TextNavigation = '.text-navigation',
  Ignorance = '.ignorance',
  MistakeStatisticContainer = '.mistake-statistic-container',
  SuccessStatisticContainer = '.success-statistic-container',
  CountMistake = '.count-mistake',
  CountSuccess = '.count-success',
  StatisticWordSpan = '.statistic-word-span',
  StatisticTranslateSpan = '.statistic-translate-span',
  StatisticPlayAgainButton = '.statistic-play-again-button',
  StatisticHomePageButton = '.statistic-home-page-button',
  LevelButton = '.difficulty-level',
  CorrectImageAudio = '.correct-image-audio',
  SprintAudioIcon = '.sprint-audio-icon',
  TextWord = '.text-word',
  TextTranslate = '.text-translate',
  ButtonVariant = '.button-variant',
  NoVariant = '.no-variant',
  YesVariant = '.yes-variant',
  SprintContainer = '.sprint-container',
  AudioImageContainer = '.audio-image-container',
  Timer = '.timer',
  Score = '.score',
  MainGame = '.main-game',
  CountPoints = '.count-points',
  AnswerCircle = '.answer-circle',
}

export const LEARNED_FILTER = `%7B%22%24or%22%3A%5B%7B%22userWord%22%3Anull%7D%2C%20%7B%22userWord.optional.learned%22%3Afalse%7D%5D%7D`;
