import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import apiUrlConfigs from '../app/shared/modules/http-layer/config/api-url.config';
import { ApiService } from './shared/modules/http-layer/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:5001/api/users';
  // private apiUrl = 'https://portfolio-backend-171s.onrender.com/api/users';
   token = sessionStorage.getItem('authToken'); // or localStorage
   headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private http: HttpClient,
    private ApiService: ApiService
  ) { }

  // signUp(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user);
  // }
  signUp(user: any): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.register, {requestBody:user});
  }

//   logIn(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
// }
  logIn(credentials: any): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.login, {requestBody:credentials});
}


isLoggedIn(): boolean {
  const token = sessionStorage.getItem('authToken');
  return !!token; // Returns true if token exists
}

}
