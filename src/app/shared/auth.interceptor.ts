import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Intercepting request:', req);

  const token = localStorage.getItem('token');
  let clonedReq = req;

  // Asegúrate de que la URL de la solicitud comience con la URL base del environment
  if (!req.url.startsWith(environment.api_url)) {
    clonedReq = req.clone({
      url: `${environment.api_url}${req.url}`
    });
    console.log('Modified request URL:', clonedReq.url);
  }
  console.log('Token:', token);  // Verifica que el token sea el correcto

  // Agrega el token de autorización si existe
  if (token) {
    clonedReq = clonedReq.clone({
      headers: clonedReq.headers
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json; charset=utf-8')
    });
    console.log('Added Authorization and Content-Type headers:', clonedReq.headers);
  }

  return next(clonedReq);
};
