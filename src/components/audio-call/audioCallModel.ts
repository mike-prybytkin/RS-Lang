import UserService from '../../service/user-service/user-service';
import { IUserService } from '../../service/user-service/types';
import { IAudioCallModel } from './types';
import { WordType, IWordsService, Answer } from '../../service/words-service/types';
import WordsService from '../../service/words-service/words-service';
import { LEARNED_FILTER } from '../../constants/constants';

class AudioCallModel implements IAudioCallModel {
  learnWords: WordType[];

  variantsWords: WordType[];

  userService: IUserService;

  wordsService: IWordsService;

  countLearnWords: number;

  countVariantsAnswers: number;

  wordsPerPage: number;

  statistic!: WordType[];

  constructor() {
    this.variantsWords = [];
    this.learnWords = [];
    this.userService = new UserService();
    this.wordsService = new WordsService();
    this.countLearnWords = 10;
    this.wordsPerPage = 20;
    this.countVariantsAnswers = 3;
  }

  async getWords(group: number, pageNumber: number | undefined) {
    this.statistic = [];
    this.variantsWords = [];
    if (pageNumber) {
      await this.getWordsFromVocabulary(group, pageNumber);
    } else {
      await this.getWordsFromMenu(group);
    }
  }

  async getWordsFromVocabulary(group: number, pageNumber: number) {
    if (!this.hasToken()) {
      const words = await this.wordsService.getWords(group, pageNumber - 1);
      if (words) this.learnWords = words.sort(() => Math.random() - 0.5).slice(0, this.countLearnWords);
    } else {
      const filter = this.createFilterLearned(pageNumber - 1);
      const aggregatedWords = await this.userService.getAggregatedWords(group, this.wordsPerPage, filter);
      if (aggregatedWords) {
        this.learnWords = aggregatedWords[0].paginatedResults
          .sort(() => Math.random() - 0.5)
          .slice(0, this.countLearnWords);
        if (this.learnWords.length < this.countLearnWords) await this.increaseAggregatedWords(group, pageNumber);
      }
    }
    const allWordsRequest = Array.from({ length: 30 }, (_it, index) => this.wordsService.getWords(group, index));
    const allWords = (await Promise.all(allWordsRequest).then((value) =>
      value.filter((item) => !!item)
    )) as WordType[][];
    allWords.forEach((item) => {
      this.variantsWords = this.variantsWords.concat(
        item.filter((value) => !this.learnWords.find((word) => word.word === value.word))
      );
    });
    this.variantsWords.sort(() => Math.random() - 0.5);
  }

  async increaseAggregatedWords(group: number, pageNumber: number) {
    const allAggregatedWords = await this.userService.getAggregatedWords(group, 600, LEARNED_FILTER);
    if (allAggregatedWords) {
      const restWords = allAggregatedWords[0].paginatedResults
        .filter((item) => item.page < pageNumber - 1)
        .sort((a, b) => b.page - a.page);
      const deficit = this.countLearnWords - this.learnWords.length;
      this.learnWords =
        restWords.length < deficit
          ? this.learnWords.concat(restWords)
          : this.learnWords.concat(restWords.slice(0, this.countLearnWords - this.learnWords.length));
    }
  }

  async getWordsFromMenu(group: number) {
    const randomLearnPage = this.getRandomInteger(0, 29);
    if (!this.hasToken()) {
      const randomLearnWords = await this.wordsService.getWords(group, randomLearnPage);
      if (randomLearnWords)
        this.learnWords = randomLearnWords.sort(() => Math.random() - 0.5).slice(0, this.countLearnWords);
    } else {
      const filter = this.createFilterPage(randomLearnPage);
      const randomLearnWords = await this.userService.getAggregatedWords(group, this.countLearnWords, filter);
      if (randomLearnWords)
        this.learnWords = randomLearnWords[0].paginatedResults
          .sort(() => Math.random() - 0.5)
          .slice(0, this.countLearnWords);
    }
    const allWordsRequest = Array.from({ length: 30 }, (_it, index) => this.wordsService.getWords(group, index));
    const allWords = (await Promise.all(allWordsRequest).then((value) =>
      value.filter((item) => !!item)
    )) as WordType[][];
    allWords.forEach((item) => {
      this.variantsWords = this.variantsWords.concat(
        item.filter((value) => !this.learnWords.find((word) => word.word === value.word))
      );
    });
    this.variantsWords.sort(() => Math.random() - 0.5);
  }

  hasToken() {
    return this.userService.token;
  }

  getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createFilterLearned(pageNumber: number) {
    return pageNumber
      ? encodeURIComponent(`
    {"$and":[{"page":${pageNumber}, "$or":[{"userWord":null}, {"userWord.optional.learned":false}]}]}`)
      : LEARNED_FILTER;
  }

  createFilterPage(pageNumber: number) {
    return encodeURIComponent(`{"page":${pageNumber}}`);
  }

  getWordsPage(page: number) {
    const randomIndexVariantAnswer = this.getRandomInteger(0, 588);
    return [this.learnWords[page]].concat(
      this.variantsWords.slice(randomIndexVariantAnswer, randomIndexVariantAnswer + 2)
    );
  }

  updateStatistic(word: WordType, answer: Answer) {
    const wordStatistic = word;
    wordStatistic.answer = answer;
    this.statistic.push(wordStatistic);
  }
}

export default AudioCallModel;
