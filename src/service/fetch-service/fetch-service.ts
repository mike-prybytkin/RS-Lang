import { IFetchService, RequestType } from './types';

class FetchService implements IFetchService {
  readonly baseUrl = 'https://rs-lang-prodaction.herokuapp.com';

  token: string;

  constructor() {
    this.token = '';
  }

  // token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmU5ZTBkNGQ1NjZlMDAxNmM1NjhiOSIsImlhdCI6MTY2MTA3OTA2MywiZXhwIjoxNjYxMDkzNDYzfQ.mO0x2NB73DTfWm3761h9FlXeaMxQWXE0DzRlzMEU5nA';

  private async typedFetch<T, B>(endPoint: string, request: RequestType, body?: B): Promise<T | null> {
    try {
      const url = `${this.baseUrl}/${endPoint}`;
      const requestConfig = this.getRequestConfig(request, body);
      const response = await fetch(`${url}`, requestConfig);
      const data = await response.json();
      if (data.token) {
        this.token = data.token;
      }
      console.log(data, this.token);
      return data;
    } catch (error) {
      console.log('error');
      return null;
    }
  }

  private getRequestConfig<B>(requestType: RequestType, body?: B) {
    const config = {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };
    switch (requestType) {
      case 'DELETE':
        return { method: 'DELETE' };
      case 'PATCH':
        return { method: 'PATCH' };
      case 'POST':
        return {
          method: 'POST',
          ...config,
        };
      case 'PUT':
        return {
          method: 'PUT',
          ...config,
        };
      case 'GET':
        return {
          method: 'GET',
          ...config,
        };
      default:
        return {};
    }
  }

  async getData<T>(endPoint: string) {
    const data = await this.typedFetch<T, never>(endPoint, 'GET');
    return data;
  }

  protected async postData<R, B>(endPoint: string, body: B) {
    const data = await this.typedFetch<R, B>(endPoint, 'POST', body);
    return data;
  }

  // protected async putData<R, B>(endPoint: string, body: B) {
  //     return await this.typedFetch<R, B>(endPoint, 'PUT', body);
  // }

  // protected async patchData<T>(endPoint: string) {
  //     return await this.typedFetch<T, never>(endPoint, 'PATCH');
  // }

  // protected async deleteData(endPoint: string) {
  //     return await this.typedFetch<never, never>(endPoint, 'DELETE');
  // }
}

export default FetchService;

// async function example() {
//     const response = await fetch(`https://rs-lang-prodaction.herokuapp.com/words?group=3&page=3`);
//     const data = await response.json();
//     console.log(data);
// }
// example();
// console.log('hi');5e9f5ee35eb9e72bc21af986

// async function example() {
//     const response = await fetch(`https://rs-lang-prodaction.herokuapp.com/files/03_1255.jpg`);
//     console.log(response);
//     // const data = await response.json();
//     // console.log(data);
// }
// example();

// const createUser = async (user) => {
//     const rawResponse = await fetch('https://rs-lang-prodaction.herokuapp.com/users', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
//     const content = await rawResponse.json();

//     console.log(content);
//   };

// createUser({ "email": "gavran2502@mail.ru", "password": "12345678" });

// const loginUser = async (user: { email: string; password: string }) => {
//     const rawResponse = await fetch('https://rs-lang-prodaction.herokuapp.com/signin', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
//     const content = await rawResponse.json();

//     console.log(content);
//   };

//   loginUser({ "email": "gavran2502@mail.ru", "password": "12345678" });

//   {message: 'Authenticated', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZ…TE4fQ.R8MTJ7pKG90DQFQHj0mC1WvkxH39BBWV7MTCpwjiXZw', refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZ…cxOH0.I87iXJQ9rp_-kIKaPBjMIUwg7S1HiVQn74YHEitpmF8', userId: '62fe9e0d4d566e0016c568b9'}
