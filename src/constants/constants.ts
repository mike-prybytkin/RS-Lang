const BODY = '.body';
const MAIN_WRAPPER = '.main-wrapper';

export { BODY, MAIN_WRAPPER };

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
}

export const LEARNED_FILTER = `%7B%22%24or%22%3A%5B%7B%22userWord%22%3Anull%7D%2C%20%7B%22userWord.optional.learned%22%3Afalse%7D%5D%7D`;
