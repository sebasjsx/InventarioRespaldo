import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductData } from '../interface/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getUrl = environment.productUrl.getProduct;
  private createUrl = environment.productUrl.createProduct;
  private updateUrl = environment.productUrl.updateProduct;
  private deleteUrl = environment.productUrl.deleteProduct;
  private searchUrl = environment.productUrl.searchProduct;

  constructor(private http: HttpClient) { }

  getData(page: number = 0, size: number = 8): Observable<ProductData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<ProductData>(this.getUrl, { params });
  }

  createProduct(ProductData: Product): Observable<ProductData> {
    return this.http.post<ProductData>(this.createUrl, ProductData);
  }

  updateProduct(id: number, ProductData: Product): Observable<ProductData> {
    return this.http.put<ProductData>(`${this.updateUrl}/${id}`, ProductData);
  }

  deleteProductById(id: number): Observable<ProductData> {
    return this.http.delete<ProductData>(`${this.deleteUrl}/${id}`);
  }

  search(name: String): Observable<ProductData> {
    const params = {
      name: name.toString(),

    }
    return this.http.get<ProductData>(this.searchUrl, {params})
  }
}
