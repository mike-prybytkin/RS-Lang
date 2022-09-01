import { ISprintView } from './types';
import { WordType } from '../../service/words-service/types';
import { Selector, TOAST } from '../../constants/constants';

class SprintView implements ISprintView {
  container!: HTMLElement;

  hasAnswer = false;

  readonly baseUrl = 'https://rs-lang-prodaction.herokuapp.com';

  renderStartPage() {
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    this.container.innerHTML = this.startPageStructure();
  }

  addStartListeners(handler: (event: Event) => void) {
    const levelButtons = this.container.querySelectorAll(Selector.LevelButton) as NodeListOf<HTMLButtonElement>;
    levelButtons.forEach((item) => {
      item.addEventListener('click', handler);
    });
  }

  renderGamePage(correctIndex: number, wordsPage: WordType[]) {
    this.hasAnswer = false;
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

  renderStatisticPage(statisticWords: WordType[], countMistake: number, countSuccess: number) {
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    this.container.innerHTML = this.statisticStructure();
    const countMistakeSpan = this.container.querySelector(Selector.CountMistake) as HTMLSpanElement;
    countMistakeSpan.innerHTML = `${countMistake}`;
    const countSuccessSpan = this.container.querySelector(Selector.CountSuccess) as HTMLSpanElement;
    countSuccessSpan.innerHTML = `${countSuccess}`;
    statisticWords.forEach((item) => {
      this.renderStatisticWord(item);
    });
  }

  renderStatisticWord(word: WordType) {
    const statisticWord = document.createElement('p');
    const wordSpan = document.createElement('span');
    wordSpan.classList.add(Selector.StatisticWordSpan.slice(1));
    wordSpan.innerHTML = `${word.word}`;
    const translateSpan = document.createElement('span');
    translateSpan.classList.add(Selector.StatisticTranslateSpan.slice(1));
    translateSpan.innerHTML = ` - ${word.wordTranslate}`;
    statisticWord.append(wordSpan, translateSpan);
    if (word.answer === 'correct-answer') {
      const successStatisticContainer = document.querySelector(Selector.SuccessStatisticContainer) as HTMLDivElement;
      successStatisticContainer.append(statisticWord);
    } else {
      const mistakeStatisticContainer = document.querySelector(Selector.MistakeStatisticContainer) as HTMLDivElement;
      mistakeStatisticContainer.append(statisticWord);
    }
  }

  // addAudioListener(handler: (element: HTMLImageElement) => void) {
  //   const imageWordContainer = document.querySelectorAll(
  //     `${Selector.IMAGE_WORD_CONTAINER}, ${Selector.AUDIO_ICON_CONTAINER}`
  //   ) as NodeListOf<HTMLParagraphElement>;
  //   imageWordContainer.forEach((item) => {
  //     item.addEventListener('click', (event) => {
  //       const element = event.target as HTMLImageElement;
  //       handler(element);
  //     });
  //   });
  // }

  // changeAudioImage() {
  //   const image = document.querySelector(Selector.ImageAudio) as HTMLImageElement;
  //   if (image) image.src = './assets/play.svg';
  // }

  addKeyDownListener(
    checkAnswer: (variantAnswer: HTMLButtonElement) => void,
    addUnknownWord: () => void /* ,
    playAudio: (element: HTMLImageElement) => void */
  ) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const element = this.getElementByKey(event.key) as HTMLButtonElement;
      // let imageAudio: HTMLImageElement;
      if (element || event.key === ' ') {
        switch (event.key) {
          case '1':
          case '2':
          case '3':
            if (!this.hasAnswer) checkAnswer(element);
            break;
          case 'Enter':
            addUnknownWord();
            break;
          case ' ':
            // imageAudio = !this.hasAnswer
            //   ? (document.querySelector(Selector.ImageAudio) as HTMLImageElement)
            //   : (document.querySelector(Selector.CorrectImageAudio) as HTMLImageElement);
            // if (imageAudio) playAudio(imageAudio);
            break;
          default:
            break;
        }
      }
    });
  }

  getElementByKey(key: string) {
    return document.querySelector(`#button${key}`) as HTMLButtonElement;
  }

  addAnswerListener(handler: (variantAnswer: HTMLButtonElement) => void) {
    const imageWordContainer = document.querySelectorAll(
      `${Selector.TEXT_VARIANT_CONTAINER}`
    ) as NodeListOf<HTMLButtonElement>;
    imageWordContainer.forEach((item) => {
      item.addEventListener('click', (event) => {
        const variantAnswer = event.currentTarget as HTMLButtonElement;
        handler(variantAnswer);
      });
    });
  }

  addStatisticListener(playAgainHandler: () => void, goMainPage: () => void) {
    const playAgainButton = document.querySelector(Selector.StatisticPlayAgainButton) as HTMLButtonElement;
    playAgainButton.addEventListener('click', playAgainHandler);
    const statisticHomePageButton = document.querySelector(Selector.StatisticHomePageButton) as HTMLButtonElement;
    statisticHomePageButton.addEventListener('click', goMainPage);
  }

  hiddenIgnorance() {
    const ignorance = document.querySelector(Selector.Ignorance) as HTMLDivElement;
    ignorance.classList.add('hidden');
  }

  addNavigationListener(handler: () => void) {
    const navigation = document.querySelector(Selector.Navigation) as HTMLDivElement;
    navigation.addEventListener('click', handler);
  }

  addIgnoranceListener(handler: () => void) {
    const ignorance = document.querySelector(Selector.Ignorance) as HTMLDivElement;
    ignorance.addEventListener('click', handler);
  }

  showCorrectAnswer(variantAnswer: HTMLButtonElement, style: string) {
    const imageAudio = document.querySelector(Selector.ImageAudio) as HTMLImageElement;
    imageAudio.classList.add('hidden');
    const imageWord = document.querySelector(Selector.IMAGE_WORD) as HTMLImageElement;
    imageWord.classList.add('visible-block');
    const correctAnswerContainer = document.querySelector(Selector.CorrectAnswerContainer) as HTMLButtonElement;
    correctAnswerContainer.classList.add('visible-flex');
    const navigation = document.querySelector(Selector.Navigation) as HTMLParagraphElement;
    navigation.classList.add('visible-block');
    variantAnswer.classList.add(style);
  }

  removeListener() {
    const textVariantContainer = document.querySelectorAll(
      Selector.TEXT_VARIANT_CONTAINER
    ) as NodeListOf<HTMLButtonElement>;
    textVariantContainer.forEach((item) => {
      const temp = item;
      temp.disabled = true;
    });
  }

  showToastMessage() {
    const toastHTML = `<span>Не найдены слова для изучения</span>`;
    M.toast({ html: toastHTML });
    const toast = document.querySelector(TOAST) as HTMLElement;
    toast.style.backgroundColor = 'red';
  }

  pageStructure() {
    return `
    <div class="audio-call-container">
    <div class="studied-word-container">
      <div class="image-word-container">
        <img src="" alt="word-image" class="image-word">
        <img src="./assets/audio.svg" alt="play-image" class="image-audio" id="button ">
      </div>
      <div class="correct-answer-container">
        <div class="audio-icon-container">
          <img src="./assets/play.svg" alt="audio-image" class="correct-image-audio">
        </div>
        <p class="text-answer">Answer</p>
      </div>
    </div>
    <div class="variants-answers-container">
      <button class="text-variant-container" id="button1">
        <p class="text-variant">Varian1</p>
      </button>
      <button class="text-variant-container" id="button2">
        <p class="text-variant">Varian2</p>
      </button>
      <button class="text-variant-container" id="button3">
        <p class="text-variant">Varian3</p>
      </button>
    </div>
    <div class="ignorance" id="buttonEnter">
      <p class="text-navigation">Не знаю</p>
    </div>
    <div class="navigation">
      <p class="text-navigation">Следующее слово</p>
    </div>
    </div>
    `;
  }

  statisticStructure() {
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

  startPageStructure() {
    return `
    <div class="start-page-container">
      <h1 class="start-title">Выберите уровень сложности</h1>
      <div class="difficulty-level-container">
        <button class="difficulty-level" id="level1">1</button>
        <button class="difficulty-level" id="level2">2</button>
        <button class="difficulty-level" id="level3">3</button>
        <button class="difficulty-level" id="level4">4</button>
        <button class="difficulty-level" id="level5">5</button>
        <button class="difficulty-level" id="level6">6</button>
      </div>
    </div>
    `;
  }
}

export default SprintView;
