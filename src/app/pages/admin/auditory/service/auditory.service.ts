import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuditData, AuditDataSearch } from '../interface/audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoryService {

  private auditUrl = environment.auditUrl.getAudit;
  private auditSearch = environment.auditUrl.searchAudit;

  constructor(private http: HttpClient) { }

  getAudit(page: number = 0, size: number = 8): Observable<AuditData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<AuditData>(this.auditUrl, { params });
  }

  getAuditWithFilters(
    page: number = 0,
    size: number = 8,
    startDate?: Date,
    endDate?: Date,
    entity?: string,
    operation?: string,
    username?: string
  ): Observable<AuditDataSearch> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    if (startDate) {
      params = params.set('startDate', startDate.toISOString().split('T')[0]);
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString().split('T')[0]);
    }
    if (entity) {
      params = params.set('entity', entity);
    }
    if (operation) {
      params = params.set('operation', operation);
    }
    if (username) {
      params = params.set('username', username);
    }
  
    return this.http.get<AuditDataSearch>(this.auditSearch, { params });
  }
}  
