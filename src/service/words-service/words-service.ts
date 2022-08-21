import FetchService from '../fetch-service/fetch-service';
import { IWordsService, WordType } from './types';
// import { WordType /*, PostBodyType*/ } from '../car-service/types';

class WordsService extends FetchService implements IWordsService {
  public async getWords(group: number, page: number): Promise<WordType[] | null> {
    const endPoint = `words?group=${group}&page=${page}`;
    const data = await this.getData<WordType[]>(endPoint);
    console.log(data);
    return data;
  }

  public async getWordById(id: string): Promise<WordType | null> {
    const endPoint = `words/${id}`;
    const data = await this.getData<WordType>(endPoint);
    console.log(data);
    return data;
  }
}

export default WordsService;
