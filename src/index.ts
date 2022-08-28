import './style/index.scss';
import AppController from './components/app/app.controller';
// import PopUpController from './components/pop-up/pop-up.controller';

const app = new AppController();
app.initApp();

// const aaa = new PopUpController();
// const a = aaa.registrationUser({ email: 'Gаgddddd@mail.ru', password: '12345678', name: 'Mikkkke' });
// a.then((res) => {
//   if (res) {
//     console.log('вы зареганы!');
//     console.log(res);
//   } else {
//     console.log('уже существует');
//   }
// });
