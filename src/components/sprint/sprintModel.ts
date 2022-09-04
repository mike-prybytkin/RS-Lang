import UserService from '../../service/user-service/user-service';
import { IUserService } from '../../service/user-service/types';
import { ISprintModel } from './types';
import { WordType, IWordsService, Answer } from '../../service/words-service/types';
import WordsService from '../../service/words-service/words-service';
import { LEARNED_FILTER } from '../../constants/constants';

class SprintModel implements ISprintModel {
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
    this.countLearnWords = 600;
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
      const allWordsResponse = Array.from({ length: 30 }, (_it, index) => this.wordsService.getWords(group, index));
      const allWords = (await Promise.all(allWordsResponse).then((value) =>
        value.filter((item) => !!item)
      )) as WordType[][];
      allWords.forEach((item) => {
        this.variantsWords = this.variantsWords.concat(item);
      });
      const deficit = allWords
        .filter((item) => item[0].page < pageNumber - 1)
        .sort((a, b) => b[0].page - a[0].page)
        .map((item) => item.sort(() => Math.random() - 0.5));
      deficit.forEach((item) => {
        this.learnWords = this.learnWords.concat(item);
      });
    } else {
      const filter = this.createFilterLearned(pageNumber - 1);
      const aggregatedWords = await this.userService.getAggregatedWords(group, this.wordsPerPage, filter);
      if (aggregatedWords) {
        this.learnWords = aggregatedWords[0].paginatedResults.sort(() => Math.random() - 0.5);
        if (this.learnWords.length < this.countLearnWords) await this.increaseAggregatedWords(group, pageNumber);
      }
      const dataVariant = await this.userService.getAggregatedWords(group, 600);
      if (dataVariant) {
        this.variantsWords = dataVariant[0].paginatedResults.sort(() => Math.random() - 0.5);
      }
    }
  }

  hasToken() {
    return this.userService.token;
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
    if (!this.hasToken()) {
      const allWordsResponse = Array.from({ length: 30 }, (_it, index) => this.wordsService.getWords(group, index));
      const allWords = (await Promise.all(allWordsResponse).then((value) =>
        value.filter((item) => !!item)
      )) as WordType[][];
      allWords.forEach((item) => {
        this.variantsWords = this.variantsWords.concat(item).sort(() => Math.random() - 0.5);
        this.learnWords = this.variantsWords;
      });
    } else {
      const allWords = await this.userService.getAggregatedWords(group, this.countLearnWords);
      if (allWords) {
        this.variantsWords = allWords[0].paginatedResults.sort(() => Math.random() - 0.5);
        this.learnWords = this.variantsWords;
      }
    }
    this.variantsWords.sort(() => Math.random() - 0.5);
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

  getWordsPage(page: number) {
    let randomVariantIndex = this.getRandomInteger(0, 598);
    while (this.learnWords[page].word === this.variantsWords[randomVariantIndex].word) {
      randomVariantIndex = this.getRandomInteger(0, 598);
    }
    return [this.learnWords[page]].concat(this.variantsWords[randomVariantIndex]);
  }

  updateStatistic(word: WordType, answer: Answer) {
    const wordStatistic = word;
    wordStatistic.answer = answer;
    this.statistic.push(wordStatistic);
    console.log(this.statistic);
  }
}

export default SprintModel;
