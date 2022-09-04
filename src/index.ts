import './style/index.scss';
import AppController from './components/app/app.controller';
import TextbookController from './components/textbook/textbook.controller';
// import TextbookView from './components/textbook/textbook.view';

const app = new AppController();
app.initApp();
const tbController = new TextbookController();

const text = document.querySelectorAll('.textbook');
text.forEach((txt) => {
  (txt as HTMLElement).addEventListener('click', () => {
    tbController.init();
  });
});
