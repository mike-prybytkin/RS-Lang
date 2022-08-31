import { UserWordBodyType } from '../user-service/types';

export interface IWordsService {
  getWords(group: number, page: number): Promise<WordType[] | null>;
  getWordById(id: string): Promise<WordType | null>;
}

export type Answer = 'correct-answer' | 'wrong-answer';

export type WordType = {
  id: string;
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord: UserWordBodyType;
  answer: Answer;
};
