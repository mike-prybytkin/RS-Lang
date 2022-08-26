import TextbookView from '../view/textbook/textbook';
import { WordType } from '../service/words-service/types';

class TextbookController {
  private textbookView;

  constructor() {
    this.textbookView = new TextbookView();
  }

  init(words: Promise<WordType[]>) {
    this.textbookView.renderPage(words);
  }
}

export default TextbookController;
