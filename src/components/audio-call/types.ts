import { WordType, IWordsService } from '../../service/words-service/types';
import { IUserService } from '../../service/user-service/types';

export interface IAudioCallModel {
  learnWords: WordType[];
  variantsWords: WordType[];
  userService: IUserService;
  wordsService: IWordsService;
  countLearnWords: number;
  countVariantsAnswers: number;
  wordsPerPage: number;
  statistic: WordType[];
}

export interface IAudioCallView {}
export interface IAudioCallController {
  view: IAudioCallView;
  model: IAudioCallModel;
  gamePage: number;
  audio: HTMLAudioElement;
  correctWord: WordType;
  group: number;
  pageNumber: number;
  countPages: number;
  init(): void;
}


