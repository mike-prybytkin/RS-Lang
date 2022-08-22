import FetchService from '../fetch-service/fetch-service';
import {
  IUserService,
  UserType,
  NewUserType,
  UserAuthorizationType,
  UpdateUserType,
  LoginBodyType,
  NewTokenType,
  UserWordBodyType,
  UserWordType,
  optionalType,
} from './types';

class UserService extends FetchService implements IUserService {
  public async createUser(email: string, password: string, name: string) {
    const endPoint = 'users';
    const body = { email, password, name };
    const data = await this.postData<NewUserType, UserType>(endPoint, this.token, body);
    return data;
  }

  public async loginUser(email: string, password: string) {
    const endPoint = 'signin';
    const body = { email, password };
    const data = await this.postData<UserAuthorizationType, LoginBodyType>(endPoint, this.token, body);
    if (data) {
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      this.userId = data.userId;
    }
    return data;
  }

  public async getUser() {
    const endPoint = `users/${this.userId}`;
    const data = await this.getData<NewUserType>(endPoint, this.token);
    return data;
  }

  public async updateUser(email: string, password: string, name: string) {
    const endPoint = `users/${this.userId}`;
    const body = { email, password, name };
    const data = await this.putData<UpdateUserType, UserType>(endPoint, this.token, body);
    return data;
  }

  public async deleteUser() {
    const endPoint = `users/${this.userId}`;
    await this.deleteData(endPoint, this.token);
  }

  public async getNewUserTokens() {
    const endPoint = `users/${this.userId}/tokens`;
    const data = await this.getData<NewTokenType>(endPoint, this.refreshToken);
    if (data) {
      this.token = data.token;
      this.refreshToken = data.refreshToken;
    }
    return data;
  }

  public async createUserWord(wordId: string) {
    const endPoint = `users/${this.userId}/words/${wordId}`;
    const body = {
      difficulty: 'true',
      optional: {
        learned: false,
        correctAnswersSuccessively: 0,
        attempts: 0,
      },
    };
    const data = await this.postData<UserWordType, UserWordBodyType>(endPoint, this.token, body);
    return data;
  }

  public async getUserWord(wordId: string) {
    const endPoint = `users/${this.userId}/words/${wordId}`;
    const data = await this.getData<UserWordType>(endPoint, this.token);
    return data;
  }

  public async getAllUserWords() {
    const endPoint = `users/${this.userId}/words`;
    const data = await this.getData<UserWordType[]>(endPoint, this.token);
    return data;
  }

  public async updateUserWord(wordId: string, difficulty: string, optional: optionalType) {
    const endPoint = `users/${this.userId}/words/${wordId}`;
    const body = { difficulty, optional };
    const data = await this.putData<UserWordType, UserWordBodyType>(endPoint, this.token, body);
    return data;
  }

  public async deleteUserWord(wordId: string) {
    const endPoint = `users/${this.userId}/words/${wordId}`;
    await this.deleteData(endPoint, this.token);
  }
}

export default UserService;
