import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../../core/models/category-model';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${API_ENDPOINTS.category}/list`);
  }

  getCategoryById(id: number): Observable<ApiResponse<CategoryModel>> {
    return this.http.get<ApiResponse<CategoryModel>>(`${API_ENDPOINTS.category}/get/${id}`);
  }

  saveCategory(category: any): Observable<ApiResponse<CategoryModel>> {
    return this.http.post<ApiResponse<CategoryModel>>(`${API_ENDPOINTS.category}/save`, category);
  }

  deleteCategory(id: number): Observable<ApiResponse<CategoryModel>> {
    return this.http.delete<ApiResponse<CategoryModel>>(`${API_ENDPOINTS.category}/delete/${id}`);
  }
}
