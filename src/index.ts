import './style/index.scss';
import AppController from './components/app/app';
import AudioCallController from './components/audio-call/audioCallController';

const app = new AppController();
app.initApp();
const audioCall = new AudioCallController();

async function example() {
  //   wordTest.getWords(3, 3);
  //   wordTest.getWordById('5e9f5ee35eb9e72bc21afbed');
  // await userTest.createUser('fake@mail.ru', '12345678', 'Ilya');
  //   await userTest.loginUser('fake@mail.ru', '12345678');
  await audioCall.model.userService.loginUser('fake@mail.ru', '12345678');
  audioCall.init();
  // await userTest.getUser();
  // await userTest.updateUser('fake@mail.ru', '12345678', 'vasya');
  // await userTest.updateUser('fake@mail.ru', '12345678', 'Ilya');
  //   await userTest.getUser();
  // await userTest.deleteUser();
  // await userTest.getNewUserTokens();
  // await userTest.getUser();
  // const data = await userTest.getAllUserWords();
  // await userTest.updateUserWord(data![0].wordId, 'true', {
  //   learned: true,
  //   correctAnswersSuccessively: 5,
  //   attempts: 5,
  // });
  // await userTest.getUserWord('5e9f5ee35eb9e72bc21afbed');
  // await userTest.getAllUserWords();
  // await userTest.deleteUserWord(data![0].wordId);
  // await userTest.getAggregatedWords(
  //   3,
  //   20,
  //   'filter=%7B%22%24and%22%3A%5B%7B%22page%22%3A3%2C%20%22userWord.difficulty%22%3A%22true%22%7D%5D%7D'
  // ); // {"$and":[{"page":3, "userWord.difficulty":"true"}]};
  //   await userTest.getAggregatedWord('5e9f5ee35eb9e72bc21afbed');
}
example();
