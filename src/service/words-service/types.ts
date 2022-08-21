export interface IWordsService {
  getWords(group: number, page: number): Promise<WordType[] | null>;
  getWordById(id: string): Promise<WordType | null>;
  // createCar(name: string, color: string): Promise<void | { totalCount: string | null; data: CarType; }>;
  // updateCar(id: number, name: string, color: string): Promise<void | {totalCount: string | null; data: CarType; }>;
  // getCars(page: number, limit: number): Promise<void | {totalCount: string | null; data: CarType[]; }>;
  // deleteCar(id: number): void;
}

export type WordType = {
  id: string;
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
};
