import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../../core/models/login-model';
import { ApiResponse } from '../../core/models/api-response';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(form: any): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${API_ENDPOINTS.auth}/login`, form);
  }
}
