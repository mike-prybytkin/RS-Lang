import './style/index.scss';
import AppController from './components/app/app.controller';
import TextbookController from './components/textbook/textbook.controller';
// import TextbookView from './components/textbook/textbook.view';

const app = new AppController();
app.initApp();
const tbController = new TextbookController();
const text = document.querySelector('.textbook');
// tbController.init();
(text as HTMLElement).addEventListener('click', () => {
  tbController.init();
});
