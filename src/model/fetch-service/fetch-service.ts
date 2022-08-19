import { IFetchService, RequestType } from './types';

class FetchService implements IFetchService {
  readonly baseUrl = 'https://rs-lang-prodaction.herokuapp.com';

  private async typedFetch<T, B>(endPoint: string, request: RequestType, body?: B): Promise<T | string> {
    try {
      const url = `${this.baseUrl}/${endPoint}`;
      const requestConfig = this.getRequestConfig(request, body);
      const response = await fetch(`${url}`, requestConfig);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log('error');
      return 'error';
    }
  }

  private getRequestConfig<B>(requestType: RequestType, body?: B) {
    const config = {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
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
      default:
        return {};
    }
  }

  async getData<T>(endPoint: string) {
    return this.typedFetch<T, never>(endPoint, 'GET');
  }
}

export default FetchService;

