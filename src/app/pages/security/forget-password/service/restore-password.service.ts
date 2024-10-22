import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class RestorePasswordService {
  private apiUrl = environment.recover;

  constructor(private http: HttpClient) {}

  recoverPassword(email: string): Observable<string> {
    const body = { email };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}
