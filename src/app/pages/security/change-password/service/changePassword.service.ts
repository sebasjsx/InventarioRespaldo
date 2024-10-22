import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from '../interface/changePassword.model';

@Injectable({
  providedIn: 'root'
})
export class changePasswordService {
  private patchUrl = environment.changePassword.patchChangePass;

  constructor(private http: HttpClient) {}

  changePassword(data: ChangePassword): Observable<any> {
    return this.http.patch(this.patchUrl, data, { responseType: 'text' });
  }

}
