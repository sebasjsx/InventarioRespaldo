import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase, PurchaseData } from '../interface/purchase.module';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private getUrl = environment.purchaseUrl.getPurchase;
  private createUrl = environment.purchaseUrl.createPurchase;
  private updateUrl = environment.purchaseUrl.updatePurchase;
  private deleteUrl = environment.purchaseUrl.deletePurchase;
  private searchUrl = environment.purchaseUrl.searchPurchase;

  constructor(private http: HttpClient) { }

  getData(page: number = 0, size: number = 8): Observable<PurchaseData> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<PurchaseData>(this.getUrl, { params });
  }

  createPurchase(purchaseData: Purchase): Observable<PurchaseData> {
    return this.http.post<PurchaseData>(this.createUrl, purchaseData);
  }

  updatePurchase(id: number, purchaseData: Purchase): Observable<PurchaseData> {
    return this.http.put<PurchaseData>(`${this.updateUrl}/${id}`, purchaseData);
  }

  deletePurchaseById(id: number): Observable<PurchaseData> {
    return this.http.delete<PurchaseData>(`${this.deleteUrl}/${id}`);
  }
}
