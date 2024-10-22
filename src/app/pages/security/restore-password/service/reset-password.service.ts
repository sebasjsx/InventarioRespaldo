import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private apiUrl = environment.restore; 

  constructor(private http: HttpClient) {}

  updatePassword(email: string, token: string, newPassword: string): Observable<string> {
    const body = { email, token, newPassword };
    return this.http.put<string>(this.apiUrl, body, { responseType: 'text' as 'json' });
  }

}
