import AudioCallModel from './audioCallModel';
import AudioCallView from './audioCallView';
import { IAudioCallController } from './types';
import { WordType } from '../../service/words-service/types';

class AudioCallController implements IAudioCallController {
  view: AudioCallView;

  model: AudioCallModel;

  gamePage: number;

  audio: HTMLAudioElement;

  correctWord!: WordType;

  constructor() {
    this.view = new AudioCallView();
    this.model = new AudioCallModel();
    this.gamePage = 0;
    this.audio = new Audio();
  }

  async init(group: number, pageNumber?: number) {
    this.gamePage = 0;
    await this.model.getWords(group, pageNumber);
    this.createPage();

    // if (group && pageNumber) {
    //     this.words = this.getWordsFromVocabulary(group, pageNumber)
    // } else {
    //     this.words = this.getWordsFromHomePage()
    // }
  }

  createPage() {
    const wordsPage = this.model.getWordsPage(this.gamePage);
    console.log(wordsPage);
    const correctIndex = this.model.getRandomInteger(0, 2);
    this.correctWord = wordsPage[correctIndex];
    this.addSourceAudio(wordsPage[correctIndex].audio);
    this.view.renderGamePage(correctIndex, wordsPage);
    this.view.addAudioListener(this.playAudio);
    this.view.addAnswerListener(this.checkAnswer);
    this.view.addIgnoranceListener(this.addUnknownWord);
    this.view.addNavigationListener(this.nextPage);
  }

  addSourceAudio(endpoint: string) {
    this.audio.src = `${this.view.baseUrl}/${endpoint}`;
  }

  playAudio = (event: Event) => {
    const element = event.target as HTMLImageElement;
    element.src = './assets/audio.svg';
    this.audio.addEventListener('ended', () => {
      const image = element;
      image.src = './assets/play.svg';
    });
    this.audio.play();
  };

  checkAnswer = (event: Event) => {
    const variantAnswer = event.currentTarget as HTMLDivElement;
    const style = variantAnswer.classList.contains('correct') ? 'correct-answer' : 'wrong-answer';
    this.model.updateStatistic(this.correctWord, style);
    this.view.showCorrectAnswer(variantAnswer, style);
    this.view.removeListener(this.checkAnswer, this.playAudio);
  };

  nextPage = () => {
    if (this.gamePage < this.model.countWords - 1) {
      this.gamePage += 1;
      this.createPage();
    } else {
      console.log(this.model.statistic); // render statistic
      this.view.renderStatisticPage();
    }
    // const navigationButton = event.target as HTMLDivElement;
    // navigationButton.innerHTML = 'следующее слово';
  };

  addUnknownWord = () => {
    this.model.updateStatistic(this.correctWord, 'wrong-answer');
    this.nextPage();
  };
}

export default AudioCallController;
