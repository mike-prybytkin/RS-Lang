/* eslint-disable @typescript-eslint/no-explicit-any */
import './textbook.scss';
import { WordType } from '../../service/words-service/types';
import FetchService from '../../service/fetch-service/fetch-service';

const { baseUrl } = new FetchService();

class TextbookView {
  async renderPage(words: Promise<WordType[]>) {
    const wordsWrapper = document.createElement('div');
    wordsWrapper.classList.add('words__wrapper');
    document.body.append(wordsWrapper);
    const template = document.createElement('template');
    template.id = 'card__template';
    wordsWrapper.append(template);
    const audio = document.createElement('audio');
    audio.classList.add('audio');
    wordsWrapper.append(audio);
    const cardTemplate = document.querySelector('#card__template') as HTMLTemplateElement;
    (document.querySelector('#card__template') as HTMLElement).innerHTML = `<div class="word">
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
        <button class="word__audio">
          <img src="../../assets/icons/play.png" class="word__audio-img">
        </button>
      </div>
    </div>`;

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
}

export default TextbookView;
