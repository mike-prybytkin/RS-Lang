import TextbookView from './textbook.view';
// import { WordType } from '../../service/words-service/types';
import TextbookModel from './textbook.model';
import UserService from '../../service/user-service/user-service';
import AudioCallController from '../audio-call/audioCallController';
import SprintController from '../sprint/sprintController';

class TextbookController {
  private textbookView;

  private textbookModel;

  private userService = new UserService();

  audiocall!: AudioCallController;

  sprint!: SprintController;

  constructor() {
    this.textbookView = new TextbookView();
    this.textbookModel = new TextbookModel();
  }

  in() {
    const text = document.querySelectorAll('.textbook');
    text.forEach((txt) => {
      (txt as HTMLElement).addEventListener('click', () => {
        this.init();
      });
    });
  }

  init() {
    this.textbookView.renderBaseStructure();
    this.textbookView.initializeGroupDropdown(6);
    this.textbookView.initializePageDropdown(30);
    this.changeGroup();
    this.changePage();
    this.nextPage();
    this.prevPage();
    this.textbookView.updatePage(
      this.textbookModel.currGroup,
      this.textbookModel.currPage,
      this.textbookModel.getWords(this.textbookModel.currGroup, this.textbookModel.currPage)
    );
    (document.querySelector('.game__btn-audiocall') as HTMLElement).addEventListener('click', () => {
      this.audiocall.start(this.getGroup(), this.getPage() + 1);
    });
    (document.querySelector('.game__btn-sprint') as HTMLElement).addEventListener('click', () => {
      this.sprint.start(this.getGroup(), this.getPage() + 1);
    });
  }

  getGroup() {
    return this.textbookModel.currGroup;
  }

  getPage() {
    return this.textbookModel.currPage;
  }

  private nextPage() {
    const nextPage = document.querySelector('.next-btn') as HTMLElement;
    nextPage.addEventListener('click', () => {
      if (this.textbookModel.currPage < this.textbookModel.maxPage) {
        this.textbookModel.currPage += 1;
        this.textbookView.updatePage(
          this.textbookModel.currGroup,
          this.textbookModel.currPage,
          this.textbookModel.getWords(this.textbookModel.currGroup, this.textbookModel.currPage)
        );
      }
    });
  }

  private prevPage() {
    const prevPage = document.querySelector('.prev-btn') as HTMLElement;
    prevPage.addEventListener('click', () => {
      if (this.textbookModel.currPage > this.textbookModel.minPage) {
        this.textbookModel.currPage -= 1;
        this.textbookView.updatePage(
          this.textbookModel.currGroup,
          this.textbookModel.currPage,
          this.textbookModel.getWords(this.textbookModel.currGroup, this.textbookModel.currPage)
        );
      }
    });
  }

  private changeGroup() {
    const groupDropdown = document.querySelectorAll('.group__item');
    groupDropdown.forEach((item) => {
      item.addEventListener('click', () => {
        this.textbookModel.currGroup = Number(item.textContent?.split(' ')[1]) - 1;
        this.textbookModel.currPage = 0;
        this.textbookView.updatePage(
          this.textbookModel.currGroup,
          this.textbookModel.currPage,
          this.textbookModel.getWords(this.textbookModel.currGroup, this.textbookModel.currPage)
        );
      });
    });
    if (this.textbookView.user) {
      const groupDifficultWords = document.querySelector('.group__item_difficult');
      (groupDifficultWords as HTMLElement).addEventListener('click', async () => {
        this.textbookView.renderDifficultPage(await this.textbookModel.getWordsFromDifficult());
        this.textbookView.changeControlsCaptionForDifficult();
      });
    }
  }

  private changePage() {
    const pageDropdown = document.querySelectorAll('.page__item');
    pageDropdown.forEach((item) => {
      item.addEventListener('click', () => {
        this.textbookModel.currPage = Number(item.textContent?.split(' ')[1]) - 1;
        this.textbookView.updatePage(
          this.textbookModel.currGroup,
          this.textbookModel.currPage,
          this.textbookModel.getWords(this.textbookModel.currGroup, this.textbookModel.currPage)
        );
      });
    });
  }
}

export default TextbookController;
