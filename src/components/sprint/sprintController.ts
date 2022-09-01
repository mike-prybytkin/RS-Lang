import SprintModel from './sprintModel';
import SprintView from './sprintView';
import { ISprintController /* ISprintView, ISprintModel */ } from './types';
import { WordType } from '../../service/words-service/types';

class SprintController implements ISprintController {
  view: SprintView;

  model: SprintModel;

  gamePage: number;

  // audio: HTMLAudioElement;

  correctWord!: WordType;

  group!: number;

  pageNumber!: number;

  countPages: number;

  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.gamePage = 0;
    this.countPages = 0;
    // this.audio = new Audio();
    // this.audio.addEventListener('ended', () => {
    //   this.view.changeAudioImage();
    // });
    this.view.addKeyDownListener(this.checkAnswer, this.addUnknownWord /* , this.playAudio */);
  }

  init() {
    this.view.renderStartPage();
    this.view.addStartListeners(this.runStart);
  }

  runStart = (event: Event) => {
    const buttonLevel = event.currentTarget as HTMLButtonElement;
    const group = +buttonLevel.id.slice(-1) - 1;
    this.start(group, 9);
  };

  async start(group: number, pageNumber?: number) {
    this.group = group;
    if (pageNumber) this.pageNumber = pageNumber;
    this.gamePage = 0;
    await this.model.getWords(group, pageNumber); // stay here
    this.countPages = this.model.learnWords.length;
    if (this.countPages) {
      this.createPage();
    } else {
      this.view.showToastMessage();
    }
  }

  createPage() {
    const wordsPage = this.model.getWordsPage(this.gamePage);
    console.log(wordsPage);
    [this.correctWord] = wordsPage;
    wordsPage.sort(() => Math.random() - 0.5);
    const correctIndex = wordsPage.findIndex((item) => item.id === this.correctWord.id);
    // this.addSourceAudio(wordsPage[correctIndex].audio);
    this.view.renderGamePage(correctIndex, wordsPage);
    // this.view.addAudioListener(this.playAudio);
    this.view.addAnswerListener(this.checkAnswer);
    this.view.addIgnoranceListener(this.addUnknownWord);
    this.view.addNavigationListener(this.nextPage);
  }

  // addSourceAudio(endpoint: string) {
  //   this.audio.src = `${this.view.baseUrl}/${endpoint}`;
  //   this.audio.play();
  //   this.audio.addEventListener('ended', () => {
  //     this.view.changeAudioImage();
  //   });
  // }

  // playAudio = (element: HTMLImageElement) => {
  //   const elementNewSrc = element;
  //   elementNewSrc.src = './assets/audio.svg';
  //   this.audio.addEventListener('ended', () => {
  //     const image = element;
  //     image.src = './assets/play.svg';
  //   });
  //   this.audio.play();
  // };

  checkAnswer = (variantAnswer: HTMLButtonElement) => {
    const style = variantAnswer.classList.contains('correct') ? 'correct-answer' : 'wrong-answer';
    this.view.hasAnswer = true;
    this.model.updateStatistic(this.correctWord, style);
    this.view.hiddenIgnorance();
    this.view.showCorrectAnswer(variantAnswer, style);
    this.view.removeListener();
  };

  nextPage = () => {
    if (this.gamePage < this.countPages - 1) {
      this.gamePage += 1;
      this.createPage();
    } else {
      const countMistake = this.model.statistic.filter((item) => item.answer === 'wrong-answer').length;
      const countSuccess = this.model.statistic.filter((item) => item.answer === 'correct-answer').length;
      this.view.renderStatisticPage(this.model.statistic, countMistake, countSuccess);
      this.view.addStatisticListener(this.playAgain, this.goHomePage);
    }
  };

  addUnknownWord = () => {
    if (!this.view.hasAnswer) {
      this.model.updateStatistic(this.correctWord, 'wrong-answer');
    }
    this.nextPage();
  };

  playAgain = () => {
    this.init();
  };

  goHomePage = () => {
    window.location.reload(); // исправить на вызов функции, которая передасться при создании моего класса
  };
}

export default SprintController;
