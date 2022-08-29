import TextbookView from './textbook.view';
import { WordType } from '../../service/words-service/types';
import TextbookModel from './textbook.model';

class TextbookController {
  private textbookView;

  private textbooksModel;

  constructor() {
    this.textbookView = new TextbookView();
    this.textbooksModel = new TextbookModel();
  }

  init() {
    this.textbookView.renderBaseStructure();
    this.textbookView.renderPage(this.getWords());
    this.textbookView.initializeDropdown();
    this.changeGroup();
    this.nextPage();
    this.prevPage();
  }

  private getWords(group = 0, page = 0): Promise<WordType[]> {
    return this.textbooksModel.getWords(group, page) as Promise<WordType[]>;
  }

  private nextPage() {
    const nextPage = document.querySelector('.next-btn') as HTMLElement;
    nextPage.addEventListener('click', () => {
      if (this.textbooksModel.currPage < this.textbooksModel.maxPage) {
        this.textbooksModel.currPage += 1;
        this.textbookView.updatePage(
          this.textbooksModel.currGroup,
          this.textbooksModel.currPage,
          this.getWords(this.textbooksModel.currGroup, this.textbooksModel.currPage)
        );
      }
    });
  }

  private prevPage() {
    const prevPage = document.querySelector('.prev-btn') as HTMLElement;
    prevPage.addEventListener('click', () => {
      if (this.textbooksModel.currPage > this.textbooksModel.minPage) {
        this.textbooksModel.currPage -= 1;
        this.textbookView.updatePage(
          this.textbooksModel.currGroup,
          this.textbooksModel.currPage,
          this.getWords(this.textbooksModel.currGroup, this.textbooksModel.currPage)
        );
      }
    });
  }

  private changeGroup() {
    const groupDropdown = document.querySelectorAll('.group');
    groupDropdown.forEach((item) => {
      item.addEventListener('click', () => {
        console.log(item.textContent?.split(' ')[1]);
        this.textbooksModel.currGroup = Number(item.textContent?.split(' ')[1]) - 1;
        this.textbooksModel.currPage = 0;
        this.textbookView.updatePage(
          this.textbooksModel.currGroup,
          this.textbooksModel.currPage,
          this.getWords(this.textbooksModel.currGroup, this.textbooksModel.currPage)
        );
      });
    });
  }
}

export default TextbookController;
