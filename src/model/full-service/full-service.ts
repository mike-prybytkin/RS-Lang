import FetchService from '../fetch-service/fetch-service';
import { IFullService, WordType } from './types';

class FullService extends FetchService implements IFullService {
  public async getWords(group: number, page: number): Promise<WordType[] | string> {
    const endPoint = `words?group=${group}&page=${page}`;
    const data = await this.getData<WordType[]>(endPoint);
    return data;
  }
}

export default FullService;
