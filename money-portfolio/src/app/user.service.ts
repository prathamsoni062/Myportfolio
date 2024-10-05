import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5001/api/users';
   token = sessionStorage.getItem('authToken'); // or localStorage
   headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
}


isLoggedIn(): boolean {
  const token = sessionStorage.getItem('authToken');
  return !!token; // Returns true if token exists
}

}
