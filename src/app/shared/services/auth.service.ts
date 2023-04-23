import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILoginRequest } from '../models/requests/ILoginRequest';
import { ILoginResponse } from '../models/responses/ILoginResponse';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: ILoginRequest): Observable<ILoginResponse[]> {
    return this.http.get<ILoginResponse[]>(baseAPI + API.login).pipe(
      map((response) => {
        const isUserExist = response.filter(
          (item) => item.email === data.email
        );
        if (isUserExist.length > 0) {
          return [isUserExist[0]];
        }
        return [];
      })
    );
  }
}
