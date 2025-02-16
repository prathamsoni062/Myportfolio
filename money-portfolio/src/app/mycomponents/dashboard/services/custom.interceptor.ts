import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('authToken');
  console.log('Auth Token:', token);  // Debugging the token value
  
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json'
    }
  })
  console.log(cloneRequest);
  
  return next(cloneRequest);
};
