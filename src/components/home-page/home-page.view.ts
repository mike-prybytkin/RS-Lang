import { MAIN_WRAPPER, SWITCH_TO_HOME_PAGE } from '../../constants/constants';
import { IHomePageView, RenderHomePageHendler } from './types';

class HomePageView implements IHomePageView {
  listnerLogoButton(hendler: RenderHomePageHendler) {
    document.addEventListener('DOMContentLoaded', () => {
      const logoButton = document.querySelector(SWITCH_TO_HOME_PAGE) as HTMLElement;
      logoButton.addEventListener('click', () => {
        hendler();
      });
    });
  }

  renderHomePage() {
    const mainWrapperTag = document.querySelector(MAIN_WRAPPER) as HTMLElement;
    mainWrapperTag.innerHTML = this.homePageTemplate();
  }

  homePageTemplate() {
    return `
    <div class="home-page-wrapper">
      <div class="home-page">
        <div class="home-page__title">
          <h3 class="home-page__quote-1"><span class="dont">Don't</span> be an <span class="alien">alien</span> in a foreign country</h3>
          <p class="home-page__quote-2">Не будь инопланетянином в чужой стране</p>
        </div>
        <img class="home-page__image" src="./assets/home-page.svg" alt="home page">
      </div>
      <div class="home-page-advantages">
        <h5 class="home-page-advantages__quote">Всё, для вашего удобства</h5>
        <ul class="advantages-list">
          <li class="advantages-item">4000 слов</li>
          <li class="advantages-item">2 мини-игры</li>
          <li class="advantages-item">Статистика обучения</li>
          <li class="advantages-item">Пользовательские настройки</li>
        </ul>
    </div>
    `;
  }
}

export default HomePageView;
