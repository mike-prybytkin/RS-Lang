import UserService from '../../service/user-service/user-service';
import { IUserService } from '../../service/user-service/types';
import { IAudioCallModel } from './types';
import { WordType, IWordsService, Answer } from '../../service/words-service/types';
import WordsService from '../../service/words-service/words-service';

class AudioCallModel implements IAudioCallModel {
  words: WordType[];

  userService: IUserService;

  wordsService: IWordsService;

  countWords: number;

  countVariantsAnswers: number;

  statistic!: WordType[];

  constructor() {
    this.words = [];
    this.userService = new UserService();
    this.wordsService = new WordsService();
    this.countWords = 10;
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
    if (group + 1) {
      // кейс для незареганного юзера
      const data = await this.wordsService.getWords(group, pageNumber);
      if (data) this.words = data.sort(() => Math.random() - 0.5);
    }
    console.log(this.words);
  }

  async getWordsFromMenu(group: number) {
    // const data = await this.service.getAggregatedWords(group, this.countWords);
    // if (data) {
    //   this.words = data[0].paginatedResults;
    // }
    // const data = await this.wordsService.getWords(group, randomPage);
    // console.log(data);
    const randomPage = this.getRandomInteger(0, 28);
    const randomWords = [
      this.wordsService.getWords(group, randomPage),
      this.wordsService.getWords(group, randomPage + 1),
    ];
    await Promise.all(randomWords).then((value) => {
      if (value[0] && value[1]) {
        this.words = value[0].concat(value[1]).sort(() => Math.random() - 0.5);
      }
    });
    console.log(this.words);
  }

  getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWordsPage(page: number) {
    console.log(this.words[page].word, page);
    let randomIndexVariantAnswer = this.getRandomInteger(0, 18);
    while (randomIndexVariantAnswer === page || randomIndexVariantAnswer + 1 === page) {
      randomIndexVariantAnswer = this.getRandomInteger(0, 18);
    }
    return [this.words[page]].concat(this.words.slice(randomIndexVariantAnswer, randomIndexVariantAnswer + 2));
  }

  updateStatistic(word: WordType, answer: Answer) {
    const wordStatistic = word;
    wordStatistic.answer = answer;
    this.statistic.push(wordStatistic);
    console.log(this.statistic);
  }
}

export default AudioCallModel;
