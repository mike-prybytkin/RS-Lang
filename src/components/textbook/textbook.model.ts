import { WordType } from '../../service/words-service/types';
import WordsService from '../../service/words-service/words-service';
import UserService from '../../service/user-service/user-service';
import { UserAuthorizationType, UserWordType } from '../../service/user-service/types';
import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import TextbookView from './textbook.view';

class TextbookModel {
  private wordsService;

  private userService;

  public currPage = 0;

  public currGroup = 0;

  public minPage = 0;

  public maxPage = 29;

  private user: UserAuthorizationType;

  private localStorageService = new LocalStorageService();

  private textbookView;

  constructor() {
    this.textbookView = new TextbookView();
    this.wordsService = new WordsService();
    this.userService = new UserService();
    this.user = this.localStorageService.getItemLocalStorage('user');
  }

  async getWords(group = 0, page = 0): Promise<WordType[]> {
    return (await this.wordsService.getWords(group, page)) as WordType[];
  }

  async getUserDifficultWord() {
    return (await this.userService.getAllUserWords1(this.user.userId, this.user.token)) as UserWordType[];
  }
}

export default TextbookModel;
