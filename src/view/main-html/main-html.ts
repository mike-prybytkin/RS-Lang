import { BODY } from '../../constants/constants';

class ViewHtml {
  initViewHtml() {
    this.initStartPage();
    this.initMaterializeCss();
  }

  private initStartPage() {
    const body = document.querySelector(BODY) as HTMLElement;
    body.innerHTML = this.pageStructure();
  }

  private initMaterializeCss() {
    M.AutoInit();
  }

  private pageStructure() {
    return `
    <header class="header">
      <nav>
        <div class="nav-wrapper red lighten-5">
          <a href="#!" class="brand-logo grey-text text-darken-4"><img class="hide-on-small-only school-logo"
              src="./assets/rs-lang-logo.svg" alt="rs lang logo" title="RS Lang">RS-Lang</a>
          <a class="right deep-orange darken-1 waves-effect waves-light btn login-button"><i
              class="material-icons left">account_box</i>Log in</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i
              class="material-icons grey-text text-darken-4">menu</i></a>
          <ul class="nav-items right hide-on-med-and-down">
            <li><a class="grey-text text-darken-4 textbook" href="#">Учебник</a></li>
            <li><a class="grey-text text-darken-4 dictionary" href="#">Словарь</a></li>
            <li><a class="grey-text text-darken-4 games" href="#">Игры</a></li>
            <li><a class="grey-text text-darken-4 statistic" href="#">Статистика</a></li>
            <li><a class="grey-text text-darken-4 about" href="#">О проекте</a></li>
          </ul>
        </div>
      </nav>
      <ul class="sidenav sidenav-close" id="mobile-demo">
        <li><a class="textbook" href="#"><i class="material-icons">book</i>Учебник</a></li>
        <li><a class="dictionary" href="#"><i class="material-icons">description</i>Словарь</a></li>
        <li><a class="games" href="#"><i class="material-icons">games</i>Игры</a></li>
        <li><a class="statistic" href="#"><i class="material-icons">assessment</i>Статистика</a></li>
        <li><a class="about" href="#"><i class="material-icons">business_center</i>О проекте</a></li>
        <li><img class="hide-on-med-only mobile-school-logo" src="./assets/rs-lang-logo.svg" alt="rs lang logo"
            title="RS Lang"></a></li>
      </ul>
    </header>

    <main class="main">
      <div class="main-wrapper">
        <div class="home-page">
          <h3 class="home-page__quote-1 grey-text text-darken-4"><span class="dont">Don't</span> be an <span class="alien">alien</span> in a foreign country</h3>
          <p class="home-page__quote-2">Не будь инопланетянином в чужой стране</p>
        </div>
        <img class="home-page__image" src="./assets/home-page.svg" alt="home page">
      </div>
    </main>

    <footer class="footer">
      <div class="footer-wrapper footer-copyright grey-text text-darken-4">
        <div class="school-link-block">
          <span>© 2022</span>
          <a href="https://rs.school/" target="_blank"><img class="rss_logo" src="./assets/rss_logo.svg"
              alt="RS school logo"></a>
        </div>
        <div class="team-links">
          <span></span>
          <img class="github-logo" src="./assets/github-logo.png" alt="github logo">
          <a class="grey-text text-darken-4 right" href="https://github.com/ilya2502" target="_blank">Илья</a>
          <a class="grey-text text-darken-4 right" href="https://github.com/vitaliksamusenko" target="_blank">Виталий</a>
          <a class="grey-text text-darken-4 right" href="https://github.com/mike-prybytkin" target="_blank">Михаил</a>
        </div>
      </div>
    </footer>
    `;
  }
}

export default ViewHtml;
