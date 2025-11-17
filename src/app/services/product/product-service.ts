import { Injectable } from '@angular/core';
import { ProductModel } from '../../core/models/product-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { filterModel } from '../../core/models/filters-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(filter : any): Observable<ProductModel[]> {
    // let params = new HttpParams();
    // Object.keys(filter).forEach(key => {
    //   params = params.append(key, filter[key]);
    // });
    return this.http.post<ProductModel[]>(`${API_ENDPOINTS.product}/list`, filter);
  }

  getProductById(id: number): Observable<ApiResponse<ProductModel>> {
    return this.http.get<ApiResponse<ProductModel>>(`${API_ENDPOINTS.product}/get/${id}`);
  }

  saveProduct(product: any): Observable<ApiResponse<ProductModel>> {
    return this.http.post<ApiResponse<ProductModel>>(`${API_ENDPOINTS.product}/save`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<ProductModel>> {
    return this.http.delete<ApiResponse<ProductModel>>(`${API_ENDPOINTS.product}/delete/${id}`);
  }
}
