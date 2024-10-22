import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyData } from '../interface/company.module';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private getUrl = environment.companyUrl.getCompany;
  private createUrl = environment.companyUrl.createCompany;
  private updateUrl = environment.companyUrl.updateCompany;
  private deleteUrl = environment.companyUrl.deleteCompany;
  private searchUrl = environment.companyUrl.searchCompany;
  constructor(private http: HttpClient) {}

  getData(page: number = 0, size: number = 8): Observable<CompanyData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<CompanyData>(this.getUrl, {params});
  }

  createCompany(companyData: Company): Observable<CompanyData> {
    
    return this.http.post<CompanyData>(this.createUrl, companyData);
  }
  
  updateCompany(id: number, companyData: Company): Observable<CompanyData> {
    return this.http.put<CompanyData>(`${this.updateUrl}/${id}`, companyData);
  }

  deleteCompanyById(id: number): Observable<CompanyData> {
    return this.http.delete<CompanyData>(`${this.deleteUrl}/${id}`);
  }

  search(name: String): Observable<CompanyData> {
    const params = {
      name: name.toString(),

    }
    return this.http.get<CompanyData>(this.searchUrl, {params})
  }
}
