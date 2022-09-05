import { ISprintView } from './types';
import { WordType } from '../../service/words-service/types';
import { Selector, TOAST } from '../../constants/constants';

class SprintView implements ISprintView {
  container!: HTMLElement;

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
    const footer = document.querySelector(Selector.FOOTER) as HTMLElement;
    footer.style.display = 'none';
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
    const mainGame = document.querySelector(Selector.MainGame) as HTMLDivElement;
    mainGame.innerHTML = this.nextWordStructure();
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

  addAudioListener(handler: (element: HTMLImageElement) => void) {
    const audioImageContainer = document.querySelector(Selector.AudioImageContainer) as HTMLDivElement;
    audioImageContainer.addEventListener('click', (event) => {
      const element = event.target as HTMLImageElement;
      handler(element);
    });
  }

  changeAudioImage() {
    const image = document.querySelector(Selector.SprintAudioIcon) as HTMLImageElement;
    if (image) image.src = './assets/play.svg';
  }

  addTimerListener(handler: () => void) {
    const timer = document.querySelector(Selector.Timer) as HTMLDivElement;
    timer.addEventListener('click', handler);
  }

  renderTimer(inner: string) {
    const timer = document.querySelector(Selector.Timer) as HTMLDivElement;
    timer.innerHTML = inner;
  }

  addKeyDownListener(checkAnswer: (variantAnswer: HTMLButtonElement) => void, toggleAudio: () => void) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const element = document.querySelector(`#${event.code}`) as HTMLButtonElement;
      if (element || event.code === 'Space') {
        const sprintContainer = document.querySelector(Selector.SprintContainer) as HTMLDivElement;
        sprintContainer.classList.remove('border-animation-correct');
        sprintContainer.classList.remove('border-animation-wrong');
        switch (event.code) {
          case 'ArrowLeft':
          case 'ArrowRight':
            checkAnswer(element);
            break;
          case 'Space':
            toggleAudio();
            break;
          default:
            break;
        }
      }
    });
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

  addCrossListener(handler: () => void) {
    const cross = document.querySelector(Selector.CrossContainer) as HTMLDivElement;
    cross.addEventListener('click', handler);
  }

  addStatisticListener(playAgainHandler: () => void, goMainPage: () => void) {
    const playAgainButton = document.querySelector(Selector.StatisticPlayAgainButton) as HTMLButtonElement;
    playAgainButton.addEventListener('click', playAgainHandler);
    const statisticHomePageButton = document.querySelector(Selector.StatisticHomePageButton) as HTMLButtonElement;
    statisticHomePageButton.addEventListener('click', () => {
      goMainPage();
      const footer = document.querySelector(Selector.FOOTER) as HTMLElement;
      footer.style.display = 'block';
    });
  }

  showCorrectAnswer(style: string) {
    const sprintContainer = document.querySelector(Selector.SprintContainer) as HTMLDivElement;
    if (style === 'correct-answer') {
      sprintContainer.classList.add('border-animation-correct');
    } else {
      sprintContainer.classList.add('border-animation-wrong');
    }
  }

  removeListener() {
    const buttonsAnswer = document.querySelectorAll(Selector.ButtonVariant) as NodeListOf<HTMLButtonElement>;
    buttonsAnswer.forEach((item) => {
      const temp = item;
      temp.disabled = true;
    });
  }

  addVisibleButtons() {
    const buttonsAnswer = document.querySelectorAll(Selector.ButtonVariant) as NodeListOf<HTMLButtonElement>;
    buttonsAnswer.forEach((item) => {
      const temp = item;
      temp.disabled = false;
    });
  }

  showToastMessage() {
    const toastHTML = `<span>Не найдены слова для изучения</span>`;
    M.toast({ html: toastHTML });
    const toast = document.querySelector(TOAST) as HTMLElement;
    toast.style.backgroundColor = 'red';
  }

  renderTime(time: number) {
    const timeContainer = document.querySelector(Selector.Timer) as HTMLDivElement;
    if (timeContainer) {
      timeContainer.innerHTML = `${time}`;
    }
  }

  renderScore(score: number, points: number) {
    const scoreContainer = document.querySelector(Selector.Score) as HTMLDivElement;
    if (scoreContainer) {
      scoreContainer.innerHTML = `${score}`;
    }
    const pointsSpan = document.querySelector(Selector.CountPoints) as HTMLSpanElement;
    if (pointsSpan) {
      pointsSpan.innerHTML = `${points}`;
    }
  }

  showCorrectCircle(id: string) {
    const correctCircle = document.querySelector(`#circle${id}`) as HTMLDivElement;
    if (correctCircle) {
      correctCircle.classList.add('correct-circle');
      correctCircle.innerHTML = '&#10003;';
    }
  }

  clearCircles() {
    const allCircles = document.querySelectorAll(Selector.AnswerCircle) as NodeListOf<HTMLDivElement>;
    allCircles.forEach((item) => {
      item.classList.remove('correct-circle');
      const circle = item;
      circle.innerHTML = '';
    });
  }

  pageStructure() {
    return `
    <div class="game-tools-container">
    <div class="timer">60</div>
    <div class="score">0</div>
    <div class="cross-container">X</div>
  </div>
  <div class="sprint-container">
    <div class="header-game">
      <div class="answer-circle-container">
        <div class="answer-circle" id="circle1"></div>
        <div class="answer-circle" id="circle2"></div>
        <div class="answer-circle" id="circle3"></div>
        <p class="text-points">+<span class="count-points">10</span> очков за слово</p>
      </div>
      <div class="audio-image-container">
        <img src="./assets/play.svg" alt="audio-image" class="sprint-audio-icon">
      </div>
    </div>
    <div class="main-game">
      <div class="study-sprint-container">
        <div class="word-container">
          <p class="text-word">Word</p>
          <p class="text-translate">translate</p>
        </div>
      </div>
      <div class="variants-sprint-container">
        <button class="no-variant button-variant" id="ArrowLeft">
          <p class="sprint-text-variant">&larr; Неверно</p>
        </button>
        <button class="yes-variant button-variant" id="ArrowRight">
          <p class="sprint-text-variant">Верно &rarr;</p>
        </button>
      </div>
    </div>
  </div>
    `;
  }

  nextWordStructure() {
    return `
      <div class="study-sprint-container">
        <div class="word-container">
          <p class="text-word">Word</p>
          <p class="text-translate">translate</p>
        </div>
      </div>
      <div class="variants-sprint-container">
        <button class="no-variant button-variant" id="ArrowLeft">
          <p class="sprint-text-variant">&larr; Неверно</p>
        </button>
        <button class="yes-variant button-variant" id="ArrowRight">
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

  addPreloader() {
    const preloaderTemplate = `
    <div class="spinner-layer spinner-blue">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
    </div>

    <div class="spinner-layer spinner-yellow">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer spinner-red">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
    `;
    this.container = document.querySelector(Selector.MainWrapper) as HTMLElement;
    const preloader = document.createElement('div');
    preloader.className = 'preloader-wrapper big active';
    preloader.innerHTML = preloaderTemplate;
    this.container.append(preloader);
  }
}

export default SprintView;
