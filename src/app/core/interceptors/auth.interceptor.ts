import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../features/services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token;

  if (token) {
    const authRequest = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });

    return next(authRequest);
  }

  return next(req);
};
