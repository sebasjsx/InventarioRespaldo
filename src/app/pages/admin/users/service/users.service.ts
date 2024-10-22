import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserData} from '../interface/users.module';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private deleteUrl = environment.apiUrls.deleteUsers;
  private postUserUrl = environment.apiUrls.postUser;
  private updateUsers = environment.apiUrls.updateUsers;
  private getUsers = environment.apiUrls.getUsers
  private searchUrl = environment.apiUrls.searchUser;

  constructor(private http: HttpClient) {}
  getData(page: number = 0, size: number = 8): Observable<UserData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<UserData>(this.getUsers, {params});
  }

  createUser(userData: User): Observable<UserData> {
    return this.http.post<UserData>(this.postUserUrl, userData);
  }

  updateUser(id: number, userData: User): Observable<UserData> {
    return this.http.put<UserData>(`${this.updateUsers}/${id}`, userData);
  }

  deleteUserById(id: number): Observable<UserData> {
    return this.http.delete<UserData>(`${this.deleteUrl}/${id}`);
  }

  searchUsers(name: String): Observable<UserData> {
    const params = {
      name: name.toString(),
    }
    return this.http.get<UserData>(this.searchUrl, { params })
  }
}
