import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Winery, WineryData } from '../interface/winery.module';

@Injectable({
  providedIn: 'root'
})
export class WineryService {
  private getUrl = environment.wineryUrl.getWinery;
  private createUrl = environment.wineryUrl.createWinery;
  private updateUrl = environment.wineryUrl.updateWinery;
  private deleteUrl = environment.wineryUrl.deleteWinery;
  private searchUrl = environment.wineryUrl.searchWinery;

  constructor(private http: HttpClient) { }

  getData(page: number = 0, size: number = 8): Observable<WineryData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<WineryData>(this.getUrl, { params });
  }

  createWinery(WineryData: Winery): Observable<WineryData> {
    return this.http.post<WineryData>(this.createUrl, WineryData);
  }

  updateWinery(id: number, WineryData: Winery): Observable<WineryData> {
    return this.http.put<WineryData>(`${this.updateUrl}/${id}`, WineryData);
  }

  deleteWineryById(id: number): Observable<WineryData> {
    return this.http.delete<WineryData>(`${this.deleteUrl}/${id}`);
  }

  searchWinery(name: String): Observable<WineryData> {
    const params = {
      name: name.toString(),
    }
    return this.http.get<WineryData>(this.searchUrl, { params })
  }
}
