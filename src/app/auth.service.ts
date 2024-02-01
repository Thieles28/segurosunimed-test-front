import { Users } from './model/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from './model/credentials';
import { Token } from './model/token';
import { UserLogged } from './model/user-logged';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/auth/login`, credentials);
  }

  registerUsers(users: Users): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/auth/register`, users);
  }

  listUsers(): Observable<Array<Users>> {
    return this.http.get<Array<Users>>(`${this.baseUrl}/auth/users`);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getLoggedUser(): Observable<UserLogged> {
    return this.http.get<UserLogged>(`${this.baseUrl}/auth/loggedUser`);
  }

  registerUser(users: Users): Observable<Users> {
    return this.http.post<Users>(`${this.baseUrl}/auth/registerUser`, users);
  }

  getUser(id: Number): Observable<Users> {
    return this.http.get<Users>(`${this.baseUrl}/auth/user/${id}`);
  }

  updateUser(id: Number, users: Users): Observable<Users> {
    return this.http.put<Users>(`${this.baseUrl}/auth/updateUser/${id}`, users);
  }

  removeUser(id: Number): Observable<Users> {
    return this.http.delete<Users>(`${this.baseUrl}/auth/removeUser/${id}`);
  }

}
