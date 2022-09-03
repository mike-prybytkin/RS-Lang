import { ISprintView } from './types';
import { WordType } from '../../service/words-service/types';
import { Selector, TOAST } from '../../constants/constants';

class SprintView implements ISprintView {
  container!: HTMLElement;

  // hasAnswer = false;

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
    // this.hasAnswer = false;
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    this.container.innerHTML = this.pageStructure();
    const textWord = document.querySelector(Selector.TextWord) as HTMLParagraphElement;
    textWord.innerHTML = `${wordsPage[correctIndex].word}`;
    const textTranslate = document.querySelector(Selector.TextTranslate) as HTMLParagraphElement;
    textTranslate.innerHTML = `${wordsPage[0].wordTranslate}`;
    if (correctIndex === 0) {
      const correctButtonVariant = document.querySelector(Selector.YesVariant) as HTMLButtonElement;
      correctButtonVariant.classList.add('correct');
    } else {
      const correctButtonVariant = document.querySelector(Selector.NoVariant) as HTMLButtonElement;
      correctButtonVariant.classList.add('correct');
    }
  }

  renderNextWord(correctIndex: number, wordsPage: WordType[]) {
    const wordContainer = document.querySelector(Selector.SprintContainer) as HTMLDivElement;
    wordContainer.innerHTML = this.nextWordStructure();
    const textWord = document.querySelector(Selector.TextWord) as HTMLParagraphElement;
    textWord.innerHTML = `${wordsPage[correctIndex].word}`;
    const textTranslate = document.querySelector(Selector.TextTranslate) as HTMLParagraphElement;
    textTranslate.innerHTML = `${wordsPage[0].wordTranslate}`;
    if (correctIndex === 0) {
      const correctButtonVariant = document.querySelector(Selector.YesVariant) as HTMLButtonElement;
      correctButtonVariant.classList.add('correct');
    } else {
      const correctButtonVariant = document.querySelector(Selector.NoVariant) as HTMLButtonElement;
      correctButtonVariant.classList.add('correct');
    }
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

  changeAudioImage() {
    const image = document.querySelector(Selector.SprintAudioIcon) as HTMLImageElement;
    if (image) image.src = './assets/play.svg';
  }

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
          // case '1':
          // case '2':
          // case '3':
          //   if (!this.hasAnswer) checkAnswer(element);
          //   break;
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
    const buttonsAnswer = document.querySelectorAll(Selector.ButtonVariant) as NodeListOf<HTMLButtonElement>;
    buttonsAnswer.forEach((item) => {
      item.addEventListener('click', (event) => {
        const sprintContainer = document.querySelector(Selector.SprintContainer) as HTMLDivElement;
        sprintContainer.classList.remove('border-animation-correct');
        sprintContainer.classList.remove('border-animation-wrong');
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

  // hiddenIgnorance() {
  //   const ignorance = document.querySelector(Selector.Ignorance) as HTMLDivElement;
  //   ignorance.classList.add('hidden');
  // }

  addNavigationListener(handler: () => void) {
    const navigation = document.querySelector(Selector.Navigation) as HTMLDivElement;
    navigation.addEventListener('click', handler);
  }

  addIgnoranceListener(handler: () => void) {
    const ignorance = document.querySelector(Selector.Ignorance) as HTMLDivElement;
    ignorance.addEventListener('click', handler);
  }

  showCorrectAnswer(style: string) {
    const sprintContainer = document.querySelector(Selector.SprintContainer) as HTMLDivElement;
    if (style === 'correct-answer') {
      sprintContainer.classList.add('border-animation-correct');
    } else {
      sprintContainer.classList.add('border-animation-wrong');
    }

    // const imageWord = document.querySelector(Selector.IMAGE_WORD) as HTMLImageElement;
    // imageWord.classList.add('visible-block');
    // const correctAnswerContainer = document.querySelector(Selector.CorrectAnswerContainer) as HTMLButtonElement;
    // correctAnswerContainer.classList.add('visible-flex');
    // const navigation = document.querySelector(Selector.Navigation) as HTMLParagraphElement;
    // navigation.classList.add('visible-block');
    // variantAnswer.classList.add(style);
  }

  removeListener() {
    const buttonsAnswer = document.querySelectorAll(Selector.ButtonVariant) as NodeListOf<HTMLButtonElement>;
    buttonsAnswer.forEach((item) => {
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
    <div class="sprint-container">
      <div class="study-sprint-container">
        <div class="audio-image-container">
          <img src="./assets/play.svg" alt="audio-image" class="sprint-audio-icon">
        </div>
        <div class="word-container">
          <p class="text-word">Word</p>
          <p class="text-translate">translate</p>
        </div>
      </div>
      <div class="variants-sprint-container">
        <button class="no-variant button-variant">
          <p class="sprint-text-variant">&larr; Неверно</p>
        </button>
        <button class="yes-variant button-variant">
          <p class="sprint-text-variant">Верно &rarr;</p>
        </button>
      </div>
    </div>
    `;
  }

  nextWordStructure() {
    return `
      <div class="study-sprint-container">
        <div class="audio-image-container">
          <img src="./assets/play.svg" alt="audio-image" class="sprint-audio-icon">
        </div>
        <div class="word-container">
          <p class="text-word">Word</p>
          <p class="text-translate">translate</p>
        </div>
      </div>
      <div class="variants-sprint-container">
        <button class="no-variant button-variant">
          <p class="sprint-text-variant">&larr; Неверно</p>
        </button>
        <button class="yes-variant button-variant">
          <p class="sprint-text-variant">Верно &rarr;</p>
        </button>
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
