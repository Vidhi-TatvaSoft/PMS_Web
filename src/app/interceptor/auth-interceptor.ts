import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { getCookie } from '../core/common-methods/cookie-helper';
import { Router } from '@angular/router';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookie("authToken");
  const router = inject(Router);
  console.log(token)

  const authReq = token?req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }): req;

  return next(authReq).pipe(
    catchError((error) => {
      // check if api return 401
      if (error.status === 401) {
        router.navigate(['/un-authorize']);
      }

      return throwError(() => error);
    })
  );
};
