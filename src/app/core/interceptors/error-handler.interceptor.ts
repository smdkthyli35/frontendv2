import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      if (errorResponse instanceof HttpErrorResponse) {
        if (errorResponse.status == 401) {
          toastr.error(
            'You are not authorized!'
          );
          router.navigateByUrl('/login');
        } else {
          switch (errorResponse.error.errorType) {
            case 'BusinessException':
              toastr.error(errorResponse.error.error);
              break;
            case 'ValidationException':
              handleValidationException(errorResponse, toastr);
              break;
            case 'NotFoundException':
              toastr.error(errorResponse.error.error);
              break;
            default:
              toastr.error('An error occured!');
              break;
          }
        }
      }

      return throwError(() => errorResponse); 
    })
  );
};

function handleValidationException(errorResponse: HttpErrorResponse, toastr: ToastrService) {
  let errorObj = errorResponse.error.error;
  let errorMsg = '<ul>';

  Object.keys(errorObj).forEach((key) => {
    errorMsg += `<li> ${key} validation error: ${errorObj[key]} </li>`;
  });

  errorMsg += '</ul>';
  toastr.error(errorMsg, 'Errors', {
    enableHtml: true,
    timeOut: 10000,
  });
}

