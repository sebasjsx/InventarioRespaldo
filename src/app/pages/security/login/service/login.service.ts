import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.authUrl}/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }; 
    return this.http.post<any>(this.loginUrl, body);
  }

  //verifica si ya esta logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
