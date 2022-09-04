import SprintModel from './sprintModel';
import SprintView from './sprintView';
import { ISprintController } from './types';
import { WordType } from '../../service/words-service/types';

class SprintController implements ISprintController {
  view: SprintView;

  model: SprintModel;

  gamePage: number;

  audioGame: HTMLAudioElement;

  audioWord: HTMLAudioElement;

  audioTimer: HTMLAudioElement;

  audioFinal: HTMLAudioElement;

  correctWord!: WordType;

  group!: number;

  pageNumber!: number;

  countPages: number;

  time: number;

  timerId!: NodeJS.Timer;

  commonScore: number;

  answerPoints: number;

  countCorrectAnswer: number;

  isPause: boolean;

  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.gamePage = 0;
    this.countPages = 0;
    this.audioGame = new Audio();
    this.audioWord = new Audio();
    this.audioTimer = new Audio();
    this.audioFinal = new Audio();
    this.audioTimer.src = '../../assets/audio/timer.mp3';
    this.audioFinal.src = '../../assets/audio/final.mp3';
    this.time = 60;
    this.commonScore = 0;
    this.answerPoints = 10;
    this.countCorrectAnswer = 0;
    this.view.addKeyDownListener(this.checkAnswer, this.toggleAudio);
    this.isPause = false;
  }

  init = () => {
    this.view.renderStartPage();
    this.view.addStartListeners(this.runStart);
  };

  runStart = (event: Event) => {
    const buttonLevel = event.currentTarget as HTMLButtonElement;
    const group = +buttonLevel.id.slice(-1) - 1;
    this.start(group);
  };

  async start(group: number, pageNumber?: number) {
    this.group = group;
    if (pageNumber) this.pageNumber = pageNumber;
    this.gamePage = 0;
    await this.model.getWords(group, pageNumber);
    this.countPages = this.model.learnWords.length;
    if (this.countPages) {
      this.createPage();
    } else {
      this.view.showToastMessage();
    }
  }

  createPage() {
    const wordsPage = this.model.getWordsPage(this.gamePage);
    [this.correctWord] = wordsPage;
    wordsPage.sort(() => Math.random() - 0.5);
    const correctIndex = wordsPage.findIndex((item) => item.word === this.correctWord.word);
    this.addSourceAudio(wordsPage[correctIndex].audio);
    this.view.renderGamePage(correctIndex, wordsPage);
    this.view.addAudioListener(this.playAudio);
    this.view.addAnswerListener(this.checkAnswer);
    this.view.addTimerListener(this.toggleAudio);
    this.time = 60;
    this.timerId = setInterval(this.changeTime, 1000);
  }

  nextWord() {
    const wordsPage = this.model.getWordsPage(this.gamePage);
    [this.correctWord] = wordsPage;
    wordsPage.sort(() => Math.random() - 0.5);
    const correctIndex = wordsPage.findIndex((item) => item.word === this.correctWord.word);
    this.addSourceAudio(wordsPage[correctIndex].audio);
    this.view.renderNextWord(correctIndex, wordsPage);
    this.view.addAudioListener(this.playAudio);
    this.view.addAnswerListener(this.checkAnswer);
  }

  addSourceAudio(endpoint: string) {
    this.audioWord.src = `${this.view.baseUrl}/${endpoint}`;
  }

  playAudio = (element: HTMLImageElement) => {
    const elementNewSrc = element;
    elementNewSrc.src = './assets/audio.svg';
    this.audioWord.addEventListener('ended', () => {
      const image = element;
      image.src = './assets/play.svg';
    });
    this.audioWord.play();
  };

  checkAnswer = (variantAnswer: HTMLButtonElement) => {
    if (this.isPause) return;
    this.view.removeListener();
    const style = variantAnswer.classList.contains('correct') ? 'correct-answer' : 'wrong-answer';
    if (style === 'correct-answer') {
      this.audioGame.src = '../../assets/audio/piu.mp3';
      this.audioGame.play();
      this.checkCountCorrectAnswers();
      this.commonScore += this.answerPoints;
    } else {
      this.countCorrectAnswer = 0;
      this.answerPoints = 10;
      this.audioGame.src = '../../assets/audio/mistake.mp3';
      this.audioGame.play();
      this.view.clearCircles();
    }
    this.view.renderScore(this.commonScore, this.answerPoints);
    this.model.updateStatistic(this.correctWord, style);
    this.view.showCorrectAnswer(style);
    this.view.removeListener();
    this.nextPage();
  };

  checkCountCorrectAnswers() {
    if (this.countCorrectAnswer === 3) {
      this.countCorrectAnswer = 0;
      this.answerPoints *= 2;
      this.view.clearCircles();
    } else {
      this.countCorrectAnswer += 1;
      this.view.showCorrectCircle(`${this.countCorrectAnswer}`);
    }
  }

  nextPage = () => {
    if (this.gamePage < this.countPages - 1) {
      this.gamePage += 1;
      this.nextWord();
    } else {
      this.runStatistic();
    }
  };

  runStatistic = () => {
    const countMistake = this.model.statistic.filter((item) => item.answer === 'wrong-answer').length;
    const countSuccess = this.model.statistic.filter((item) => item.answer === 'correct-answer').length;
    this.view.renderStatisticPage(this.model.statistic, countMistake, countSuccess);
    this.view.addStatisticListener(this.playAgain, this.goHomePage);
  };

  playAgain = () => {
    this.init();
  };

  goHomePage = () => {
    window.location.reload(); // исправить на вызов функции, которая передаcтся при создании моего класса
  };

  changeTime = () => {
    if (!this.isPause) {
      this.time -= 1;
      this.checkTime();
    }
  };

  checkTime() {
    if (this.time < 0) {
      this.audioFinal.play();
      clearInterval(this.timerId);
      this.runStatistic();
    } else {
      this.audioTimer.play();
      this.view.renderTime(this.time);
    }
  }

  toggleAudio = () => {
    this.isPause = !this.isPause;
    let innerTimer: string;
    if (this.isPause) {
      innerTimer = '| |';
      this.view.removeListener();
    } else {
      innerTimer = `${this.time}`;
      this.view.addVisibleButtons();
    }
    this.view.renderTimer(innerTimer);
    console.log(this.isPause);
  };
}

export default SprintController;
