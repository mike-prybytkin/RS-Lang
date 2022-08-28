import { IAudioCallView } from './types';
import { WordType } from '../../service/words-service/types';
import { Selector } from '../../constants/constants';

class AudioCallView implements IAudioCallView {
  container;

  readonly baseUrl = 'https://rs-lang-prodaction.herokuapp.com';

  constructor() {
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
  }

  renderGamePage(correctIndex: number, wordsPage: WordType[]) {
    const correctWord = wordsPage[correctIndex];
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    this.container.innerHTML = this.pageStructure();
    const imageWord = document.querySelector(Selector.IMAGE_WORD) as HTMLImageElement;
    imageWord.src = `${this.baseUrl}/${correctWord.image}`;
    const textVariantContainer = document.querySelectorAll(
      Selector.TEXT_VARIANT_CONTAINER
    ) as NodeListOf<HTMLParagraphElement>;
    textVariantContainer.forEach((item, index) => {
      if (index === correctIndex) {
        item.classList.add('correct');
      }
      const textVariant = item.querySelector(Selector.TEXT_VARIANT) as HTMLParagraphElement;
      textVariant.innerHTML = wordsPage[index].wordTranslate;
    });
    const textAnswer = document.querySelector(Selector.TEXT_ANSWER) as HTMLParagraphElement;
    textAnswer.innerHTML = `${correctWord.word} - ${correctWord.wordTranslate}`;
  }

  renderStatisticPage() {
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    this.container.innerHTML = this.statisticStructure();
  }

  addAudioListener(handler: (event: Event) => void) {
    const imageWordContainer = document.querySelectorAll(
      `${Selector.IMAGE_WORD_CONTAINER}, ${Selector.AUDIO_ICON_CONTAINER}`
    ) as NodeListOf<HTMLParagraphElement>;
    imageWordContainer.forEach((item) => {
      item.addEventListener('click', handler);
    });
  }

  addAnswerListener(handler: (event: Event) => void) {
    const imageWordContainer = document.querySelectorAll(
      `${Selector.TEXT_VARIANT_CONTAINER}`
    ) as NodeListOf<HTMLDivElement>;
    imageWordContainer.forEach((item) => {
      item.addEventListener('click', handler);
    });
  }

  addNavigationListener(handler: () => void) {
    const navigation = document.querySelector(Selector.Navigation) as HTMLDivElement;
    navigation.addEventListener('click', handler);
  }

  addIgnoranceListener(handler: () => void) {
    const ignorance = document.querySelector(Selector.Ignorance) as HTMLDivElement;
    ignorance.addEventListener('click', handler);
  }

  showCorrectAnswer(variantAnswer: HTMLDivElement, style: string) {
    const imageAudio = document.querySelector(Selector.ImageAudio) as HTMLImageElement;
    imageAudio.classList.add('hidden');
    const imageWord = document.querySelector(Selector.IMAGE_WORD) as HTMLImageElement;
    imageWord.classList.add('visible-block');
    const correctAnswerContainer = document.querySelector(Selector.CorrectAnswerContainer) as HTMLDivElement;
    correctAnswerContainer.classList.add('visible-flex');
    const navigation = document.querySelector(Selector.Navigation) as HTMLParagraphElement;
    navigation.classList.add('visible-block');
    variantAnswer.classList.add(style);
  }

  removeListener(answerHandler: (event: Event) => void, audioHandler: (event: Event) => void) {
    const textVariantContainer = document.querySelectorAll(
      Selector.TEXT_VARIANT_CONTAINER
    ) as NodeListOf<HTMLDivElement>;
    textVariantContainer.forEach((item) => {
      item.removeEventListener('click', answerHandler);
    });
    const imageWordContainer = document.querySelector(Selector.IMAGE_WORD_CONTAINER) as HTMLDivElement;
    imageWordContainer.removeEventListener('click', audioHandler);
  }

  private pageStructure() {
    return `
    <div class="audio-call-container">
    <div class="studied-word-container">
      <div class="image-word-container">
        <img src="" alt="word-image" class="image-word">
        <img src="./assets/play.svg" alt="play-image" class="image-audio">
      </div>
      <div class="correct-answer-container">
        <div class="audio-icon-container">
          <img src="./assets/play.svg" alt="audio-image">
        </div>
        <p class="text-answer">Answer</p>
      </div>
    </div>
    <div class="variants-answers-container">
      <div class="text-variant-container">
        <p class="text-variant">Varian1</p>
      </div>
      <div class="text-variant-container">
        <p class="text-variant">Varian2</p>
      </div>
      <div class="text-variant-container">
        <p class="text-variant">Varian3</p>
      </div>
    </div>
    <div class="ignorance">
      <p class="text-navigation">Не знаю</p>
    </div>
    <div class="navigation">
      <p class="text-navigation">Следующее слово</p>
    </div>
    </div>
    `;
  }

  private statisticStructure() {
    return `
    <div class="statistic-container">
      <h1 class="statistic-title">Статистика игры</h1>
      <div class="mistake-statistic-container">
        <h3 class="mistake-title">Ошибок <span class="count-mistake"></span></h3>
      </div>
      <div class="success-statistic-container">
        <h3 class="success-title">Правильных ответов <span class="count-success"></span></h3>
      </div>
      <div class="statistic-navigation-container">
        <button class="statistic-play-again-button">Играть ещё раз</button>
        <button class="statistic-home-page-button">На главную</button>
      </div>
    </div>
    `;
  }
}

export default AudioCallView;
