import { UserData, UserRegister } from './../../../admin/users/interface/users.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private postUserUrl = environment.apiUrls.postUser;
  constructor(private http: HttpClient) {}
  postUser(userData: UserRegister): Observable<UserData> {
    return this.http.post<UserData>(this.postUserUrl, userData);
  }
}
