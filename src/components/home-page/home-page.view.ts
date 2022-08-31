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
    <div class="home-page">
      <div class="home-page__title">
        <h3 class="home-page__quote-1 grey-text text-darken-4"><span class="dont">Don't</span> be an <span class="alien">alien</span> in a foreign country</h3>
        <p class="home-page__quote-2 grey-text text-darken-4">Не будь инопланетянином в чужой стране</p>
      </div>
      <img class="home-page__image" src="./assets/home-page.svg" alt="home page">
    </div>
    `;
  }
}

export default HomePageView;
