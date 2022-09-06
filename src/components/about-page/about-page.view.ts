import { IAboutPageView, AboutButtonHendler } from './types';
import { ABOUT_BUTTON, MAIN_WRAPPER } from '../../constants/constants';

class AboutPageView implements IAboutPageView {
  private aboutButtons!: NodeList;

  private mainWrapper!: HTMLElement;

  constructor() {
    this.aboutButtons = document.querySelectorAll(ABOUT_BUTTON) as NodeList;
    this.mainWrapper = document.querySelector(MAIN_WRAPPER) as HTMLElement;
  }

  aboutButtonsListener(handler: AboutButtonHendler) {
    for (let i = 0; i < this.aboutButtons.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      this.aboutButtons[i].addEventListener('click', () => {
        const template = handler();
        this.mainWrapper.innerHTML = template;
        const elems = document.querySelectorAll('.slider');
        M.Slider.init(elems, {});
      });
    }
  }

  aboutPageTemplate = () => {
    return `
    <h3 class="our-team-header">Наша <span class="team">команда</span></h3>
    <div class="slider">
      <ul class="slides">
        <li class="teammate-1">
          <div class="caption center-align">
            <img class="img teammate-1__image" src="./assets/team/ilya.png" alt="Ilya">
            <span class="teammate-name"><span class="name">Илья</span> Гавричков</span>
            <h5 class="contribution">Team Lead проекта.</h5>
            <h5 class="contribution">Разработчик игр Аудиовызов и Спринт.</h5>
            <h5 class="contribution">Создатель сервиса запросов на сервер.</h5>
            <p class="teammate-github ilya"><a class="center" href="https://github.com/ilya2502" target="_blank">GitHub</a></p>
          </div>
        </li>
        <li class="teammate-2">
          <div class="caption left-align">
            <img class="img teammate-2__image" src="./assets/team/mihail.jpg" alt="Mihail">
            <span class="teammate-name"><span class="name">Михаил</span> Прибыткин</span>
            <h5 class="contribution">Внешний вид приложения.</h5>
            <h5 class="contribution">Регистрация/вход пользователя.</h5>
            <h5 class="contribution">Светлая/темная темы.</h5>
            <p class="teammate-github mihail"><a class="left" href="https://github.com/mike-prybytkin" target="_blank">GitHub</a></p>
          </div>
        </li>
        <li class="teammate-3">
          <div class="caption right-align">
            <img class="img teammate-3__image" src="./assets/team/vitaliy.png" alt="Vitaliy">
            <span class="teammate-name"><span class="name">Виталий</span> Самусенко</span>
            <h5 class="contribution">Реализация электронного учебника.</h5>
            <h5 class="contribution">Отображение списка слов.</h5>
            <p class="teammate-github vitaliy"><a class="right" href="https://github.com/vitaliksamusenko" target="_blank">GitHub</a></p>
          </div>
        </li>
      </ul>
    </div>
    `;
  };
}

export default AboutPageView;
