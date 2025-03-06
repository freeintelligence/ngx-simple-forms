import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GetOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  url: string;
  body?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class RemoteSelectService {
  constructor(private readonly http: HttpClient) {}

  getObservable<T = Object>(options: GetOptions): Observable<T> {
    switch (options.method) {
      case 'GET':
        return this.http.get<T>(options.url);
      case 'POST':
        return this.http.post<T>(options.url, options.body);
      case 'PATCH':
        return this.http.patch<T>(options.url, options.body);
      case 'DELETE':
        return this.http.delete<T>(options.url);
      case 'PUT':
        return this.http.put<T>(options.url, options.body);
      default:
        throw new Error('Invalid method');
    }
  }

  getPromise<T = Object>(options: GetOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      const result = this.getObservable<T>(options);

      result?.subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
