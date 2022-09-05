/* eslint-disable @typescript-eslint/no-explicit-any */
import './textbook.scss';
import { WordType } from '../../service/words-service/types';
import FetchService from '../../service/fetch-service/fetch-service';
import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import UserService from '../../service/user-service/user-service';
import { UserAuthorizationType, UserWordType } from '../../service/user-service/types';

const userService = new UserService();
const { baseUrl } = new FetchService();
const lsS = new LocalStorageService();
class TextbookView {
  public user: UserAuthorizationType;

  constructor() {
    this.user = lsS.getItemLocalStorage('user');
  }

  async renderPage(words: Promise<WordType[]>) {
    const wordsWrapper = document.querySelector('.words__wrapper') as HTMLElement;
    const cardTemplate = document.querySelector('#card__template') as HTMLTemplateElement;
    wordsWrapper.innerHTML = ``;
    const audio = document.createElement('audio');
    audio.classList.add('audio');
    wordsWrapper.append(audio);
    let difWord: UserWordType[];
    let learnedWord: UserWordType[];
    if (this.user) {
      difWord = (await this.getUserDifficultWord()) as UserWordType[];
      learnedWord = (await this.getUserLearnedWord()) as UserWordType[];
    }
    (await words).forEach(async (word) => {
      const card = cardTemplate.content.cloneNode(true) as HTMLTemplateElement;
      const wordcard = card.querySelector('.word');
      const wordImage = card.querySelector('.word__img');
      const wordText = card.querySelector('.word__text');
      const wordTextTranslate = card.querySelector('.word__text-translate');
      const wordTranscription = card.querySelector('.word__transcription');
      const wordTextMeaning = card.querySelector('.word__text-meaning');
      const wordTextMeaningTranslate = card.querySelector('.word__text-meaning-translate');
      const wordTextExample = card.querySelector('.word__text-example');
      const wordTextExampleTranslate = card.querySelector('.word__text-example-translate');
      const wordAudio = card.querySelector('.word__audio');
      const wordHard = card.querySelector('.word__hard');
      const wordStudied = card.querySelector('.word__studied');
      (wordImage as HTMLImageElement).src = `${baseUrl}/${word.image}`;
      (wordcard as HTMLElement).dataset.id = word.id;
      (wordText as HTMLElement).innerHTML = word.word;
      (wordTranscription as HTMLElement).innerHTML = word.transcription;
      (wordTextTranslate as HTMLElement).innerHTML = word.wordTranslate;
      (wordTextMeaning as HTMLElement).innerHTML = word.textMeaning;
      (wordTextMeaningTranslate as HTMLElement).innerHTML = word.textMeaningTranslate;
      (wordTextExample as HTMLElement).innerHTML = word.textExample;
      (wordTextExampleTranslate as HTMLElement).innerHTML = word.textExampleTranslate;
      (wordAudio as HTMLElement).addEventListener('click', () => {
        this.playAudio([word.audio, word.audioMeaning, word.audioExample]);
      });
      (wordStudied as HTMLElement).addEventListener('click', () => {
        if ((wordcard as HTMLElement).classList.contains('word-difficult')) {
          this.updateWordFromDifficult(word.id);
        } else {
          this.addWordInStudied(word.id);
        }
      });
      (wordHard as HTMLElement).addEventListener('click', () => {
        this.addWordInDifficult(word.id);
      });
      if (this.user) {
        (wordHard as HTMLElement).classList.add('word__btn_active');
        (wordStudied as HTMLElement).classList.add('word__btn_active');
        learnedWord.forEach((wrd) => {
          if ((wordcard as HTMLElement).dataset.id === wrd.wordId) {
            (wordcard as HTMLElement).classList.add('word-learned');
          }
        });
        difWord.forEach((wrd) => {
          if ((wordcard as HTMLElement).dataset.id === wrd.wordId) {
            (wordcard as HTMLElement).classList.add('word-difficult');
          }
        });
      }
      wordsWrapper.append(card);
    });
    this.checkPageForFamiliarity();
  }

  async renderDifficultPage(words: Promise<WordType>[]) {
    const wordsWrapper = document.querySelector('.words__wrapper') as HTMLElement;
    const cardTemplate = document.querySelector('#card__template') as HTMLTemplateElement;
    wordsWrapper.innerHTML = ``;
    const audio = document.createElement('audio');
    audio.classList.add('audio');
    wordsWrapper.append(audio);
    (await words).forEach(async (word) => {
      const card = cardTemplate.content.cloneNode(true) as HTMLTemplateElement;
      const wordcard = card.querySelector('.word');
      const wordImage = card.querySelector('.word__img');
      const wordText = card.querySelector('.word__text');
      const wordTextTranslate = card.querySelector('.word__text-translate');
      const wordTranscription = card.querySelector('.word__transcription');
      const wordTextMeaning = card.querySelector('.word__text-meaning');
      const wordTextMeaningTranslate = card.querySelector('.word__text-meaning-translate');
      const wordTextExample = card.querySelector('.word__text-example');
      const wordTextExampleTranslate = card.querySelector('.word__text-example-translate');
      const wordAudio = card.querySelector('.word__audio');
      const wordControls = card.querySelector('.word__controls') as HTMLElement;
      const deleteFromDifficulBtn = document.createElement('button') as HTMLButtonElement;
      deleteFromDifficulBtn.textContent = 'Удалить';
      deleteFromDifficulBtn.classList.add('deep-orange', 'word__btn', 'word__btn_active', 'word__btn_delete');
      wordControls.append(deleteFromDifficulBtn);
      (wordImage as HTMLImageElement).src = `${baseUrl}/${(await word).image}`;
      (wordcard as HTMLElement).dataset.id = (await word).id;
      (wordcard as HTMLElement).classList.add('word-difficult');
      (wordText as HTMLElement).innerHTML = (await word).word;
      (wordTranscription as HTMLElement).innerHTML = (await word).transcription;
      (wordTextTranslate as HTMLElement).innerHTML = (await word).wordTranslate;
      (wordTextMeaning as HTMLElement).innerHTML = (await word).textMeaning;
      (wordTextMeaningTranslate as HTMLElement).innerHTML = (await word).textMeaningTranslate;
      (wordTextExample as HTMLElement).innerHTML = (await word).textExample;
      (wordTextExampleTranslate as HTMLElement).innerHTML = (await word).textExampleTranslate;
      (wordAudio as HTMLElement).addEventListener('click', async () => {
        this.playAudio([(await word).audio, (await word).audioMeaning, (await word).audioExample]);
      });
      deleteFromDifficulBtn.addEventListener('click', () => {
        this.deleteWordFromDifficult(String((wordcard as HTMLElement).dataset.id));
        (wordcard as HTMLElement).style.display = 'none';
      });
      wordsWrapper.append(card);
    });
  }

  renderBaseStructure() {
    (document.querySelector('.main-wrapper') as HTMLElement).innerHTML = `
  <div class="container">
  <div class="controls">
  <a class='group-dropdown-trigger waves-effect waves-light btn deep-orange controls__item' href='#' data-target='group-dropdown'>Раздел 1</a>
  <ul id='group-dropdown' class='dropdown-content'>
  </ul>
  <div class="page controls__item">
    <button class="waves-effect waves-light btn deep-orange prev-btn"><</button>
    <a class='page-dropdown-trigger waves-effect waves-light btn deep-orange current-page' href='#' data-target='page-dropdown'>Страница 1</a>
    <ul id='page-dropdown' class='dropdown-content'>
      
    </ul>
    <button class="waves-effect waves-light btn deep-orange next-btn">></button>
  </div>
  <button class="waves-effect waves-light btn deep-orange game__btn game__btn-audiocall controls__item">Аудиовызов</button>
  <button class="waves-effect waves-light btn deep-orange game__btn game__btn-sprint controls__item">Спринт</button>
</div>
  <div class="words__wrapper">
</div></div>
  <template id="card__template">
  <div class="word">
    <img alt="img" class="word__img">
    <div class="word__content">
    <div class="word__descr">
    <div class="word__header">
      <div class="word__text"></div>
      <div class="word__transcription"></div>
      <div class="word__text-translate"></div>
    </div>
    <div class="word__text-meaning"></div>
    <div class="word__text-meaning-translate"></div>
    <div class="word__text-example"></div>
    <div class="word__text-example-translate"></div>
  </div>
  <div class="word__controls">
    <button class="deep-orange word__audio">
      <img src="../../assets/icons/play.png" class="word__audio-img">
    </button>
    <button class="deep-orange word__btn word__hard">В сложные</button>
    <button class="deep-orange word__btn word__studied">Изучено</button>
  </div>
</div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>`;
  }

  playAudio(audio: string[]) {
    const audioPlayer = document.querySelector('.audio') as HTMLAudioElement;
    audioPlayer.src = `${baseUrl}/${audio[0]}`;
    audioPlayer.play();
    audioPlayer.addEventListener('ended', () => {
      if (audioPlayer.src === `${baseUrl}/${audio[0]}`) {
        setTimeout(() => {
          audioPlayer.src = `${baseUrl}/${audio[1]}`;
          audioPlayer.play();
        }, 300);
      }
      if (audioPlayer.src === `${baseUrl}/${audio[1]}`) {
        setTimeout(() => {
          audioPlayer.src = `${baseUrl}/${audio[2]}`;
          audioPlayer.play();
        }, 300);
      }
    });
  }

  initializeGroupDropdown(groupCount: number) {
    const colors = [
      'deep-orange lighten-4',
      'deep-orange lighten-3',
      'deep-orange lighten-2',
      'deep-orange lighten-1',
      'deep-orange',
      'deep-orange darken-1',
    ];
    const elems = document.querySelectorAll('.group-dropdown-trigger');
    M.Dropdown.init(elems);
    const groupDropdown = document.getElementById('group-dropdown') as HTMLElement;
    for (let i = 1; i <= groupCount; i += 1) {
      groupDropdown.innerHTML += `<li><a href="#!" class="${
        colors[i - 1]
      }  white-text group__item">Раздел ${i}</a></li>`;
    }
    if (this.user) {
      groupDropdown.innerHTML += `<li><a href="#!" class="deep-orange darken-4 white-text group__item_difficult">Сложные слова</a></li>`;
    }
  }

  initializePageDropdown(pageCount: number) {
    const elems = document.querySelectorAll('.page-dropdown-trigger');
    M.Dropdown.init(elems);
    const pageDropdown = document.getElementById('page-dropdown') as HTMLElement;
    for (let i = 1; i <= pageCount; i += 1) {
      pageDropdown.innerHTML += `<li><a href="#!" class="deep-orange white-text page__item">Страница ${i}</a></li>`;
    }
  }

  changeControlsCaption(group: number, page: number) {
    const currentPage = document.querySelector('.current-page') as HTMLElement;
    const currentGroup = document.querySelector('.group-dropdown-trigger.btn') as HTMLLinkElement;
    const pageWrapper = document.querySelector('.page') as HTMLElement;
    pageWrapper.style.display = 'flex';
    currentGroup.textContent = `Раздел ${group + 1}`;
    currentPage.textContent = `Страница ${page + 1}`;
    (document.querySelector('.game__btn-audiocall') as HTMLElement).style.display = 'block';
    (document.querySelector('.game__btn-sprint') as HTMLElement).style.display = 'block';
  }

  changeControlsCaptionForDifficult() {
    const pageWrapper = document.querySelector('.page') as HTMLElement;
    const currentGroup = document.querySelector('.group-dropdown-trigger.btn') as HTMLLinkElement;
    currentGroup.textContent = `Сложные слова`;
    pageWrapper.style.display = 'none';
    const audioPlayer = document.querySelector('.audio') as HTMLAudioElement;
    (document.querySelector('.game__btn-audiocall') as HTMLElement).style.display = 'none';
    (document.querySelector('.game__btn-sprint') as HTMLElement).style.display = 'none';
    audioPlayer.pause();
  }

  updatePage(group: number, page: number, words: Promise<WordType[]>) {
    this.renderPage(words);
    this.changeControlsCaption(group, page);
    const audioPlayer = document.querySelector('.audio') as HTMLAudioElement;
    audioPlayer.pause();
  }

  private checkPageForFamiliarity() {
    const cardWrapper = document.querySelector('.words__wrapper');
    const allCards = document.querySelectorAll('.word');
    const learnedCards = document.querySelectorAll('.word-learned');
    const difficultCards = document.querySelectorAll('.word-difficult');
    const gameBtn = document.querySelectorAll('.game__btn') as NodeListOf<HTMLButtonElement>;
    if (allCards.length === learnedCards.length + difficultCards.length) {
      cardWrapper?.classList.add('page-learned');
      gameBtn.forEach((item) => {
        item.setAttribute('disabled', 'true');
      });
    } else {
      cardWrapper?.classList.remove('page-learned');
      gameBtn.forEach((item) => {
        item.removeAttribute('disabled');
      });
    }
  }

  async addWordInDifficult(wordId: string) {
    if (await userService.getUserWord1(this.user.userId, this.user.token, wordId)) {
      console.log('Данное слово уже добавлено в сложные');
    } else {
      userService.createDifficultUserWord1(this.user.userId, this.user.token, wordId);
      (document.querySelector(`[data-id="${wordId}"]`) as HTMLElement).classList.add('word-difficult');
    }
  }

  async addWordInStudied(wordId: string) {
    if (await userService.getUserWord1(this.user.userId, this.user.token, wordId)) {
      console.log('Данное слово уже добавлено в изученные');
    } else {
      userService.createLearnedUserWord1(this.user.userId, this.user.token, wordId);
      (document.querySelector(`[data-id="${wordId}"]`) as HTMLElement).classList.add('word-learned');
    }
  }

  async deleteWordFromDifficult(wordId: string) {
    userService.deleteUserWord1(this.user.userId, this.user.token, wordId);
  }

  async updateWordFromDifficult(wordId: string) {
    const word = (await userService.getUserWord1(this.user.userId, this.user.token, wordId)) as UserWordType;
    word.optional.learned = true;
    userService.updateUserWord1(this.user.userId, this.user.token, wordId, word?.difficulty, word?.optional);
    (document.querySelector(`[data-id="${wordId}"]`) as HTMLElement).classList.add('word-learned');
  }

  changeStyleDifficultWord = (userWords: UserWordType[]) => {
    const wordCards = document.querySelectorAll('.word');
    userWords.forEach((word) => {
      wordCards.forEach((card) => {
        if (word.wordId === (card as HTMLElement).dataset.id) {
          card.classList.add('word-difficult');
        }
      });
    });
  };

  async getUserDifficultWord() {
    const allWrd = await userService.getAllUserWords1(this.user.userId, this.user.token);
    const difW: UserWordType[] = [];
    allWrd?.forEach((item) => {
      if (!item.optional.learned) difW.push(item);
    });
    return difW;
  }

  async getUserLearnedWord() {
    const allWrd = await userService.getAllUserWords1(this.user.userId, this.user.token);
    const learnedWrd: UserWordType[] = [];
    allWrd?.forEach((item) => {
      if (item.optional.learned) learnedWrd.push(item);
    });
    return learnedWrd;
  }
}

export default TextbookView;
