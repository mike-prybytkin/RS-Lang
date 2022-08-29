import { WordType } from '../../service/words-service/types';
import WordsService from '../../service/words-service/words-service';

class TextbookModel {
  private wordsService;

  public currPage = 0;

  public currGroup = 0;

  public minPage = 0;

  public maxPage = 29;

  constructor() {
    this.wordsService = new WordsService();
  }

  async getWords(group = 0, page = 0): Promise<WordType[]> {
    return (await this.wordsService.getWords(group, page)) as WordType[];
  }
}

export default TextbookModel;
