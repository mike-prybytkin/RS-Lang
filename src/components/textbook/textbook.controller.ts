import TextbookView from './textbook.view';
// import { WordType } from '../../service/words-service/types';
import TextbookModel from './textbook.model';

class TextbookController {
  private textbookView;

  private textbookModel;

  constructor() {
    this.textbookView = new TextbookView();
    this.textbookModel = new TextbookModel();
  }

  init() {
    this.textbookView.renderBaseStructure();
    this.textbookView.renderPage(this.textbookModel.getWords());
    this.textbookView.initializeGroupDropdown(6);
    this.textbookView.initializePageDropdown(30);
    this.changeGroup();
    this.changePage();
    this.nextPage();
    this.prevPage();
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
