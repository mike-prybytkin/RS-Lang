import AudioCallModel from '../audio-call-model/audioCallModel';
// import { AudioCallView } from '../audio-call-view/audioCallView';
import { IAudioCallController } from './types';
// import { WordType } from '../../../service/words-service/types';

class AudioCallController implements IAudioCallController {
  // view: AudioCallView;
  model: AudioCallModel;

  gamePage: number;

  constructor() {
    // this.view = new AudioCallView();
    this.model = new AudioCallModel();
    this.gamePage = 0;
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
    // !!!!отрисовываем первую страницу игры через this.view.renderPage(this.gamePage, wordsPage)

    // !!!! вешаем листнеры
  }
}

export default AudioCallController;
