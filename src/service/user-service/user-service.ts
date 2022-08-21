import FetchService from '../fetch-service/fetch-service';
import { IUserService, UserType, NewUserType, UserAuthorizationType, EmptyBody } from './types';
// import { WordType /*, PostBodyType*/ } from '../car-service/types';

class UserService extends FetchService implements IUserService {
  public async createUser(email: string, password: string) {
    const endPoint = 'users';
    const body = { email, password };
    const data = await this.postData<NewUserType, UserType>(endPoint, body);
    return data;
  }

  public async loginUser(email: string, password: string) {
    const endPoint = 'signin';
    const body = { email, password };
    const data = await this.postData<UserAuthorizationType, UserType>(endPoint, body);
    if (data) {
      this.token = data.token;
    }
    return data;
  }

  public async getUser(id: string) {
    const endPoint = `users/${id}`;
    const data = await this.getData<NewUserType>(endPoint);
    return data;
  }

  // public async getUser(group: number, page: number): Promise<WordType[] | string> {
  //   const endPoint = `words?group=${group}&page=${page}`;
  //   const data = await this.getData<WordType[]>(endPoint);
  //   console.log(data);
  //   return data;
  // }

  // public async createCar(name: string, color: string) {
  //     const endPoint = 'garage';
  //     const body = { name, color };
  //     return await this.postData<CarType, PostBodyType>(endPoint, body);
  // }

  // public async updateCar(id: number, name: string, color: string) {
  //     const endPoint = `garage/${id}`;
  //     const body = { name, color };
  //     await this.putData<CarType, PostBodyType>(endPoint, body);
  // }

  // public async getCars(page = 1, limit = 7) {
  //     const endPoint = `garage?_page=${page}&_limit=${limit}`;
  //     return this.getData<CarType[]>(endPoint);
  // }

  // public async deleteCar(id: number) {
  //     const endPoint = `garage/${id}`;
  //     await this.deleteData(endPoint);
  // }
}

export default UserService;
