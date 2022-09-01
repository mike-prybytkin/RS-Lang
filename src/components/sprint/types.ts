import { WordType, IWordsService, Answer } from '../../service/words-service/types';
import { IUserService } from '../../service/user-service/types';

export interface ISprintModel {
  learnWords: WordType[];
  variantsWords: WordType[];
  userService: IUserService;
  wordsService: IWordsService;
  countLearnWords: number;
  countVariantsAnswers: number;
  wordsPerPage: number;
  statistic: WordType[];
  getWords(group: number, pageNumber: number | undefined): void;
  getWordsFromVocabulary(group: number, pageNumber: number): void;
  increaseAggregatedWords(group: number, pageNumber: number): void;
  getWordsFromMenu(group: number): void;
  getRandomInteger(min: number, max: number): number;
  createFilterLearned(pageNumber: number): string;
  createFilterPage(pageNumber: number): string;
  getWordsPage(page: number): WordType[];
  updateStatistic(word: WordType, answer: Answer): void;
}

export interface ISprintView {
  container: HTMLElement;
  hasAnswer: boolean;
  baseUrl: string;
  renderStartPage(): void;
  addStartListeners(handler: (event: Event) => void): void;
  renderGamePage(correctIndex: number, wordsPage: WordType[]): void;
  renderStatisticPage(statisticWords: WordType[], countMistake: number, countSuccess: number): void;
  renderStatisticWord(word: WordType): void;
  addKeyDownListener(checkAnswer: (variantAnswer: HTMLButtonElement) => void, addUnknownWord: () => void): void;
  getElementByKey(key: string): HTMLButtonElement;
  addAnswerListener(handler: (variantAnswer: HTMLButtonElement) => void): void;
  addStatisticListener(playAgainHandler: () => void, goMainPage: () => void): void;
  hiddenIgnorance(): void;
  addNavigationListener(handler: () => void): void;
  addIgnoranceListener(handler: () => void): void;
  showCorrectAnswer(variantAnswer: HTMLButtonElement, style: string): void;
  removeListener(): void;
  showToastMessage(): void;
  pageStructure(): string;
  statisticStructure(): string;
  startPageStructure(): string;
}

export interface ISprintController {
  view: ISprintView;
  model: ISprintModel;
  gamePage: number;
  // audio: HTMLAudioElement;
  correctWord: WordType;
  group: number;
  pageNumber: number;
  countPages: number;
  init(): void;
}


