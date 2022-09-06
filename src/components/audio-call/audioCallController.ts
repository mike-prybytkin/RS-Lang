import AudioCallModel from './audioCallModel';
import AudioCallView from './audioCallView';
import { IAudioCallController } from './types';
import { WordType, Answer } from '../../service/words-service/types';
import { OptionalType } from '../../service/user-service/types';

class AudioCallController implements IAudioCallController {
  view: AudioCallView;

  model: AudioCallModel;

  gamePage: number;

  audio: HTMLAudioElement;

  correctWord!: WordType;

  group!: number;

  pageNumber!: number;

  countPages: number;

  renderHomePage: () => void;

  constructor(renderHomePage: () => void) {
    this.view = new AudioCallView();
    this.model = new AudioCallModel();
    this.gamePage = 0;
    this.countPages = 0;
    this.audio = new Audio();
    this.audio.addEventListener('ended', () => {
      this.view.changeAudioImage();
    });
    this.view.addKeyDownListener(this.checkAnswer, this.addUnknownWord, this.playAudio);
    this.renderHomePage = renderHomePage;
  }

  init = () => {
    this.view.renderStartPage();
    this.view.addStartListeners(this.runStart);
  };

  runStart = (event: Event) => {
    this.view.addPreloader();
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
    const correctIndex = wordsPage.findIndex((item) => item.id === this.correctWord.id);
    this.addSourceAudio(wordsPage[correctIndex].audio);
    this.view.renderGamePage(correctIndex, wordsPage);
    this.view.addAudioListener(this.playAudio);
    this.view.addAnswerListener(this.checkAnswer);
    this.view.addIgnoranceListener(this.addUnknownWord);
    this.view.addNavigationListener(this.nextPage);
  }

  addSourceAudio(endpoint: string) {
    this.audio.src = `${this.view.baseUrl}/${endpoint}`;
    this.audio.play();
    this.audio.addEventListener('ended', () => {
      this.view.changeAudioImage();
    });
  }

  playAudio = (element: HTMLImageElement) => {
    const elementNewSrc = element;
    elementNewSrc.src = './assets/audio.svg';
    this.audio.addEventListener('ended', () => {
      const image = element;
      image.src = './assets/play.svg';
    });
    this.audio.play();
  };

  checkAnswer = (variantAnswer: HTMLButtonElement) => {
    const style = variantAnswer.classList.contains('correct') ? 'correct-answer' : 'wrong-answer';
    this.view.hasAnswer = true;
    this.model.updateStatistic(this.correctWord, style);
    this.view.hiddenIgnorance();
    this.view.showCorrectAnswer(variantAnswer, style);
    this.view.removeListener();
    this.updateUserWord(this.correctWord, style);
  };

  async updateUserWord(word: WordType, style: Answer) {
    let id: '_id' | 'id';
    if (this.model.userService.token) {
      id = '_id';
    } else {
      id = 'id';
      return;
    }
    const userWord = await this.model.userService.getUserWord(word[id]);
    if (userWord) {
      const difficultyProperty = userWord.difficulty;
      const optionalProperty = userWord.optional;
      const body = this.updateOptional(difficultyProperty, optionalProperty, style);
      this.model.userService.updateUserWord(word[id], body.difficultyProperty, body.optional);
    } else {
      const optional = this.createOptionalNewUserWord(style);
      this.model.userService.createNewUserWord(word[id], optional);
    }
  }

  updateOptional(difficultyProperty: string, optionalProperty: OptionalType, style: Answer) {
    const optional = optionalProperty;
    if (style === 'wrong-answer') {
      optional.learned = false;
      optional.successAnswersSequence = 0;
      optional.wrongAttempt += 1;
      return { difficultyProperty, optional };
    }
    if (difficultyProperty === 'false' && optionalProperty.successAnswersSequence === 2) {
      optional.learned = true;
      optional.successAnswersSequence = 3;
      optional.successAttempt += 1;
      return { difficultyProperty, optional };
    }
    if (difficultyProperty === 'true' && optionalProperty.successAnswersSequence === 4) {
      optional.learned = true;
      optional.successAnswersSequence = 5;
      optional.successAttempt += 1;
      return { difficultyProperty: 'false', optional };
    }
    optional.successAnswersSequence += 1;
    optional.successAttempt += 1;
    return { difficultyProperty, optional };
  }

  createOptionalNewUserWord(style: Answer) {
    if (style === 'correct-answer') {
      return {
        learned: false,
        successAnswersSequence: 1,
        successAttempt: 1,
        wrongAttempt: 0,
      };
    }
    return {
      learned: false,
      successAnswersSequence: 0,
      successAttempt: 0,
      wrongAttempt: 1,
    };
  }

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
    this.renderHomePage();
  };
}

export default AudioCallController;
