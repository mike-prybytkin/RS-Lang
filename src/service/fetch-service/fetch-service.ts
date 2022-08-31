import { IFetchService, RequestType } from './types';

class FetchService implements IFetchService {
  readonly baseUrl = 'https://rs-lang-prodaction.herokuapp.com';

  public token: string;

  public userId: string;

  refreshToken: string;

  constructor() {
    this.token = '';
    this.userId = '';
    this.refreshToken = '';
  }

  private async typedFetch<T, B>(endPoint: string, request: RequestType, token: string, body?: B): Promise<T | null> {
    try {
      const url = `${this.baseUrl}/${endPoint}`;
      const requestConfig = this.getRequestConfig(request, body, token);
      if (request === 'DELETE') {
        await fetch(`${url}`, requestConfig);
        return null;
      }
      const response = await fetch(`${url}`, requestConfig);
      const data = await response.json();
      console.log(data, this.token, this.userId, this.refreshToken, request);
      return data;
    } catch (error) {
      console.log('error', request);
      return null;
    }
  }

  private getRequestConfig<B>(requestType: RequestType, body: B, token: string) {
    const config = {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    switch (requestType) {
      case 'DELETE':
        return {
          method: 'DELETE',
          ...config,
        };
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

  async getData<T>(endPoint: string, token: string) {
    const data = await this.typedFetch<T, never>(endPoint, 'GET', token);
    return data;
  }

  protected async postData<R, B>(endPoint: string, token: string, body: B) {
    const data = await this.typedFetch<R, B>(endPoint, 'POST', token, body);
    return data;
  }

  protected async putData<R, B>(endPoint: string, token: string, body: B) {
    const data = await this.typedFetch<R, B>(endPoint, 'PUT', token, body);
    return data;
  }

  protected async deleteData(endPoint: string, token: string) {
    await this.typedFetch<never, never>(endPoint, 'DELETE', token);
  }
}

export default FetchService;
