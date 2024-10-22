import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryData } from '../interface/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private getUrl = environment.categoryUrl.getCategories;
  private createUrl = environment.categoryUrl.createCategory;
  private updateUrl = environment.categoryUrl.updateCategory;
  private deleteUrl = environment.categoryUrl.deleteCategory;
  private searchUrl = environment.categoryUrl.searchCategory;

  constructor(private http: HttpClient) { }

  getData(page: number = 0, size: number = 8): Observable<CategoryData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<CategoryData>(this.getUrl, { params });
  }

  createCategory(categoryData: Category): Observable<CategoryData> {
    return this.http.post<CategoryData>(this.createUrl, categoryData);
  }

  updateCategory(id: number, categoryData: Category): Observable<CategoryData> {
    return this.http.put<CategoryData>(`${this.updateUrl}/${id}`, categoryData);
  }

  deleteCategoryById(id: number): Observable<CategoryData> {
    return this.http.delete<CategoryData>(`${this.deleteUrl}/${id}`);
  }

  searchCategory(name: String): Observable<CategoryData> {
    const params = {
      name: name.toString(),
    }
    return this.http.get<CategoryData>(this.searchUrl, { params })
  }
}
