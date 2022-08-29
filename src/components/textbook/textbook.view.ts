/* eslint-disable @typescript-eslint/no-explicit-any */
import './textbook.scss';
import { WordType } from '../../service/words-service/types';
import FetchService from '../../service/fetch-service/fetch-service';

const { baseUrl } = new FetchService();

class TextbookView {
  // private wordsWrapper;

  // private cardTemplate;

  // constructor() {
  //   this.wordsWrapper = document.querySelector('.words__wrapper') as HTMLElement;
  //   this.cardTemplate = document.querySelector('#card__template') as HTMLTemplateElement;
  // }

  async renderPage(words: Promise<WordType[]>) {
    const wordsWrapper = document.querySelector('.words__wrapper') as HTMLElement;
    const cardTemplate = document.querySelector('#card__template') as HTMLTemplateElement;
    wordsWrapper.innerHTML = ``;
    const audio = document.createElement('audio');
    audio.classList.add('audio');
    wordsWrapper.append(audio);
    (await words).forEach((word) => {
      const card = cardTemplate.content.cloneNode(true) as HTMLTemplateElement;
      const wordImage = card.querySelector('.word__img');
      const wordText = card.querySelector('.word__text');
      const wordTextTranslate = card.querySelector('.word__text-translate');
      const wordTranscription = card.querySelector('.word__transcription');
      const wordTextMeaning = card.querySelector('.word__text-meaning');
      const wordTextMeaningTranslate = card.querySelector('.word__text-meaning-translate');
      const wordTextExample = card.querySelector('.word__text-example');
      const wordTextExampleTranslate = card.querySelector('.word__text-example-translate');
      const wordAudio = card.querySelector('.word__audio');
      (wordImage as HTMLImageElement).src = `${baseUrl}/${word.image}`;
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
      wordsWrapper.append(card);
    });
  }

  renderBaseStructure() {
    document.body.innerHTML = `
  <div class="container">
  <div class="controls">
  <a class='dropdown-trigger btn deep-orange' href='#' data-target='dropdown1'>Раздел 1</a>
  <ul id='dropdown1' class='dropdown-content'>
    <li><a href="#!" class="group">Раздел 1</a></li>
    <li><a href="#!" class="group">Раздел 2</a></li>
    <li><a href="#!" class="group">Раздел 3</a></li>
    <li><a href="#!" class="group">Раздел 4</a></li>
    <li><a href="#!" class="group">Раздел 5</a></li>
    <li><a href="#!" class="group">Раздел 6</a></li>
  </ul>
  <div class="page">
    <button class="waves-effect waves-light btn-small deep-orange prev-btn"><</button>
    <span class="current-page">Страница 1</span>
    <button class="waves-effect waves-light btn-small deep-orange next-btn">></button>
  </div>
</div>
  <div class="words__wrapper">
</div></div>
  <template id="card__template">
  <div class="word">
    <img alt="img" class="word__img">
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
      <button class="btn-floating pulse deep-orange word__audio">
        <img src="../../assets/icons/play.png" class="word__audio-img">
      </button>
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

  initializeDropdown() {
    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems);
    });
  }

  changeControlsCaption(group: number, page: number) {
    const currentPage = document.querySelector('.current-page') as HTMLElement;
    const currentGroup = document.querySelector('.dropdown-trigger.btn') as HTMLLinkElement;
    currentGroup.textContent = `Раздел ${group + 1}`;
    currentPage.textContent = `Страница ${page + 1}`;
  }

  updatePage(group: number, page: number, words: Promise<WordType[]>) {
    this.renderPage(words);
    this.changeControlsCaption(group, page);
  }
}

export default TextbookView;
