import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  logIn(credentials: any): Observable<any> {
  const url = `${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`;
  return this.http.get<any[]>(url);
}


isLoggedIn(): boolean {
  const token = sessionStorage.getItem('authToken');
  return !!token; // Returns true if token exists
}

}
