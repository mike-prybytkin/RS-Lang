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
    if (pageNumber) {
      await this.getWordsFromVocabulary(group, pageNumber);
    } else {
      await this.getWordsFromMenu(group);
    }
  }

  async getWordsFromVocabulary(group: number, pageNumber: number) {
    if (this.userService.token) {
      // кейс для незареганного юзера
      const words = await this.wordsService.getWords(group, pageNumber);
      if (words) this.learnWords = words.sort(() => Math.random() - 0.5).slice(0, this.countLearnWords);
    } else {
      // кейс для зареганного юзера
      const filter = this.createFilterLearned(pageNumber - 1);
      const aggregatedWords = await this.userService.getAggregatedWords(group, this.wordsPerPage, filter);
      if (aggregatedWords) {
        this.learnWords = aggregatedWords[0].paginatedResults;
        if (this.learnWords.length < this.countLearnWords) await this.increaseAggregatedWords(group, pageNumber);
      }
    }
    const dataVariant = await this.userService.getAggregatedWords(group, 600);
    if (dataVariant) {
      this.variantsWords = dataVariant[0].paginatedResults
        .sort(() => Math.random() - 0.5)
        .slice(0, 50)
        .filter((item) => !this.learnWords.find((word) => word.word === item.word));
    }
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
    let randomVariantPage = this.getRandomInteger(0, 28);
    while (randomLearnPage === randomVariantPage) {
      randomVariantPage = this.getRandomInteger(0, 29);
    }
    if (!this.userService.token) {
      // кейс для незареганного юзера
      const randomLearnWords = await this.wordsService.getWords(group, randomLearnPage);
      if (randomLearnWords)
        this.learnWords = randomLearnWords.sort(() => Math.random() - 0.5).slice(0, this.countLearnWords);
    } else {
      // кейс для зареганного юзера
      const filter = this.createFilterPage(randomLearnPage);
      const randomLearnWords = await this.userService.getAggregatedWords(group, this.countLearnWords, filter);
      if (randomLearnWords)
        this.learnWords = randomLearnWords[0].paginatedResults
          .sort(() => Math.random() - 0.5)
          .slice(0, this.countLearnWords);
    }
    const randomWords = [
      this.wordsService.getWords(group, randomVariantPage),
      this.wordsService.getWords(group, randomVariantPage + 1),
    ];
    await Promise.all(randomWords).then((value) => {
      if (value[0] && value[1]) {
        this.variantsWords = value[0].concat(value[1]).sort(() => Math.random() - 0.5);
      }
    });
  }

  getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createFilterLearned(pageNumber: number) {
    return pageNumber
      ? `%7B%22%24and%22%3A%5B%7B%22page%22%3A${pageNumber}%2C%20%22%24or%22%3A%5B%7B%22userWord%22%3Anull%7D%2C%20%7B%22userWord.optional.learned%22%3Afalse%7D%5D%7D%5D%7D`
      : LEARNED_FILTER;
  }

  createFilterPage(pageNumber: number) {
    return `%7B%22page%22%3A${pageNumber}%7D`;
  }

  getWordsPage(page: number) {
    const randomIndexVariantAnswer = this.getRandomInteger(0, 38);
    return [this.learnWords[page]].concat(
      this.variantsWords.slice(randomIndexVariantAnswer, randomIndexVariantAnswer + 2)
    );
  }

  updateStatistic(word: WordType, answer: Answer) {
    const wordStatistic = word;
    wordStatistic.answer = answer;
    this.statistic.push(wordStatistic);
    console.log(this.statistic);
  }
}

export default AudioCallModel;
