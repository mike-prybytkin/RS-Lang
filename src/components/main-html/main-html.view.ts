import { BODY } from '../../constants/constants';

class MainHtmlView {
  initMainHtmlView() {
    this.initStartPage();
    this.initMaterializeCss();
  }

  bindOnloadBody() {
    window.onload = () => {
      this.initMainHtmlView();
    };
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
          <a href="#modal-log-in" class="modal-trigger right deep-orange darken-1 waves-effect waves-light btn login-button"><i class="material-icons left">account_box</i>Вход</a>
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

      <div id="modal-log-in" class="modal">
        <div class="modal-content">
          <ul class="tabs center">
            <li class="tab tab-modal"><a class="active" href="#log-in-swipe">Вход</a></li>
            <li class="tab tab-modal"><a href="#registration-swipe">Регистрация</a></li>
          </ul>

          <div id="log-in-swipe" class="center">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input id="email-log-in" type="email" class="validate">
              <label for="email-log-in">Email</label>
              <span class="helper-text" data-error="invalid email" data-success="perfectly"></span>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock_open</i>
              <input id="password-log-in" type="password" minlength="4" class="validate">
              <label for="password-log-in">Password</label>
              <span class="helper-text" data-error="invalid password" data-success="perfectly"></span>
            </div>
            <a href="#" class="modal-close center log-in-button deep-orange darken-1 waves-effect waves-light btn">Вход</a>
          </div>

          <div id="registration-swipe" class="center">
            <div class="input-field">
              <i class="material-icons prefix">account_circle</i>
              <input id="user_name" type="text" minlength="4" class="validate">
              <label for="user_name">Name</label>
              <span class="helper-text" data-error="invalid name" data-success="perfectly"></span>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input id="email-registration" type="email" class="validate">
              <label for="email-registration">Email</label>
              <span class="helper-text" data-error="invalid email" data-success="perfectly"></span>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock_open</i>
              <input id="password-registration" type="password" minlength="4" class="validate">
              <label for="password-registration">Password</label>
              <span class="helper-text" data-error="invalid password" data-success="perfectly"></span>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock_open</i>
              <input id="password-registration-confirm" type="password" minlength="4" class="validate">
              <label for="password-registration-confirm">Confirm Password</label>
              <span class="helper-text" data-error="invalid password" data-success="perfectly"></span>
            </div>
            <a href="#" class="modal-close center register-button deep-orange darken-1 waves-effect waves-light btn">Регистрация</a>
          </div>

        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat modal-close-footer-btn">Закрыть</a>
        </div>
      </div>

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

export default MainHtmlView;
